import React from "react"
import {Member} from "@/entities/member";

interface AnalyticsProps {
  member: Member;
}

const Analytics: React.FC<AnalyticsProps> = ({member}) => {
  return <h1>You've burnt {member.healthStatics.caloriesBurned} calories, and ran {member.healthStatics.ran}km!</h1>
}

export default Analytics