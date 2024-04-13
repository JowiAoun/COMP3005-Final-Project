import React from "react"
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {Member} from "@/entities/member";

interface AchievementsProps {
  member: Member;
}

const Achievements: React.FC<AchievementsProps> = ({member}) => {
  return (
    <Table>
      <TableCaption>A list of your achievements. Keep pushing hard!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      {/*<TableBody>*/}
      {/*  {sessions && sessions.map((session, index) => (*/}
      {/*    <TableRow key={index}>*/}
      {/*      <TableCell className="font-medium">{session.name}</TableCell>*/}
      {/*      <TableCell>{session.shortDescription}</TableCell>*/}
      {/*      <TableCell>{session.roomNumber}</TableCell>*/}
      {/*      <TableCell>{session.startDate.toLocaleString()} - {session.endDate.toLocaleString()}</TableCell>*/}
      {/*      <TableCell className="text-right">{session.trainerName}</TableCell>*/}
      {/*    </TableRow>*/}
      {/*  ))}*/}
      {/*</TableBody>*/}
    </Table>
  );
}

export default Achievements;