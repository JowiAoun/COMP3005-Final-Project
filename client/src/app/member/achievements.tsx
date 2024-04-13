import React from "react"
import {
  Table, TableBody,
  TableCaption, TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {FitnessGoals} from "@/entities/member";

interface AchievementsProps {
  goals: FitnessGoals[];
}

const Achievements: React.FC<AchievementsProps> = ({goals}) => {

  return (
    <Table>
      <TableCaption>A list of your achievements. Keep pushing hard!</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {goals && goals.map((goal, index) => {
          if (goal.completed) {
            return (<TableRow key={index}>
              <TableCell className="font-medium">{goal.goalName}</TableCell>
              <TableCell>{goal.description}</TableCell>
              <TableCell className="text-right">{goal.type}</TableCell>
            </TableRow>)
          }
        })}
      </TableBody>
    </Table>
  );
}

export default Achievements;