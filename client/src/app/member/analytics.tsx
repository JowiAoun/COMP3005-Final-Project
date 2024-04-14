import React from "react"
import {Member} from "@/entities/member";

interface AnalyticsProps {
  member: Member;
}

const Analytics: React.FC<AnalyticsProps> = ({member}) => {
  return <h1>Analytics</h1> // You've burnt {member.healthStatistics.caloriesBurned} calories, and ran {member.healthStatistics.ran}km!
}

export default Analytics
