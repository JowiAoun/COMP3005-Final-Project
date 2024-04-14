import {Member} from "@/entities/member";
import {Bill} from "@/entities/bill";
import {Room, Session} from "@/entities/session";
import {Trainer} from "@/entities/trainer";

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
    fitnessGoals: [
      {
        goalName: "Lose 10 pounds",
        deadline: new Date("2024-06-30"),
        description: "Achieve a weight loss of 10 pounds by the end of June.",
        type: "Weight loss",
        commitment: 5,
        completed: false,
      },
      {
        goalName: "Run a half-marathon",
        deadline: new Date("2024-09-15"),
        description: "Complete a half-marathon race by September.",
        type: "Endurance",
        commitment: 3,
        completed: false,
      },
      {
        goalName: "Increase muscle mass",
        deadline: new Date("2024-08-31"),
        description: "Gain 5 pounds of muscle mass by the end of August.",
        type: "Muscle building",
        commitment: 4,
        completed: false,
      },
      {
        goalName: "Improve flexibility",
        deadline: new Date("2024-07-31"),
        description: "Achieve a full split and improve overall flexibility by July.",
        type: "Flexibility",
        commitment: 2,
        completed: false,
      },
      {
        goalName: "Reduce body fat percentage",
        deadline: new Date("2024-08-15"),
        description: "Lower body fat percentage by 5% by mid-August.",
        type: "Body composition",
        commitment: 6,
        completed: false,
      },
    ],
    routines: [
      {
        id: 1,
        name: "Morning Stretch",
        description: "Start your day with a gentle stretching routine to wake up your muscles and improve flexibility."
      },
      {
        id: 2,
        name: "Morning Meditation",
        description: "Take a few minutes for mindfulness meditation to set a positive tone for the day ahead."
      },
      {
        id: 3,
        name: "Breakfast Preparation",
        description: "Prepare a healthy and nutritious breakfast to fuel your body and mind for the day."
      }
    ],
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
    fitnessGoals: [
      {
        goalName: "Complete 100 push-ups",
        deadline: new Date("2024-07-15"),
        description: "Be able to complete 100 consecutive push-ups by mid-July.",
        type: "Strength",
        commitment: 4,
        completed: false,
      },
      {
        goalName: "Master the handstand",
        deadline: new Date("2024-09-30"),
        description: "Achieve a stable handstand position for at least 30 seconds by the end of September.",
        type: "Balance",
        commitment: 3,
        completed: false,
      },
      {
        goalName: "Complete a 10k run",
        deadline: new Date("2024-08-10"),
        description: "Participate in and complete a 10k running race by early August.",
        type: "Endurance",
        commitment: 4,
        completed: false,
      },
      {
        goalName: "Improve bench press max",
        deadline: new Date("2024-09-30"),
        description: "Increase bench press one-rep max by 20 pounds by the end of September.",
        type: "Strength",
        commitment: 3,
        completed: false,
      },
      {
        goalName: "Achieve a sub-20 minute 5k",
        deadline: new Date("2024-08-20"),
        description: "Run a 5k race in under 20 minutes by mid-August.",
        type: "Speed",
        commitment: 5,
        completed: false,
      },
    ],
    routines: [
      {
        id: 4,
        name: "Evening Walk",
        description: "Wind down your day with a relaxing walk to clear your mind and promote better sleep."
      },
      {
        id: 5,
        name: "Evening Yoga",
        description: "Unwind with a gentle yoga routine to release tension and prepare your body for restful sleep."
      },
      {
        id: 6,
        name: "Reading",
        description: "Spend some time reading a book before bed to relax your mind and escape into a different world."
      }
    ],
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
    routines: []
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
    routines: []
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
    routines: []
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
    routines: []
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
    amount: 19.99,
    paymentDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) // 21 days ago
  },
  {
    id: 2,
    service: "Personal Training - 1hr",
    paid: true,
    method: "e-Transfer",
    amount: 57.50,
    paymentDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
  },
  {
    id: 3,
    service: "Membership - Silver Tier",
    paid: true,
    method: "Credit Card",
    amount: 19.99,
    paymentDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    id: 4,
    service: "Personal Training - 2hrs",
    paid: false,
    amount: 110.25,
    paymentDate: undefined,
  },
  {
    id: 5,
    service: "Membership - Silver Tier",
    paid: false,
    amount: 19.99,
    paymentDate: undefined,
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

export const tempRooms: Room[] = [

]
