CREATE TABLE Members(
	memberId SERIAL PRIMARY KEY,
	firstName VARCHAR(16) NOT NULL,
	lastName VARCHAR(16) NOT NULL,
	age NOT NULL INT,
	weight NOT NULL INT,
	height NOT NULL INT,
	bmi INT,
	restingHeartRate NOT NULL INT,
	caloriesBurned INT NOT NULL DEFAULT 0
	numOfKm_ran INT DEFAULT 0
	membershipType VARCHAR(10) NOT NULL DEFAULT 'None',
	username VARCHAR(16) NOT NULL,
	password VARCHAR(12) NOT NULL
);

CREATE TABLE Trainer(
	trainer_id SERIAL PRIMARY KEY,
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
	FOREIGN KEY(member_id)
		REFERENCES Members(member_id)
);

CREATE TABLE FitnessGoals(
	goalName VARCHAR(30) PRIMARY KEY,
	deadLine DATE NOT NULL,
	description TEXT,
	type VARCHAR(20) NOT NULL,
	commitment INT NOT NULL DEFAULT 1,
	currentPr INT NOT NULL DEFAULT 0,
	FOREIGN KEY(member_id)
		REFERENCES Members(member_id)
	
);

CREATE TABLE TrainerAvailabilities(
	Day VARCHAR(10)  
	PRIMARY KEY(Day,startTime,endTime)
	FOREIGN KEY(member_id)
		REFERENCES Members(member_id)

);

CREATE TABLE Bills(
	invoice_id SERIAL PRIMARY KEY,
	amount float(2)
	service VARCHAR(10)
	FOREIGN KEY(admin_id)
		REFERENCES Administrators(admin_id)
	FOREIGN KEY(member_id)
		REFERENCES Members(member_id)
	
);

CREATE TABLE Session(
	sessionId SERIAL PRIMARY KEY,
	type VARCHAR(10),
	capacity INT,
	name VARCHAR(30),
	description TEXT,
	startDate DATE DEFAULT CURRENT_DATE,
	endDATE DATE DEFAULT CURRENT_DATE,
	FOREIGN KEY(trainerId)
		REFERENCES Trainer(trainerId),
	FOREIGN KEY(roomNumber)
		REFERENCES Rooms(roomNumber),
	FOREIGN KEY(adminId)
		REFERENCES Administrator(adminId),
);



