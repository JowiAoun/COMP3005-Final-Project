import React from "react";
import { Member } from "@/entities/member";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import {calculateAge} from "@/app/utils/functions";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"

interface MemberAccordionProps {
  member: Member;
}

export const MemberAccordion: React.FC<MemberAccordionProps> = ({ member }) => {
  return (
    <AccordionItem value={`"item-"${member.memberId}`}>
      <AccordionTrigger>
        {member.firstName} {member.lastName}, {calculateAge(member.healthMetrics.age)}
      </AccordionTrigger>
      <AccordionContent>
        <div className="p-4 bg-gray-100 rounded-lg">
          <Avatar className="mb-4">
            <AvatarFallback className="bg-green-200">{`${member.firstName[0]} ${member.lastName[0]}`}</AvatarFallback>
          </Avatar>

          <h1 className="mb-2 font-bold">User Information</h1>
          <p><span className="font-bold">Username:</span> {member.username}</p>
          <p><span className="font-bold">Membership Type:</span> {member.membershipType}</p>
          <p className="mt-4 mb-2 font-bold">Health Metrics</p>
          <ul className="list-disc ml-4">
            <li><span className="font-bold">Age:</span> {calculateAge(member.healthMetrics.age)}</li>
            <li><span className="font-bold">Weight:</span> {member.healthMetrics.weight} kg</li>
            <li><span className="font-bold">Height:</span> {member.healthMetrics.height} cm</li>
            <li><span className="font-bold">BMI:</span> {member.healthMetrics.bmi}</li>
          </ul>
          {member.fitnessGoals && member.fitnessGoals.length > 0 && (
            <div className="mt-4">
              <p className="font-bold">Fitness Goals:</p>
              <ul className="list-disc ml-4">
                {member.fitnessGoals.map((goal, index) => (
                  <li key={index}>
                    <p><span className="font-bold">Goal Name:</span> {goal.goalName}</p>
                    <p><span className="font-bold">Deadline:</span> {goal.deadline.toLocaleDateString()}</p>
                    <p><span className="font-bold">Description:</span> {goal.description}</p>
                    <p><span className="font-bold">Type:</span> {goal.type}</p>
                    <p><span className="font-bold">Commitment:</span> {goal.commitment}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
