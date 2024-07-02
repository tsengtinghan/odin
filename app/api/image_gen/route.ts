import { saveImage } from "@/actions/action";
import * as fal from "@fal-ai/serverless-client";

fal.config({
  credentials: process.env.FAL_KEY,
});

export async function POST(request: Request) {
  const { prompts } = await request.json();
  for (const prompt of prompts) {
    const result: any = await fal.subscribe("fal-ai/fast-lightning-sdxl", {
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
    });
    console.log(result);
  }
}
