from flask import Flask, request, jsonify
from server.db import conn, cursor
import psycopg

app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug = True)

@app.route('/', methods=['GET'])
def hello_world():
    return 'Hello, Docker!'

@app.route('/testDbInsert', methods=['GET'])
def test_add_to_db():
    name = request.args.get('name')
    hobby = request.args.get('hobby')
    age = request.args.get('age')

    cursor.execute("""
        INSERT INTO test (name, hobby, age)
        VALUES (%s, %s, %s);
    """, (name, hobby, age))

    conn.commit()
    return 'Added to db!'

@app.route('/testDbGetPeople', methods=['GET'])
def test_get_from_db():
    cursor.execute("SELECT * FROM test;")
    rows = cursor.fetchall()

    people = []
    for row in rows:
        person = {
            'id': row[0],
            'name': row[1],
            'hobby': row[2],
            'age': row[3]
        }
        people.append(person)

    return jsonify(people)

@app.route('/testDbClear', methods=['GET'])
def test_clear_db():
    cursor.execute(
    """
    DELETE FROM test;
    """)

    conn.commit()
    return 'Cleared db!'

@app.route('/heathStats', methods=['GET'])
def getHealthStats():
    username = request.args.get('username')
    try:
        cursor.execute(
            """
            SELECT caloriesBurned, numOfKmRan
            FROM Members
            WHERE username = '%s';
            """,
            (username)
        )
        result = cursor.fetchall()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': e})
    
@app.route('/heathMetrics', methods=['GET'])
def getHealthMetrics():
    username = request.args.get('username')
    try:
        cursor.execute(
            """
            SELECT age, weight, height, bmi, restingHeartRate, bloodPressure
            FROM Members
            WHERE username = '%s';
            """,
            (username)
        )
        result = cursor.fetchall()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': e})

connection = psycopg.connect("dbname=finalproject user=postgres host=localhost port=5432 password=postgres")
cur = connection.cursor()

def getFitnessGoals(member_id):
    cur.execute(""" SELECT goalName
                    FROM FitnessGoals
                    WHERE memberId = %d;
            
                """ % (member_id))
    connection.commit()

#When a user wants to choose a new exercise routine
#Displaying a list of exercise names that the user can choose from
'''
  def getExercises(pageNum):
    startIndex = 5*(pageNum-1)

    cur.execute(""" SELECT routineName,name
                    FROM Exercises
                    LIMIT 5 OFFSET %d;
                """ %(startIndex))
    connection.commit()

'''

#Trainer
def addTrainerAvailabilites(day,startTime,endTime,trainerId):
    try:
        cur.execute(""" INSERT INTO TrainerAvailabilities VALUES (%s,%s,%s,%d);
                    """,(day, startTime, endTime, trainerId))

    except psycopg.errors.UniqueViolation:
        print("availability already exists")



def updateTrainerAvailabilites(newDay,newStartTime,newEndTime,trainerId):
    try:
        cur.execute(""" UPDATE TrainerAvailabilities
                        SET day = %s, startTime = %s, endTime = %s
                        WHERE trainerId = %d AND day = %s AND startTime = %s;
                    """,(newDay,newStartTime,newEndTime,trainerId,newDay,startTime))
        connection.commit()

    except psycopg.errors:
        print("Error updating availabilities for trainer")

###Adminstrator

##Add functionality to retreive created session to add the filters.
def addFilters(filters,sessionId):
    ###Iterating through the filters array to add the filters to a given session.
    for i in range(0,len(filters)):
        cur.execute(""" INSERT INTO Filters(sessionId, filter) VALUES (%d,%s); 
                    """,(sessionId,filters[i]))
        connection.commit()


def createSession(type,capacity,name,description,startDate,endDate,trainerId,roomNumber,adminId,filters):

    ###Getting the trainer
    cur.execute(""" SELECT firstName
                        FROM TRAINER
                        WHERE trainerId = %d;
                    """, (trainerId))
    result = cur.fetchall()
    connection.commit()

    if (len(result) > 0):
        try:

            cur.execute(""" INSERT INTO Session (type, capacity, name, description, startDate, endDate, trainerId, roomNumber, adminId) VALUES (%s,%d,%s,%s,%d,%d.%d);
                               """, (type, capacity, name, description, startDate, endDate, trainerId, roomNumber, adminId))
            connection.commit()

            ###Retreiving the recently added tuple

            cur.execute(""" SELECT sessionId
                            FROM Session
                            ORDER BY sessionId DESC
                            LIMIT 1;
                        """)
            recentSession = cur.fetchone()

            ##Adding the filters
            addFilters(recentSession,filters)

        except psycopg.errors:
            print("Error inserting session")
    else:
        print("The trainer does not exist")




def updateSession(name,description,startDate,endDate,trainerId,roomNumber,sessionId):
    try:
        cur.execute(""" UPDATE Session
                        SET name = %s, description = %s, startDate = %s, endDate = %s, trainerId = %d, roomNumber = %d
                        WHERE sessionId = %d;
                    """,(name,description,startDate,endDate,trainerId,roomNumber,sessionId))
    except psycopg.errors:
        print("Error inserting session")


##Check this out and change the function
def updateRoom(roomNumber,sessionId):
    try:
        #Retri

        #Updating the room availability
        cur.execute(""" UPDATE Session
                        SET roomNumber = %d
                        
                    """)
        connection.commit()
    except psycopg.errors:
        print("Error updating the room")

###Members

