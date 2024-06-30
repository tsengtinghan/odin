import OpenAI from "openai";
import { saveThread } from "@/actions/action";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request): Promise<Response> {
  const { prompt } = {
    prompt: "You are tasked with transforming a lengthy, detailed article into a series of Twitter threads. Each thread should focus on a distinct theme or section of the article, breaking it down into a sequence of posts that are both informative and concise. Your goal is to ensure that all critical information is preserved and presented in an engaging, digestible format.\nOutput Format:\nYour responses should be structured in JSON format. Your entire response/output is going to consist of a single JSON object {}, and you will NOT wrap it within JSON md markers. The JSON object will contain an array of threads, where each thread includes its own array of posts. Each post should contain the content of the tweet. Additionally, each thread should contain an array named `image_prompt` with two prompts that will be used for image generation to help the reader understand or visualize the thread content.\nExample:\n{ \"threads\": [ { \"posts\": [ \"Here’s a concise summary of the first key point from the article. It highlights the main arguments and introduces the topic comprehensively.\", \"Expanding on the first point, here’s more detail about the implications. This includes how it affects related areas and what future steps might be considered.\" ], \"image_prompt\": [ \"A visual representation of the first key point, highlighting the main arguments and introducing the topic.\", \"An illustration showing the implications of the first point, including its effects on related areas and potential future steps.\" ] }, { \"posts\": [ \"Starting thread two with a new theme from the article. Here’s what you need to know about the recent developments and their historical context.\", \"Further insights on the second theme, discussing its broader impact and potential long-term effects in the field.\" ], \"image_prompt\": [ \"A visual representation of the recent developments and their historical context.\", \"An illustration showing the broader impact and potential long-term effects of the second theme.\" ] } ] }\nInstructions:\nEach thread must start with a clear introduction to the theme.\nEnsure each post within a thread is concise, limited to the essential details, and written in a way that engages the reader.\nIf necessary, continue the topic in subsequent posts within the same thread to preserve context and detail.\nBegin a new thread if the topic shifts significantly. Additionally, generate two prompts that will be used to generate images to help illustrate the content of each thread.\nDO NOT ADD ANY ```json``` MARKERS TO YOUR RESPONSE."
  }
  
  const { article } = await request.json();
  console.log("in api article: ", article);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content:
          prompt,
      },
      {
        role: "user",
        content: article,
      },
    ],
    temperature: 1,
    max_tokens: 2000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: { type: "json_object" },
  });
  // console.log(response);
  const content = JSON.parse(response.choices[0].message.content!);
  const threads = content.threads;
  console.log("threads: ", threads);
  for (const thread of threads) {
    await saveThread(thread, 2);
  }
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
