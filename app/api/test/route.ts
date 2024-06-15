import { getAllThreads } from "@/actions/action";
export async function GET(req: Request) {
    getAllThreads();
    return new Response('Hello, world!', { status: 200 });
}