import React from "react"
import {Session} from "@/entities/session";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface SessionsProps {
  sessions: Session[];
}

const Sessions: React.FC<SessionsProps> = ({sessions}) => {
  return (
    <>
      <Table>
        <TableCaption>A list of your recent sessions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Room Number</TableHead>
            <TableHead>From/To</TableHead>
            <TableHead className="text-right">Trainer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions && sessions.map((session, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{session.name}</TableCell>
              <TableCell>{session.shortDescription}</TableCell>
              <TableCell>{session.roomNumber}</TableCell>
              <TableCell>{session.startDate.toLocaleString()} - {session.endDate.toLocaleString()}</TableCell>
              <TableCell className="text-right">{session.trainerName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default Sessions