import {FitnessGoals} from "@/entities/member";

export const addTrainerAvailabilities = (day: string, startTime: string, endTime: string, trainerId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "day": day,
    "startTime": startTime,
    "endTime": endTime,
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/addTrainerAvailabilites/"+trainerId, requestOptions)
    .then((response) => response.text())
    .then((result) => {return result})
    .catch((error) => console.error(error));
}

export const createFitnessGoals = (fitnessGoal: FitnessGoals, trainerId: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "goalName": fitnessGoal.goalName,
    "deadLine": fitnessGoal.deadline,
    "description": fitnessGoal.description,
    "type": fitnessGoal.type,
    "commitment": fitnessGoal.commitment
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/createFitnessGoals/"+trainerId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}