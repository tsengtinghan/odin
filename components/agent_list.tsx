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
    },
    {
      username: "shadcn",
      bio: "I am a software engineer",
    },
    {
      username: "shadcn",
      bio: "I am a software engineer",
    },
    {
      username: "shadcn",
      bio: "I am a software engineer",
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
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
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
