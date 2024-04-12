import {Member} from "@/entities/member";
import {Bill} from "@/entities/bill";
import {Session} from "@/entities/session";
import {Trainer} from "@/entities/trainer";

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

export const tempMembers: Member[] = [
  {
    memberId: 1,
    username: "JaneDoe123",
    password: "janepassword456",
    firstName: "Jane",
    lastName: "Doe",
    membershipType: "Gold",
    healthStatics: {
      caloriesBurned: 420,
      ran: 40,
    },
    healthMetrics: {
      age: new Date(1990, 5, 15),
      weight: 65,
      height: 170,
      bmi: 22.49,
    },
  },
  {
    memberId: 2,
    username: "AliceSmith789",
    password: "alicespassword987",
    firstName: "Alice",
    lastName: "Smith",
    membershipType: "Platinum",
    healthStatics: {
      caloriesBurned: 500,
      ran: 50,
    },
    healthMetrics: {
      age: new Date(1985, 8, 3),
      weight: 70,
      height: 165,
      bmi: 25.71,
    },
  },
  {
    memberId: 3,
    username: "BobJohnson456",
    password: "bobspassword789",
    firstName: "Bob",
    lastName: "Johnson",
    membershipType: "Silver",
    healthStatics: {
      caloriesBurned: 360,
      ran: 28,
    },
    healthMetrics: {
      age: new Date(1988, 10, 12),
      weight: 75,
      height: 178,
      bmi: 23.67,
    },
  },
  {
    memberId: 4,
    username: "EmilyBrown456",
    password: "emilyspassword789",
    firstName: "Emily",
    lastName: "Brown",
    membershipType: "Gold",
    healthStatics: {
      caloriesBurned: 450,
      ran: 45,
    },
    healthMetrics: {
      age: new Date(1995, 3, 8),
      weight: 60,
      height: 160,
      bmi: 23.44,
    },
  },
  {
    memberId: 5,
    username: "MichaelDavis789",
    password: "michaelspassword123",
    firstName: "Michael",
    lastName: "Davis",
    membershipType: "Bronze",
    healthStatics: {
      caloriesBurned: 300,
      ran: 25,
    },
    healthMetrics: {
      age: new Date(1983, 7, 20),
      weight: 85,
      height: 185,
      bmi: 24.84,
    },
  },
  {
    memberId: 6,
    username: "SarahMiller123",
    password: "sarahspassword456",
    firstName: "Sarah",
    lastName: "Miller",
    membershipType: "Silver",
    healthStatics: {
      caloriesBurned: 400,
      ran: 35,
    },
    healthMetrics: {
      age: new Date(1991, 11, 17),
      weight: 55,
      height: 155,
      bmi: 22.89,
    },
  },
];

export const tempTrainers: Trainer[] = [
  {
    trainerId: 1,
    username: "JackDODoubleG",
    password: "password1",
    firstName: "Jack",
    lastName: "Dogg",
    availabilities: [
      { day: "monday", startTime: "09:00", endTime: "09:30", occupied: false },
      { day: "tuesday", startTime: "10:00", endTime: "10:30", occupied: false },
      { day: "wednesday", startTime: "11:00", endTime: "11:30", occupied: false },
      { day: "thursday", startTime: "13:00", endTime: "13:30", occupied: false },
      { day: "friday", startTime: "14:00", endTime: "14:30", occupied: false },
      { day: "saturday", startTime: "15:00", endTime: "15:30", occupied: false },
      { day: "sunday", startTime: "16:00", endTime: "16:30", occupied: false },
      { day: "monday", startTime: "17:00", endTime: "17:30", occupied: false },
      { day: "tuesday", startTime: "18:00", endTime: "18:30", occupied: false },
      { day: "wednesday", startTime: "19:00", endTime: "19:30", occupied: false }
    ]
  },
  {
    trainerId: 2,
    username: "JaneSmithie",
    password: "password2",
    firstName: "Jane",
    lastName: "Smith",
    availabilities: [
      { day: "thursday", startTime: "09:00", endTime: "09:30", occupied: false },
      { day: "friday", startTime: "10:00", endTime: "10:30", occupied: false },
      { day: "saturday", startTime: "11:00", endTime: "11:30", occupied: false },
      { day: "sunday", startTime: "12:00", endTime: "12:30", occupied: false },
      { day: "monday", startTime: "13:00", endTime: "13:30", occupied: false },
      { day: "tuesday", startTime: "14:00", endTime: "14:30", occupied: false },
      { day: "wednesday", startTime: "15:00", endTime: "15:30", occupied: false },
      { day: "thursday", startTime: "16:00", endTime: "16:30", occupied: false },
      { day: "friday", startTime: "17:00", endTime: "17:30", occupied: false },
      { day: "saturday", startTime: "18:00", endTime: "18:30", occupied: false }
    ]
  },
];


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
