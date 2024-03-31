INSERT INTO Members (firstName, lastName, age, weight, height, bmi, restingHeartRate, caloriesBurned, numOfKm_ran, membershipType, username, password)
VALUES ('John', 'Doe', 30, 180, 70, 25, 70, 1500, 10, 'Gold', 'john_doe', 'password123'),
       ('Alice', 'Smith', 25, 140, 65, 20, 65, 1200, 5, 'Silver', 'alice_smith', 'abc123'),
       ('Bob', 'Johnson', 40, 200, 72, 28, 75, 1800, 15, 'Platinum', 'bob_johnson', 'pass123');

-- Trainer
INSERT INTO Trainer (firstName, lastName, username, password)
VALUES ('Michael', 'Scott', 'michael', 'officeboss'),
       ('Pam', 'Beesly', 'pam', 'receptionist');

-- Administrator
INSERT INTO Administrator (firstName, lastName, username, password)
VALUES ('Stanley', 'Hudson', 'stanley', 'pretzelday'),
       ('Angela', 'Martin', 'angela', 'catlover');


INSERT INTO Exercises (routineName, name, description, reps, sets,memberId)
VALUES ('Full Body', 'Squats', 'Lower body exercise', 12, 3,NULL),
       ('Cardio', 'Running', 'Treadmill running', 20, 1, NULL);

INSERT INTO FitnessGoals (goalName, deadLine, description, type, commitment, currentPr,memberId)
VALUES ('Weight Loss', '2024-06-30', 'Lose 10kg in 3 months', 'Weight', 3, 0, 1),
       ('Muscle Gain', '2024-08-31', 'Gain 5kg of muscle mass', 'Muscle', 3, 0, 2);

INSERT INTO TrainerAvailabilities (Day,startTime,endTime,trainerId)
VALUES ('Monday',10:00:00,13:00:00,1),
       ('Wednesday',9:00:00,12:00:00,2);

INSERT INTO Bills (amount, service, adminId, memberId)
VALUES (50.00, 'Gym Membership', 1, 1),
       (100.00, 'Personal Training', 2, 2);

INSERT INTO Session (type,capacity,name,description,startDate,endDate,trainerId,roomNumber,adminId)
VALUES ('Personal', 1, 'Training Session', 'Simple training session','2024-09-01','2024-10-01',202,1),
       ('Group', 1, 'Badminton', 'Beginner friendly class for learning 	Badminton','2024-08-12','2024-09-01',203,2);

INSERT INTO Room (roomNumber, capacity, isAvailable, sessionId) 
VALUES (100,20,true,NULL),
       (302,15,true,NULL),
       (202,14,true,1),
       (203,20,false,2);

INSERT INTO Equipment(name,status,roomNumber)
VALUES ('Dumbbell rack','available',202),
       ('Badminton rack','unavailable',203);

INSERT INTO EnrolledIn(memberId,sessionId)
VALUE (1,1),
      (1,2),
      (2,2);

INSERT INTO Filters(sessionId,Filter)
VALUES (1,'Personal'),
       (2,'Group');

