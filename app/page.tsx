import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-center text-xl">Save articles</h1>
      <div className="flex space-between gap-4">
        <Input placeholder="url" className="w-72" />
        <Button>Submit</Button>
      </div>
    </div>
  );
}