###Change this function
def enrollMember(firstName, lastName, age, weight, height, bmi, restingHeartRate,membershipType, username, password):
    try: 
        cur.execute(""" INSERT INTO Members(firstName, lastName, age, weight, height, bmi, restingHeartRate, caloriesBurned, numOfKm_ran, membershipType, username, password)
                        VALUES (%s,%s,%d,%d,%d,%d,%d,0,0,%s,%s,%s);                
                    """,(firstName, lastName, age, weight, height, bmi, restingHeartRate, membershipType, username, password))
        connection.commit()
    except psycopg.errors: 
        print("Error enrolling member")

def createFitnessGoals(goalName, deadLine, description, type, commitment, currentPr, memberId):
    try:
        cur.execute(""" INSERT INTO FitnessGoals VALUES (%s,%s,%s,%s,%d,%d,%d);
                    """,(goalName, deadLine, description, type, commitment, currentPr, memberId))
        connection.commit()
    except psycopg.errors.UniqueViolation:
        print("Goal already exists for this user")

###General
def login(userName, passWord, userType):
    ###Checking if there exists a user with the given username and password
    try:
        cur.execute(""" SELECT *
                        FROM %s
                        WHERE username = %s AND password = %s;
                      """, (userType, userName, passWord))
        connection.commit()
    except psycopg.errors:
        print("Error making the login")
    

def getRoutines(memberId):
    try: 
        cur.execute("""
                    SELECT *
                    FROM ROUTINE
                    WHERE memberID = %d;
                    """,(memberId))
        connection.commit()
    except psycopg.errors:
        print("Error getting routines")


def getExercises():
    try:
        cur.execute("""
                    SELECT *
                    FROM EXERCISE;
                    """)
        connection.commit()
    except psycopg.errors:
        print("Error getting exercises") 





def getAvailableTrainers(day,startTime,endTime):
    try: 
        cur.execute("""
                    SELECT trainerId
                    FROM TRAINERAVAILABILITIES
                    WHERE day = (%s) AND startTime >= (%s) AND endTime <= (%s) AND occupied = False;
                    """,(day,startTime,endTime))
        trainers = cur.fetchall()
        return trainers

    except psycopg.errors:
        print("Error getting available trainers")

def createRoutine(routineName,description,memberId):
    try: 
        cur.execute("""
                    INSERT INTO Routine(routienName,description,memberId)
                    VALUES (%s,%s,%s,%d)
                    """,(routineName,description,memberId))
        
        connection.commit()

    except psycopg.errors:
        print("Error creating routine")

###Function for adding an exercise to a routine. Takes an array of the given exercise ids to the following 
def createRoutine(routineName,description,memberId,exercises):
    try: 
        ###Making the routine
         cur.execute("""
                    INSERT INTO Routine(routineName,description,memberId)
                    VALUES (%s,%s,%s,%d)
                    """,(routineName,description,memberId))
        
         connection.commit()

        ###Getting the routineId of the recently created routine
         cur.execute("""
                     SELECT routineId
                     FROM ROUTINE
                     WHERE routineName = %s AND memberId = %d; 
                     """,(routineName,memberId))
        
         routineId - cur.fetchone()


        ###Adding exercises to the routine
         for i in range(0,len(exercises)):
            
            cur.execute("""
                        INSERT INTO RoutineContains(exerciseId,routineId)
                        VALUES (%s,%d);
                        """,(exercises[i],routineId))
            connection.commit()
    except psycopg.errors: 
        print("Error adding exercises")

###Function performing a search for specific members
def memberSearch(searchTerm):
    try: 
        cur.execute("""
                    SELECT memberId,firstName,lastName
                    FROM MEMBERS
                    WHERE POSITION(%s IN firstName)>0 OR POSITION(%s IN lastName)>0;
                    """)
        result = cur.fetchall()

    except psycopg.errors:
        print("Error searching for members") 


def getMembers(memberId):
    try: 
        cur.execute("""
                    SELECT *
                    FROM MEMBERS
                    WHERE memberId = %d;
                    """,(memberId))
        result = cur.fetchall()

    except psycopg.errors: 
        print("Error getting members")

###Finding all the sessions that start on the same days
def getAvailableRooms():
    try: 
        ###Finding the sessions that occur on the same day 
        cur.execute("""
                    SELECT roomNumber,capacity
                    FROM ROOM
                    LEFT JOIN SESSION
                    ON ROOM.roomNumber = SESSION.roomNumber
                    WHERE (SESSION.day = 'Monday' AND (SESSION.startTime > '10:00:00' OR SESSION.endTime < '9:00:00')) OR SESSION.day IS NULL; 
                    """)
        rooms = cur.fetchall()
        return rooms
    except psycopg.errors: 
        print("Error finding the available rooms")

def addTrainer(trainerId,day,startTime,endTime):
    try:
        cur.execute("""
                    UPDATE TRAINERAVAILABILITIES
                    SET TRAINERAVAILABILITIES.occupied = true
                    WHERE TRAINERAVAILABILITIES.trainerId = %d AND TRAINERAVAILABILITIES.Day = %s AND TRAINERAVAILABILITIES.endTime <= %s AND  TRAINERAVAILABILITIES.startTime >= %s 
                    """,(trainerId,day,startTime,endTime))
        connection.commit()

    except psycopg.errors:
        print("Error removing trainer") 

@app.route('/getEquipment', methods=['GET'])
def getEquipment(roomNumber):
    roomNumber = request.args.get('roomNumber')
    try:
        cursor.execute(
            """
            SELECT *
            FROM Equipment
            WHERE roomNumber = '%d';
            """,
            (roomNumber)
        )
        result = cursor.fetchall()
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': e})