import { saveImage } from "@/actions/action";
import * as fal from "@fal-ai/serverless-client";
import { error } from "console";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: Request) {
  const { prompts, thread_id } = await request.json();

  const promises = prompts.map((prompt: string) =>
    fal.subscribe("fal-ai/fast-lightning-sdxl", {
      input: {
        prompt: prompt,
      },
      pollInterval: 500,
      logs: true,
      onQueueUpdate: (update) => {
        console.log(update.status);
        if (update.status === "IN_PROGRESS") {
          if (update.logs) {
            update.logs.map((log) => log.message).forEach(console.log);
          }
        }
      },
    })
  );
  try {
    const results = await Promise.all(promises)
    const savePromises = results.map(result => saveImage(thread_id, result.images[0].url));
    await Promise.all(savePromises);

    results.forEach(result => console.log(result));
  } catch (error) {
    console.error("An error occurred:", error);
  }


//   for (const prompt of prompts) {
//     const result: any = await fal.subscribe("fal-ai/fast-lightning-sdxl", {
//       input: {
//         prompt: prompt,
//       },
//       pollInterval: 500,
//       logs: true,
//       onQueueUpdate: (update) => {
//         console.log(update.status);
//         if (update.status === "IN_PROGRESS") {
//           if (update.logs) {
//             update.logs.map((log) => log.message).forEach(console.log);
//           }
//         }
//       },
//     });
//     console.log(result);
//   }
}
