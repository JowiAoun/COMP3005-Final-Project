SET search_path = "public";

CREATE TABLE test (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32),
    hobby VARCHAR(32),
    age INT
);

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
	membershipType VARCHAR(10) NOT NULL DEFAULT 'None',
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

CREATE TABLE Exercises(
	routineName VARCHAR(30) NOT NULL,
	name VARCHAR(30) NOT NULL,
	description TEXT,
	reps INT NOT NULL DEFAULT 1,
	sets INT NOT NULL DEFAULT 1,
	memberId INT,
	FOREIGN KEY(memberId)
		REFERENCES Members(memberId)
);

CREATE TABLE FitnessGoals(
	goalName VARCHAR(30) PRIMARY KEY,
	deadLine DATE NOT NULL,
	description TEXT,
	type VARCHAR(20) NOT NULL,
	commitment INT NOT NULL DEFAULT 1,
	currentPr INT NOT NULL DEFAULT 0,
	memberId INT,
	FOREIGN KEY(memberId)
		REFERENCES Members(memberId)

);

CREATE TABLE TrainerAvailabilities(
	Day VARCHAR(10),
	startTime TIME NOT NULL,
	endTime TIME NOT NULL,
	trainerId INT,
	PRIMARY KEY(Day,startTime,endTime),
	FOREIGN KEY(trainerId)
		REFERENCES Trainer(trainerId)

);

CREATE TABLE Bills(
	invoice_id SERIAL PRIMARY KEY,
	amount float(2),
	service VARCHAR(10),
	adminId INT,
	memberId INT,
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
	startDate DATE DEFAULT CURRENT_DATE,
	endDATE DATE DEFAULT CURRENT_DATE,
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
		REFERENCES Session(sessionId),
	PRIMARY KEY(memberId, sessionId)
);

CREATE TABLE Filters(
	sessionId INT,
	FOREIGN KEY(sessionId)
		REFERENCES Session(sessionId),
	Filter VARCHAR(32),
	PRIMARY KEY(sessionId)
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


INSERT INTO Exercises (routineName, name, description, reps, sets, memberId)
VALUES ('Full Body', 'Squats', 'Lower body exercise', 12, 3,NULL),
       ('Cardio', 'Running', 'Treadmill running', 20, 1, NULL);

INSERT INTO FitnessGoals (goalName, deadLine, description, type, commitment, currentPr, memberId)
VALUES ('Weight Loss', '2024-06-30', 'Lose 10kg in 3 months', 'Weight', 3, 0, 1),
       ('Muscle Gain', '2024-08-31', 'Gain 5kg of muscle mass', 'Muscle', 3, 0, 2);

INSERT INTO TrainerAvailabilities (Day, startTime, endTime, trainerId)
VALUES ('Monday', '10:00:00', '13:00:00', 1),
       ('Wednesday', '9:00:00', '12:00:00', 2);

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

INSERT INTO Equipment(name, status, roomNumber)
VALUES ('Dumbbell rack','available',202),
       ('Badminton rack','unavailable',203);

INSERT INTO EnrolledIn(memberId, sessionId)
VALUES (1,1),
       (1,2),
       (2,2);

INSERT INTO Filters(sessionId, filter)
VALUES (1,'Personal'),
       (2,'Group');
