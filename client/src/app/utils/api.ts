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

export const enrollMember = (firstName: any, lastName: any, username: any, password: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "firstName": firstName,
    "lastName": lastName,
    "username": username,
    "password": password
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/enrollMember", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const login = (username: any, password: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "username": username,
    "password": password
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  return fetch("http://127.0.0.1:5000/login", requestOptions)
    .then((response) => response.json()) // Parse response as JSON
    .then((result) => result) // Return the result
    .catch((error) => console.error(error));
}

export const getHealthMetrics = (memberId: any) => {
  const raw = "";

  const requestOptions: any = {
    method: "GET",
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getHeathMetrics/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getHealthStats = (memberId: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getHeathStats/1", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getFitnessGoals = (memberId: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getFitnessGoals/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getRoutines = (memberId: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getRoutines/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getExercises = () => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getExercises", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getAvailableTrainers = (day: any, startTime: any, endTime: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "day": day,
    "startTime": startTime,
    "endTime": endTime
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getAvailableTrainers", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const createRoutine = (routineName: any, description: any, memberId: any, [exercises]: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "routineName": routineName,
    "description": description,
    "memberId": memberId,
    "exercises": exercises
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/createRoutine", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const memberSearch = (searchTerm: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/memberSearch/" + searchTerm, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getAvailableRooms = (day: any, startTime: any, endTime: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "day": day,
    "startTime": startTime,
    "endTime": endTime
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getAvailableRooms", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const addTrainer = (trainerId: any, day: any, startTime: any, endTime: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "trainerId": trainerId,
    "day": day,
    "startTime": startTime,
    "endTime": endTime
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/addTrainer", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getEquipment = (roomNumber: any) => {
  const raw = "";

  const requestOptions: any = {
    method: "GET",
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getEquipment/" + roomNumber, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const updateEquipment = (roomNumber: any, name: any, status: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "name": name,
    "status": status,
    "roomNumber": roomNumber
  });

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/updateEquipment/" + roomNumber, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getBills = (memberId: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getBills/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const addBill = (amount: any, service: any, adminId: any, memberId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "amount": amount,
    "service": service,
    "adminId": adminId,
    "memberId": memberId
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/addBill/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
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

  fetch("http://127.0.0.1:5000/createFitnessGoals/" + trainerId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const updateTrainerAvailabilities = (newDay: any, newStartTime: any, newEndTime: any, day: any, startTime: any, endTime: any, trainerId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "newDay": newDay,
    "newStartTime": newStartTime,
    "newEndTime": newEndTime,
    "day": day,
    "startTime": startTime,
    "endTime": endTime
  });

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/updateTrainerAvailabilites/" + trainerId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const createSession = (type: any, capacity: any, name: any, description: any, day: any, startDate: any, endDate: any, startTime: any, endTime: any, trainerId: any, roomNumber: any, adminId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "type": type,
    "capacity": capacity,
    "name": name,
    "description": description,
    "day": day,
    "startDate": startDate,
    "endDate": endDate,
    "startTime": startTime,
    "endTime": endTime,
    "trainerId": trainerId,
    "roomNumber": roomNumber,
    "adminId": adminId
  });

  const requestOptions: any = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/createSession", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const updateSession = (sessionId: any, type: any, capacity: any, name: any, description: any, day: any, startDate: any, endDate: any, startTime: any, endTime: any, trainerId: any, roomNumber: any, adminId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "type": type,
    "capacity": capacity,
    "name": name,
    "description": description,
    "day": day,
    "startDate": startDate,
    "endDate": endDate,
    "startTime": startTime,
    "endTime": endTime,
    "trainerId": trainerId,
    "roomNumber": roomNumber,
    "adminId": adminId
  });

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/updateSession/" + sessionId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const updateRoom = (roomNumber: any, sessionId: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "roomNumber": roomNumber
  });

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/updateRoom/" + sessionId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getMemberInfo = (memberId: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getMemberInfo/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const updateMemberInfo = (memberId: any, firstName: any, lastName: any, age: any, weight: any, height: any, password: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "firstName": firstName,
    "lastName": lastName,
    "age": age,
    "weight": weight,
    "height": height,
    "password": password
  });

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/updateMemberInfo/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getSessions = () => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getSessions", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const updateBill = (isPaid: any, paymentDate: any, invoice_id: any) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "isPaid": isPaid,
    "paymentDate": paymentDate
  });

  const requestOptions: any = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/updateBill/" + invoice_id, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}

export const getCurrentSessions = (memberId: any) => {
  const requestOptions: any = {
    method: "GET",
    redirect: "follow"
  };

  fetch("http://127.0.0.1:5000/getCurrentSessions/" + memberId, requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
}
