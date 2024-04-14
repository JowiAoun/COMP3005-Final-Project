import psycopg
import re
from datetime import datetime

POSTGRES_PASS = "Wy5w0UY5l55G1Pf"

connection = psycopg.connect(
    "dbname=finalproject user=postgres host=localhost port=5432 password="+POSTGRES_PASS
)
cur = connection.cursor()

def getHealthStats(memberId):
    cur.execute(
        """
        SELECT numOfKm_ran, caloriesBurned
        FROM MEMBERS
        WHERE memberId = %s;
        """, (memberId, ))

    results = cur.fetchall()
    return results


def getHealthMetrics(memberId):
    try:
        cur.execute(
            """
            SELECT age, weight, height, bmi, restingHeartRate
            FROM Members
            WHERE memberId = %s;
            """,
            (memberId,),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return data

    except Exception as e:
        return None

def completeFitnessGoals(goalName,memberId):
    try:
        cur.execute(""" DELETE FROM FITNESSGOALS 
                        WHERE goalName = %s AND memberId = %s);
                    """, (goalName, memberId))

        connection.commit()
        return True
    except Exception as err:
        print("Error deleting fitness goal",err)
        return False

def getFitnessGoals(memberId,completed):
    cur.execute(""" SELECT *
                    FROM FitnessGoals
                    WHERE memberId = %s AND completed = %s;
                """,(memberId,completed))
    result = cur.fetchall()
    return result


# When a user wants to choose a new exercise routine
# Displaying a list of exercise names that the user can choose from
'''
  def getExercises(pageNum):
    startIndex = 5*(pageNum-1)

    cur.execute(""" SELECT routineName,name
                    FROM Exercises
                    LIMIT 5 OFFSET %d;
                """ %(startIndex))
    connection.commit()

'''


# Trainer
def addTrainerAvailabilities(day, startTime, endTime, trainerId):
    try:
        cur.execute(
            """ INSERT INTO TrainerAvailabilities VALUES (%s,%s,%s,%s, FALSE);
                    """,
            (day, startTime, endTime, trainerId),
        )
        connection.commit()
    except psycopg.errors.UniqueViolation:
        print("availability already exists")


def updateTrainerAvailabilites(
    newDay, newStartTime, newEndTime, trainerId, day, startTime, endTime
):
    try:
        cur.execute(
            """ UPDATE TrainerAvailabilities
                        SET day = %s, startTime = %s, endTime = %s
                        WHERE trainerId = %s AND day = %s AND startTime = %s AND endTime = %s;
                    """,
            (newDay, newStartTime, newEndTime, trainerId, day, startTime, endTime),
        )
        connection.commit()

    except Exception:
        print("Error updating availabilities for trainer")


###Adminstrator
def enrollInSession(memberId, sessionId):
    try:
        cur.execute(
            """
            SELECT COUNT(*) 
            FROM EnrolledIn 
            WHERE memberId = %s AND sessionId = %s;
            """,
            (memberId, sessionId,)
        )

        count = cur.fetchone()[0]
        print(count)

        if count > 0:
            print("This member is already enrolled in this session")
            return


        cur.execute(
            """ INSERT INTO EnrolledIn(memberId, sessionId) VALUES(%s, %s)
                    """,
            (memberId, sessionId,)
        )
        connection.commit()

    except Exception as e:
        print("Error enrolling in sessions: ", e)


def getSessions():
    try:
        cur.execute(
            """ 
            SELECT *
            FROM SESSION;
            """
        )
        result = cur.fetchall()
        connection.commit()
        if result:
            print("Retrieved sessions!")
            return result
        else:
            print("Could not retrieve sessions")
            return None

    except Exception as e:
        print("Error retrieving for sessions: ", e)

def getSession(sessionId):
    try:
        cur.execute(
            """ 
            SELECT *
            FROM Session
            WHERE sessionId = %s;
            """, (sessionId, )
        )
        return cur.fetchone()

    except Exception:
        return None


def cancelSession(sessionId):
    try:
        cur.execute("""
        DELETE FROM Session
        WHERE sessionId = %s;
        """, (sessionId, ))
        connection.commit()
        return True

    except Exception as e:
        return False


def createSession(
    sessionType,
    capacity,
    name,
    description,
    startDate,
    endDate,
    trainerId,
    roomNumber,
    adminId,
    startTime,
    endTime,
    day
):

    connection.commit()

    try:
        cur.execute(
            """ INSERT INTO Session (type, capacity, name, description, day, startDate, endDate, startTime, endTime, trainerId, roomNumber, adminId)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);
            """,
            (
                sessionType,
                capacity,
                name,
                description,
                day,
                startDate,
                endDate,
                startTime,
                endTime,
                trainerId,
                roomNumber,
                adminId,
            ),
        )
        connection.commit()
        return True

    except Exception as e:
        print(e)
        return False


def updateSession(
    name, description, startDate, endDate, trainerId, roomNumber, sessionId
):
    try:
        cur.execute(
            """ UPDATE Session
                        SET name = %s, description = %s, startDate = %s, endDate = %s, trainerId = %d, roomNumber = %d
                        WHERE sessionId = %d;
                    """,
            (name, description, startDate, endDate, trainerId, roomNumber, sessionId),
        )
    except psycopg.errors:
        print("Error inserting session")


##Check this out and change the function
def updateRoom(roomNumber, sessionId):
    try:
        # Updating the room availability
        cur.execute(
            """ UPDATE Session
                        SET roomNumber = %d
                        WHERE sessionId = %d;
                    """,
            (roomNumber, sessionId),
        )
        connection.commit()
    except psycopg.errors:
        print("Error updating the room")


###Members
def enrollMember(
    firstName,
    lastName,
    age,
    weight,
    height,
    bmi,
    restingHeartRate,
    membershipType,
    username,
    password,
):
    try:
        cur.execute(
            """ INSERT INTO Members(firstName, lastName, age, weight, height, bmi, restingHeartRate, caloriesBurned, numOfKm_ran, membershipType, username, password)
                        VALUES (%s,%s,%d,%d,%d,%d,%d,0,0,%s,%s,%s);                
                    """,
            (
                firstName,
                lastName,
                age,
                weight,
                height,
                bmi,
                restingHeartRate,
                membershipType,
                username,
                password,
            ),
        )
        connection.commit()
    except psycopg.errors:
        print("Error enrolling member")


def createFitnessGoals(
    goalName, deadLine, description, type, commitment, memberId, completed
):
    try:
        cur.execute(
            """ INSERT INTO FitnessGoals VALUES (%s,%s,%s,%s,%d,%d,%r);
                    """,
            (goalName, deadLine, description, type, commitment, memberId, False),
        )
        connection.commit()
    except psycopg.errors.UniqueViolation:
        print("Goal already exists for this user")


def createFitnessGoals(goalName, deadLine, description, type, commitment, memberId):
    try:
        cur.execute(
            """ UPDATE FitnessGoals 
                        SET goalName = %s, deadLine = %s, description = %s, type= %s, commitment = %d, memberId = %d);
                    """,
            (goalName, deadLine, description, type, commitment, memberId),
        )
        connection.commit()
    except psycopg.errors.UniqueViolation:
        print("Goal already exists for this user")

def createFitnessGoals(goalName, deadLine, description, type, commitment, memberId):
    try:
        cur.execute("""
            INSERT INTO FitnessGoals (goalName, deadLine, description, type, commitment, memberId, completed)
            VALUES (%s, %s, %s, %s, %s, %s, false);
        """, (goalName, deadLine, description, type, commitment, memberId))
        connection.commit()
    except Exception as err:
        print("Error creating fitness goal", err)

###General

def login(userName, passWord, userType):
    try:
        cur.execute(
            """ SELECT *
                FROM {}
                WHERE username = %s AND password = %s;
            """.format(
                userType
            ),
            (userName, passWord),
        )
        user = cur.fetchone()

        connection.commit()
        if user:
            print("Successfully logged in!")
            return user
        else:
            print("Invalid username or password!")
            return None  # Return None if login is unsuccessful
    except Exception as err:
        print("Error making the login:", err)
        return None  # Return None in case of any error


def getRoutines(memberId):
    try:
        cur.execute(
            """
            SELECT *
            FROM ROUTINE
            WHERE memberId = %s;
            """,
            (memberId,),
        )
        result = cur.fetchall()
        connection.commit()
        if result:
            print("Retrieved routines for that member!")
            return result
        else:
            print("This member does not have any routines...")
            return None
    except Exception as err:
        print("Error retrieving routines: ", err)
        return None

def getExercises():
    try:
        cur.execute("""
                    SELECT *
                    FROM EXERCISE;
                    """)
        results = cur.fetchall()
        return results
    except Exception as err:
        print("Error getting exercises",err)

def getExerciseInfoFromRoutine(exerciseId):
    try:
        cur.execute(
            """
                    SELECT *
                    FROM EXERCISE
                    WHERE exerciseId=%s;
                    """,
            (exerciseId,),
        )
        result = cur.fetchall()
        connection.commit()
        if result:
            return result
        else:
            return None
    except Exception as err:
        print("Error retrieving exercises: ", err)
        return None

def getRoutineExercises(routineId):
    try:
        cur.execute(
            """
                    SELECT *
                    FROM RoutineContains
                    WHERE routineId = %s;
                    """,
            (routineId,),
        )
        result = cur.fetchall()
        connection.commit()
        if result:
            return result
        else:
            return None
    except Exception as err:
        print("Error retrieving exercises: ", err)
        return None

def getAvailableTrainers(day, startTime, endTime):
    try:
        cur.execute(
            """
            SELECT trainerId
            FROM TRAINERAVAILABILITIES
            WHERE day = (%s) AND startTime >= (%s) AND endTime <= (%s) AND occupied = False;
            """,
            (day, startTime, endTime, ),
        )
        trainers = cur.fetchall()
        return trainers

    except Exception as e:
        print(e)
        return None

def getTrainer(trainerId):
    try:
        cur.execute("""
        SELECT *
        FROM Trainer
        WHERE trainerId = %s;
        """, (trainerId,))

        return cur.fetchone()

    except Exception:
        return None

def setHealthStats(memberId,numOfKm,caloriesBurned):
    try:

        cur.execute(
            """
            UPDATE MEMBERS
            SET  numOfKm_ran =  %s, caloriesBurned = %s 
            WHERE memberId = %s;
            """,
            (numOfKm, caloriesBurned,memberId)
        )
        connection.commit()
        return True
    except Exception as err:
        print(err)
        return False

def setHealthMetrics(age,weight,height,restingHeartRate,memberId):
    cur.execute(
        """
        UPDATE MEMBERS
        SET age=%s, weight=%s, height=%s, restingHeartRate=%s
        WHERE memberId = %s;
        """,
        (age,weight,height,restingHeartRate,memberId)
    )
    connection.commit()

    return True

###Function for adding an exercise to a routine. Takes an array of the given exercise ids to the following
def createRoutine(routineName, description, memberId, exercises):
    try:
        print(exercises)
        ###Making the routine
        cur.execute(
            """
            INSERT INTO Routine(routineName,description,memberId)
            VALUES (%s,%s,%s)
            """,
            (routineName, description, memberId),
        )

        connection.commit()

        ###Getting the routineId of the recently created routine
        cur.execute(
            """
                     SELECT routineId
                     FROM ROUTINE
                     WHERE routineName = %s AND memberId = %s; 
                     """,
            (routineName, memberId),
        )

        routineId = cur.fetchone()

        ###Adding exercises to the routine
        for i in range(0, len(exercises)):
            cur.execute(
                """
                INSERT INTO RoutineContains(exerciseId, routineId)
                VALUES (%s, %s);
                """,
                (exercises[i], routineId[0]),
            )
            connection.commit()
        print("----- GOOD 3!!!!")

    except Exception:
        print("Error adding exercises")


###Function performing a search for specific members
def memberSearch(searchTerm):
    try:
        cur.execute(
            """
            SELECT *
            FROM MEMBERS
            WHERE POSITION(%s IN firstName)>0 OR POSITION(%s IN lastName)>0;
            """,
            (searchTerm, searchTerm),
        )
        result = cur.fetchall()
        connection.commit()
        if result:
            print("Retrieved members with that search term!")
            return result
        else:
            print("Invalid search term...")
            return None

    except Exception as e:
        print("Error searching for members: ", e)

def getMembers(memberId):
    try:
        cur.execute("""
                    SELECT *
                    FROM MEMBERS
                    WHERE memberId = %s;
                    """, (memberId,))
        result = cur.fetchall()
        return result

    except Exception as err:
        print("Error getting members",err)

def getMember(memberId):
    try:
        cur.execute(
            """
            SELECT *
            FROM Members
            WHERE memberId = %s;
            """, (memberId, ),
        )
        return cur.fetchone()
    except Exception as e:
        print(e)
        return None

###Finding all the sessions that start on the same days
def getAvailableRooms():
    try:
        ###Finding the sessions that occur on the same day
        cur.execute(
            """
                    SELECT roomNumber,capacity
                    FROM ROOM
                    LEFT JOIN SESSION
                    ON ROOM.roomNumber = SESSION.roomNumber
                    WHERE (SESSION.day = 'Monday' AND (SESSION.startTime > '10:00:00' OR SESSION.endTime < '9:00:00')) OR SESSION.day IS NULL; 
                    """
        )
        rooms = cur.fetchall()
        return rooms
    except psycopg.errors:
        print("Error finding the available rooms")


def addTrainer(trainerId, day, startTime, endTime):
    try:
        cur.execute(
            """
                    UPDATE TRAINERAVAILABILITIES
                    SET TRAINERAVAILABILITIES.occupied = true
                    WHERE TRAINERAVAILABILITIES.trainerId = %d AND TRAINERAVAILABILITIES.Day = %s AND TRAINERAVAILABILITIES.endTime <= %s AND  TRAINERAVAILABILITIES.startTime >= %s 
                    """,
            (trainerId, day, startTime, endTime),
        )
        connection.commit()

    except psycopg.errors:
        print("Error removing trainer")


def getEquipments(roomNumber):
    try:
        cur.execute(
            """
            SELECT *
            FROM Equipment
            WHERE roomNumber = %s;
            """,
            (roomNumber, ))
        return cur.fetchall()

    except Exception:
        return None


def updateEquipment(status, roomNumber, name):
    try:
        cur.execute(
            """ UPDATE Equipment
                        SET status = %s
                        WHERE roomNumber=%s AND name=%s;
                    """,
            (status, roomNumber, name),
        )
        connection.commit()
        return True

    except Exception:
        return False


def addEquipment(roomNumber, name, status):
    try:
        cur.execute(
            """
            INSERT INTO Equipment(name, status, roomNumber)
            VALUES (%s, %s, %s)
            """, (name, status, roomNumber))
        connection.commit()

        return True
    except Exception:
        return False


def getAllRooms():
    try:
        cur.execute("""
        SELECT *
        FROM Room
        """, ())

        return cur.fetchall()
    except Exception:
        return None

def getAdministrator(adminId):
    try:
        cur.execute("""
        SELECT *
        FROM Administrator
        WHERE adminId = %s;
        """, (adminId, ))

        return cur.fetchone()

    except Exception as e:
        print(e)
        return None

def getBills(memberId):
    try:
        cur.execute(
            """
            SELECT *
            FROM BILLS 
            WHERE memberId = %s;
            """,
            (memberId, ),
        )
        return cur.fetchall()

    except Exception as e:
        return None


def addBill(amount, service, adminId, memberId):
    try:
        cur.execute("""
            INSERT INTO Bills(amount, service, adminId, memberId, isPaid, paymentDate)
            VALUES (%s, %s, %s, %s, false, NULL);
            """, (amount, service, adminId, memberId, ))
        connection.commit()
        return True
    except Exception:
        return False

def is_valid_date(date_string):
    pattern = re.compile(r'^\d{4}-\d{2}-\d{2}$')
    if re.match(pattern, date_string):
        return True
    else:
        return False

def get_day_of_week(date_string) -> str:
    try:
        date_obj = datetime.strptime(date_string, "%Y-%m-%d")
        day_of_week = date_obj.weekday()
        match day_of_week:
            case 0:
                return "Monday"
            case 1:
                return "Tuesday"
            case 2:
                return "Wednesday"
            case 3:
                return "Thursday"
            case 4:
                return "Friday"
            case 5:
                return "Saturday"
            case 6:
                return "Sunday"
    except ValueError:
        return None
