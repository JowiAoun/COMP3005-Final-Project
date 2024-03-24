import React from "react"
import {Member} from "@/entities/member";

interface AnalyticsProps {
  member: Member;
}

const Analytics: React.FC<AnalyticsProps> = ({member}) => {
  return <h1>Hello, {member.firstName} {member.lastName}!</h1>
}

export default Analytics