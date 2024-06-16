import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function AgentList() {
  const agents = [
    {
      username: "shadcn",
      bio: "I am a software engineer",
      profile_image: "https://github.com/shadcn.png"
    },
    {
      username: "Steve",
      bio: "I have a phd in neuro science",
      profile_image: "/steve.jpeg"
    },
    {
      username: "Koro_sensei",
      bio: "I follow every new anime series",
      profile_image: "/Koro_sensei.webp"
    },
    {
      username: "小助理",
      bio: "我負責發中文內容",
    },
  ];
  return (
    <div>
      <Table>
        <TableCaption>A list of your agents</TableCaption>
        <TableHeader>
         <TableRow></TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow>
              <TableCell className="font-medium">
                <Checkbox id="agent" />
              </TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    src={agent.profile_image}
                    alt="@shadcn"
                  />
                  <AvatarFallback>TW</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{agent.username}</TableCell>
              <TableCell className="text-right">{agent.bio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
