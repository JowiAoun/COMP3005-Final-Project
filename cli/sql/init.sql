SET search_path = "public";


-- DDL
CREATE TABLE Members(
	memberId SERIAL PRIMARY KEY,
	firstName VARCHAR(16) NOT NULL,
	lastName VARCHAR(16) NOT NULL,
	age INT NOT NULL,
	weight INT NOT NULL,
	height INT NOT NULL,
	bmi INT,
	restingHeartRate INT NOT NULL,
	caloriesBurned INT NOT NULL DEFAULT 0,
	numOfKm_ran INT DEFAULT 0,
	membershipType VARCHAR(32) NOT NULL DEFAULT 'None',
	username VARCHAR(16) NOT NULL,
	password VARCHAR(12) NOT NULL
);

CREATE TABLE Trainer(
	trainerId SERIAL PRIMARY KEY,
	firstName VARCHAR(16) NOT NULL,
	lastName VARCHAR(16) NOT NULL,
	username VARCHAR(16) NOT NULL,
	password VARCHAR(12) NOT NULL
);

CREATE TABLE Administrator(
	adminId SERIAL PRIMARY KEY,
	firstName VARCHAR(16) NOT NULL,
	lastName VARCHAR(16) NOT NULL,
	username VARCHAR(16) NOT NULL,
	password VARCHAR(12) NOT NULL
);

CREATE TABLE Routine(
	routineId SERIAL PRIMARY KEY,
	routineName VARCHAR(32) NOT NULL,
	description TEXT,
	memberId INT,
	FOREIGN KEY(memberId)
		REFERENCES Members(memberId)
);

CREATE TABLE Exercise(
	exerciseId SERIAL PRIMARY KEY,
	exerciseName VARCHAR(32) NOT NULL,
	sets INT NOT NULL DEFAULT 0,
	reps INT NOT NULL DEFAULT 0
);

CREATE TABLE FitnessGoals(
	goalName VARCHAR(30) PRIMARY KEY,
	deadLine DATE NOT NULL,
	description TEXT,
	type VARCHAR(20) NOT NULL,
	commitment INT NOT NULL DEFAULT 1,
	memberId INT,
	completed BOOLEAN,
	FOREIGN KEY(memberId)
		REFERENCES Members(memberId)
);

CREATE TABLE TrainerAvailabilities(
	day VARCHAR(10),
	startTime TIME NOT NULL,
	endTime TIME NOT NULL,
	trainerId INT,
	occupied BOOLEAN,
	PRIMARY KEY(Day,startTime,endTime),
	FOREIGN KEY(trainerId)
		REFERENCES Trainer(trainerId)

);

CREATE TABLE Bills(
	invoice_id SERIAL PRIMARY KEY,
	amount float(2),
	service VARCHAR(32),
	adminId INT,
	memberId INT,
	paymentDate DATE,
	isPaid BOOLEAN,
	FOREIGN KEY(adminId)
		REFERENCES Administrator(adminId),
	FOREIGN KEY(memberId)
		REFERENCES Members(memberId)
);

CREATE TABLE Room(
	roomNumber INT NOT NULL DEFAULT 1,
	capacity INT NOT NULL DEFAULT 0,
	isAvailable BOOLEAN NOT NULL DEFAULT FALSE,
	PRIMARY KEY(roomNumber)
);

CREATE TABLE Session(
	sessionId SERIAL PRIMARY KEY,
	type VARCHAR(10),
	capacity INT,
	name VARCHAR(30),
	description TEXT,
	day VARCHAR(32),
	startDate DATE DEFAULT CURRENT_DATE,
	endDATE DATE DEFAULT CURRENT_DATE,
	startTIME TIME,
	endTime TIME,
	trainerId INT,
	roomNumber INT,
	adminId INT,
	FOREIGN KEY(trainerId)
		REFERENCES Trainer(trainerId),
	FOREIGN KEY(roomNumber)
		REFERENCES Room(roomNumber),
	FOREIGN KEY(adminId)
		REFERENCES Administrator(adminId)
);


CREATE TABLE Equipment(
	name VARCHAR(30) NOT NULL,
	status VARCHAR(30) NOT NULL,
	roomNumber INT,
	PRIMARY KEY(name),
	FOREIGN KEY(roomNumber)
		REFERENCES Room(roomNumber)
);

CREATE TABLE EnrolledIn(
	memberId INT,
	sessionId INT,
	FOREIGN KEY(memberId)
		REFERENCES Members(memberID),
	FOREIGN KEY(sessionId)
		REFERENCES Session(sessionId)
        ON DELETE CASCADE,
	PRIMARY KEY(memberId, sessionId)
);


CREATE TABLE RoutineContains(
	exerciseId INT,
	routineId INT,
	FOREIGN KEY(exerciseId)
		REFERENCES Exercise(exerciseId),
	FOREIGN KEY(routineId)
		REFERENCES Routine(routineId)
);

-- DML
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

INSERT INTO Routine (routineName, description, memberId)
VALUES ('Squats', 'Lower body exercise',1),
      ('Running','Treadmill running',2);


INSERT INTO Exercise (exerciseName,sets,reps)
VALUES ('Squats',12, 3),
      ('Treadmill running',20, 1);

INSERT INTO FitnessGoals (goalName, deadLine, description, type, commitment,memberId,completed)
VALUES ('Weight Loss', '2024-06-30', 'Lose 10kg in 3 months', 'Weight', 3,1,false),
       ('Muscle Gain', '2024-08-31', 'Gain 5kg of muscle mass', 'Muscle', 3,2,true);

INSERT INTO TrainerAvailabilities (day, startTime, endTime, trainerId,occupied)
VALUES ('Monday', '10:00:00', '13:00:00', 1,true),
       ('Tuesday', '9:00:00', '11:00:00', 1,false),
       ('Wednesday', '9:00:00', '12:00:00', 2,true),
       ('Friday', '15:00:00', '18:00:00', 1,true);

INSERT INTO Bills (amount, service, adminId, memberId,paymentDate,isPaid)
VALUES (50.00, 'Gym Membership', 1, 1,'2023-09-01',true),
       (100.00, 'Personal Training', 2, 2,'2023-09-01',true);

INSERT INTO Room (roomNumber, capacity, isAvailable)
VALUES (100,20,true),
       (302,15,true),
       (202,14,true),
       (203,20,false);



--Initializing the tables that have foreign keys--
INSERT INTO Session (type,capacity,name,description,day,startDate,endDate,startTime,endTime,trainerId,roomNumber,adminId)
VALUES ('Personal', 1, 'Training Session', 'Simple training session','Wednesday','2024-09-01','2024-10-01','10:00:00','12:00:00',1,202,1),
       ('Group', 1, 'Badminton', 'Beginner friendly class for learning 	Badminton','Monday','2024-08-12','2024-09-01','9:00:00','10:00:00',2,203,2);


INSERT INTO Equipment(name, status, roomNumber)
VALUES ('Dumbbell rack','available',202),
       ('Badminton rack','unavailable',203);

INSERT INTO EnrolledIn(memberId, sessionId)
VALUES (1,1),
       (1,2),
       (2,2);

INSERT INTO RoutineContains(exerciseId, routineId)
VALUES (1,1),
       (2,2);
