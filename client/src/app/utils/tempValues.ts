import {Member} from "@/entities/member";
import {Bill} from "@/entities/bill";
import {Session} from "@/entities/session";

export const tempMember: Member = {
  memberId: 0,
  username: "JohnDoe111",
  password: "mypassword222",
  firstName: "John",
  lastName: "Doe",
  membershipType: "Silver",
  healthStatics: {
    caloriesBurned: 385,
    ran: 32,
  },
  healthMetrics: {
    age: new Date(1993, 1, 21),
    weight: 82,
    height: 183,
    bmi: 27,
  },
}

export const tempBills: Bill[] = [
  {
    id: 1,
    service: "Membership - Silver Tier",
    paid: true,
    method: "Credit Card",
    amount: 19.99
  },
  {
    id: 2,
    service: "Personal Training - 1hr",
    paid: true,
    method: "e-Transfer",
    amount: 57.50
  },
  {
    id: 3,
    service: "Membership - Silver Tier",
    paid: true,
    method: "Credit Card",
    amount: 19.99
  },
  {
    id: 4,
    service: "Personal Training - 2hrs",
    paid: false,
    amount: 110.25
  },
  {
    id: 5,
    service: "Membership - Silver Tier",
    paid: false,
    amount: 19.99
  },
]

export const tempSessions: Session[] = [
  {
    sessionId: 1,
    name: "Yoga Class",
    shortDescription: "Relaxing yoga session",
    roomNumber: 101,
    adminId: 123,
    trainerName: "John Doe",
    type: "Yoga",
    numEnrolled: 15,
    capacity: 20,
    startDate: new Date("2024-04-01T09:00:00"),
    endDate: new Date("2024-04-01T10:00:00"),
  },
  {
    sessionId: 2,
    name: "Cardio Workout",
    shortDescription: "High-intensity cardio training",
    roomNumber: 105,
    adminId: 456,
    trainerName: "Alice Smith",
    type: "Cardio",
    numEnrolled: 10,
    capacity: 15,
    startDate: new Date("2024-04-02T10:00:00"),
    endDate: new Date("2024-04-02T11:00:00"),
  },
  {
    sessionId: 3,
    name: "Strength Training",
    shortDescription: "Building muscle strength",
    roomNumber: 103,
    adminId: 789,
    trainerName: "Michael Johnson",
    type: "Strength Training",
    numEnrolled: 12,
    capacity: 18,
    startDate: new Date("2024-04-03T11:00:00"),
    endDate: new Date("2024-04-03T12:00:00"),
  },
  {
    sessionId: 4,
    name: "Pilates Class",
    shortDescription: "Core-strengthening exercises",
    roomNumber: 102,
    adminId: 246,
    trainerName: "Emily Brown",
    type: "Pilates",
    numEnrolled: 8,
    capacity: 12,
    startDate: new Date("2024-04-04T13:00:00"),
    endDate: new Date("2024-04-04T14:00:00"),
  },
  {
    sessionId: 5,
    name: "Zumba Party",
    shortDescription: "Fun dance workout",
    roomNumber: 104,
    adminId: 135,
    trainerName: "Sophia Garcia",
    type: "Zumba",
    numEnrolled: 20,
    capacity: 25,
    startDate: new Date("2024-04-05T18:00:00"),
    endDate: new Date("2024-04-05T19:00:00"),
  },
];
