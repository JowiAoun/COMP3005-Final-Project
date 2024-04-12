import { Member } from "@/entities/member";
import React from "react";
import { MemberAccordion } from "@/app/trainer/_components/memberAccordion";
import {Accordion} from "@/components/ui/accordion";

interface MembersProps {
    members: Member[];
}

const Members: React.FC<MembersProps> = ({ members }) => {
  return (
    <Accordion type="single" collapsible>
      {members.map((member, index) => (
        <MemberAccordion key={index} member={member} />
      ))}
    </Accordion>
  );
}

export default Members;
