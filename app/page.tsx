"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState<string>("");

  const handleClick = async () => {
    const response = await fetch(`https://r.jina.ai/${url}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const response_json = await response.json();
    const article = response_json.data;
    console.log(article);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <h1 className="text-center text-xl">Save articles</h1>
      <div className="flex space-between gap-4">
        <Input
          value={url}
          placeholder="url"
          className="w-72"
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleClick}>Submit</Button>
      </div>
    </div>
  );
}
