from flask import Flask, request, jsonify
import psycopg
import datetime

connection = psycopg.connect("dbname=finalproject user=postgres host=localhost port=5432 password=postgres")
cur = connection.cursor()
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

    cur.execute("""
        INSERT INTO test (name, hobby, age)
        VALUES (%s, %s, %s);
    """, (name, hobby, age))

    connection.commit()
    return 'Added to db!'

@app.route('/testDbGetPeople', methods=['GET'])
def test_get_from_db():
    cur.execute("SELECT * FROM test;")
    rows = cur.fetchall()

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
    cur.execute(
    """
    DELETE FROM test;
    """)

    connection.commit()
    return 'Cleared db!'

@app.route('/getHeathStats/<int:memberId>', methods=['GET'])
def getHealthStats(memberId):
    try:
        cur.execute(
            """
            SELECT numOfKm_ran, caloriesBurned
            FROM Members
            WHERE memberId = %s;
            """,
            (memberId,)
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)
    
    except Exception as e:
        return jsonify({'error': str(e)})

@app.route('/getHeathMetrics/<int:memberId>', methods=['GET'])
def getHealthMetrics(memberId):
    try:
        cur.execute(
            """
            SELECT age, weight, height, bmi, restingHeartRate
            FROM Members
            WHERE memberId = %s;
            """,
            (memberId,)
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route("/getFitnessGoals/<int:memberId>", methods=["GET"])
def getFitnessGoals(memberId):
    try:
        cur.execute(
            """ SELECT goalName
                        FROM FitnessGoals
                        WHERE memberId = %s;
                
                    """
            % (memberId)
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)})


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


@app.route("/addTrainerAvailabilites/<int:trainerId>", methods=["POST"])
# Trainer
def addTrainerAvailabilites(trainerId):
    try:
        data = request.json
        if "day" in data and "startTime" in data and "endTime" in data:
            day = data["day"]
            startTime = data["startTime"]
            endTime = data["endTime"]
        cur.execute(
            """ INSERT INTO TrainerAvailabilities(day, startTime, endTime, trainerId, occupied) VALUES (%s,%s,%s,%s, %s);
                    """,
            (day, startTime, endTime, trainerId, "False"),
        )
        connection.commit()
        return jsonify(data)

    except psycopg.errors.UniqueViolation:
        print("availability already exists")


@app.route("/updateTrainerAvailabilites/<int:trainerId>", methods=["PUT"])
def updateTrainerAvailabilites(trainerId):
    try:
        data = request.json
        if (
            "newDay" in data
            and "newStartTime" in data
            and "newEndTime" in data
            and "day" in data
            and "startTime" in data
            and "endTime" in data
        ):
            newDay = data["newDay"]
            newStartTime = data["newStartTime"]
            newEndTime = data["newEndTime"]
            day = data["day"]
            startTime = data["startTime"]
            endTime = data["endTime"]
        cur.execute(
            """ UPDATE TrainerAvailabilities
                        SET day = %s, startTime = %s, endTime = %s
                        WHERE trainerId = %s AND day = %s AND startTime = %s AND endTime = %s;
                    """,
            (newDay, newStartTime, newEndTime, trainerId, day, startTime, endTime),
        )
        connection.commit()
        return jsonify(data)

    except psycopg.errors:
        print("Error updating availabilities for trainer")


###Adminstrator

# @app.route('/addFilters', methods=['POST'])
# ##Add functionality to retreive created session to add the filters.
# def addFilters(filters,sessionId):
#     ###Iterating through the filters array to add the filters to a given session.
#     for i in range(0,len(filters)):
#         cur.execute(""" INSERT INTO Filters(sessionId, filter) VALUES (%d,%s);
#                     """,(sessionId,filters[i]))
#         connection.commit()


@app.route('/createSession', methods=['POST'])
def createSession():
    try:
        data = request.json
        if (
            "type" in data
            and "capacity" in data
            and "name" in data
            and "description" in data
            and "day" in data
            and "startDate" in data
            and "endDate" in data
            and "startTime" in data
            and "endTime" in data
            and "trainerId" in data
            and "roomNumber" in data
            and "adminId" in data
        ):
            type = data["type"]
            capacity = data["capacity"]
            name = data["name"]
            description = data["description"]
            day = data["day"]
            startDate = data["startDate"]
            endDate = data["endDate"]
            startTime = data["startTime"]
            endTime = data["endTime"]
            trainerId = data["trainerId"]
            roomNumber = data["roomNumber"]
            adminId = data["adminId"]
        cur.execute(
            """ INSERT INTO Session (type, capacity, name, description, day, startDate, endDate, startTime, endTime, trainerId, roomNumber, adminId) VALUES (%s,%s,%s,%s,%s,%s,%s, %s, %s, %s, %s, %s);
                            """,
            (
                type,
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
        return jsonify(data)

    except psycopg.errors:
        print("Error inserting session")


@app.route("/updateSession/<int:sessionId>", methods=["PUT"])
def updateSession(sessionId):
    try:
        data = request.json
        if (
            "type" in data
            and "capacity" in data
            and "name" in data
            and "description" in data
            and "day" in data
            and "startDate" in data
            and "endDate" in data
            and "startTime" in data
            and "endTime" in data
            and "trainerId" in data
            and "roomNumber" in data
            and "adminId" in data
        ):
            type = data["type"]
            capacity = data["capacity"]
            name = data["name"]
            description = data["description"]
            day = data["day"]
            startDate = data["startDate"]
            endDate = data["endDate"]
            startTime = data["startTime"]
            endTime = data["endTime"]
            trainerId = data["trainerId"]
            roomNumber = data["roomNumber"]
            adminId = data["adminId"]
            # run the available rooms function
        cur.execute(
            """ UPDATE Session
                        SET type = %s, capacity = %s, name = %s, description = %s, day = %s, startDate = %s, endDate = %s, startTime = %s, endTime = %s, trainerId = %s, roomNumber = %s, adminId = %s
                        WHERE sessionId = %s;
                    """,
            (
                type,
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
                sessionId,
            ),
        )
        connection.commit()
        return jsonify(data)
    except psycopg.errors:
        print("Error inserting session")


@app.route("/updateRoom/<int:sessionId>", methods=["PUT"])
##Check this out and change the function
def updateRoom(sessionId):
    try:
        data = request.json
        if "roomNumber" in data:
            roomNumber = data["roomNumber"]
        # Updating the room availability
        cur.execute(
            """ UPDATE Session
                        SET roomNumber = %s
                        WHERE sessionId = %s;
                    """,
            (roomNumber, sessionId),
        )
        connection.commit()
        return jsonify(data)
    except psycopg.errors:
        print("Error updating the room")


###Members


@app.route('/enrollMember', methods=['POST'])
###Change this function
def enrollMember():
    try: 
        data = request.json
        if (
            "firstName" in data
            and "lastName" in data
            and "age" in data
            and "weight" in data
            and "height" in data
            and "bmi" in data
            and "restingHeartRate" in data
            and "membershipType" in data
            and "username" in data
            and "password" in data
        ):
            firstName = data["firstName"]
            lastName = data["lastName"]
            age = data["age"]
            weight = data["weight"]
            height = data["height"]
            bmi = data["bmi"]
            restingHeartRate = data["restingHeartRate"]
            membershipType = data["membershipType"]
            username = data["username"]
            password = data["password"]
        cur.execute(
            """ INSERT INTO Members(firstName, lastName, age, weight, height, bmi, restingHeartRate, caloriesBurned, numOfKm_ran, membershipType, username, password)
                        VALUES (%s,%s,%s,%s,%s,%s,%s,0,0,%s,%s,%s);                
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
        return jsonify(data)
    except psycopg.errors: 
        print("Error enrolling member")


@app.route("/createFitnessGoals/<int:memberId>", methods=["POST"])
def createFitnessGoals(memberId):
    try:
        data = request.json
        if (
            "goalName" in data
            and "deadLine" in data
            and "description" in data
            and "type" in data
            and "commitment" in data
        ):
            goalName = data["goalName"]
            deadLine = data["deadLine"]
            description = data["description"]
            type = data["type"]
            commitment = data["commitment"]
        cur.execute(
            """ INSERT INTO FitnessGoals(goalName, deadLine, description, type, commitment, memberId, completed) VALUES (%s,%s,%s,%s,%s,%s,%s);
                    """,
            (goalName, deadLine, description, type, commitment, memberId, "False"),
        )
        connection.commit()
        return jsonify(data)
    except psycopg.errors.UniqueViolation:
        print("Goal already exists for this user")


@app.route("/login/", methods=["POST"])
###General
def login():
    ###Checking if there exists a user with the given username and password
    try:
        data = request.json
        if "username" in data and "password" in data:
            username = data["username"]
            password = data["password"]
        cur.execute(
            """ SELECT *
                        FROM Members
                        WHERE username = %s AND password = %s;
                      """,
            (username, password),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/getRoutines/<int:memberId>", methods=["GET"])
def getRoutines(memberId):
    try: 
        cur.execute(
            """
                    SELECT *
                    FROM Routine
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
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})

@app.route('/getExercises', methods=['GET'])
def getExercises():
    try:
        cur.execute("""
                    SELECT *
                    FROM EXERCISE;
                    """)
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/getAvailableTrainers", methods=["POST"])
def getAvailableTrainers():
    try: 
        data = request.json
        if "day" in data and "startTime" in data and "endTime" in data:
            day = data["day"]
            startTime = data["startTime"]
            endTime = data["endTime"]
        cur.execute(
            """
                    SELECT trainerId
                    FROM TrainerAvailabilities
                    WHERE day = (%s) AND startTime >= (%s) AND endTime <= (%s) AND occupied = False;
                    """,
            (day, startTime, endTime),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route('/createRoutine', methods=['POST'])
###Function for adding an exercise to a routine. Takes an array of the given exercise ids to the following
def createRoutine():
    try: 
        data = request.json
        if (
            "routineName" in data
            and "description" in data
            and "memberId" in data
            and "exercises" in data
        ):
            routineName = data["routineName"]
            description = data["description"]
            memberId = data["memberId"]
            exercises = data["exercises"]
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
                        INSERT INTO RoutineContains(exerciseId,routineId)
                        VALUES (%s,%s);
                        """,
                (exercises[i], routineId[0]),
            )
            connection.commit()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/memberSearch/<searchTerm>", methods=["GET"])
###Function performing a search for specific members
def memberSearch(searchTerm):
    try:
        cur.execute(
            """
                    SELECT memberId,firstName,lastName
                    FROM Members
                    WHERE POSITION(%s IN firstName)>0 OR POSITION(%s IN lastName)>0;
                    """,
            (searchTerm, searchTerm),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/getMemberInfo/<int:memberId>", methods=["GET"])
def getMemberInfo(memberId):
    try:
        cur.execute(
            """
                    SELECT *
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
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/updateMemberInfo/<int:memberId>", methods=["PUT"])
def updateMemberInfo(memberId):
    try:
        data = request.json
        if (
            "firstName" in data
            and "lastName" in data
            and "age" in data
            and "weight" in data
            and "height" in data
            and "password" in data
        ):
            firstName = data["firstName"]
            lastName = data["lastName"]
            age = data["age"]
            weight = data["weight"]
            height = data["height"]
            password = data["password"]
        cur.execute(
            """
                        UPDATE Members
                        SET firstName = %s, lastName = %s, age = %s, weight = %s, height = %s, password = %s
                        WHERE memberId = %s;
                        """,
            (firstName, lastName, age, weight, height, password, memberId),
        )
        connection.commit()
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/getAvailableRooms", methods=["POST"])
###Finding all the sessions that start on the same days
def getAvailableRooms():
    try: 
        data = request.json
        if "day" in data and "startTime" in data and "endTime" in data:
            day = data["day"]
            startTime = data["startTime"]
            endTime = data["endTime"]
        ###Finding the sessions that occur on the same day
        cur.execute(
            """
                    SELECT ROOM.roomNumber,ROOM.capacity
                    FROM ROOM
                    LEFT JOIN SESSION
                    ON ROOM.roomNumber = SESSION.roomNumber
                    WHERE (SESSION.day = %s AND (SESSION.startTime > %s OR SESSION.endTime < %s)) OR SESSION.day IS NULL; 
                    """,
            (day, startTime, endTime),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route('/addTrainer', methods=['POST'])
def addTrainer():
    try:
        data = request.json
        if (
            "trainerId" in data
            and "day" in data
            and "startTime" in data
            and "endTime" in data
        ):
            trainerId = data["trainerId"]
            day = data["day"]
            startTime = data["startTime"]
            endTime = data["endTime"]
        cur.execute(
            """
                    UPDATE TrainerAvailabilities
                    SET occupied = true
                    WHERE TrainerAvailabilities.trainerId = %s AND TrainerAvailabilities.day = %s AND TrainerAvailabilities.endTime >= %s AND  TrainerAvailabilities.startTime <= %s;
                    """,
            (trainerId, day, startTime, endTime),
        )
        connection.commit()
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/getEquipment/<int:roomNumber>", methods=["GET"])
def getEquipment(roomNumber):
    try:
        cur.execute(
            """
            SELECT *
            FROM Equipment
            WHERE roomNumber = %s;
            """,
            (roomNumber,),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/updateEquipment/<int:roomNumber>", methods=["PUT"])
def updateEquipment(roomNumber):
    try:
        data = request.json
        if "name" in data and "status" in data and "roomNumber" in data:
            name = data["name"]
            status = data["status"]
        cur.execute(
            """ UPDATE Equipment
                        SET status = %s
                        WHERE roomNumber=%s AND name=%s;
                    """,
            (status, roomNumber, name),
        )
        connection.commit()
        return jsonify(data)

    except psycopg.errors:
        print("Error updating status for equipment")


@app.route("/getBills/<int:memberId>", methods=["GET"])
def getBills(memberId):
    try:
        cur.execute(
            """
                    SELECT *
                    FROM BILLS 
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
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/addBill/<int:memberId>", methods=["POST"])
def addBill(memberId):
    try: 
        data = request.json
        if (
            "amount" in data
            and "service" in data
            and "adminId" in data
            # and "memberId" in data
        ):
            amount = data["amount"]
            service = data["service"]
            adminId = data["adminId"]
            # memberId = data["memberId"]
        cur.execute(
            """ INSERT INTO Bills(amount, service, adminId, memberId, isPaid)
                        VALUES (%s, %s, %s, %s, %s);
                    """,
            (amount, service, adminId, memberId, "False"),
        )
        connection.commit()
        return jsonify(data)
    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/updateBill/<int:invoice_id>", methods=["PUT"])
def updateBill(invoice_id):
    try:
        data = request.json
        if "isPaid" in data and "paymentDate" in data:
            isPaid = data["isPaid"]
            paymentDate = data["paymentDate"]
        cur.execute(
            """ UPDATE Bills
                        SET isPaid = %s, paymentDate = %s
                        WHERE invoice_id = %s;
                    """,
            (
                isPaid,
                paymentDate,
                invoice_id,
            ),
        )
        connection.commit()
        return jsonify(data)

    except psycopg.errors:
        print("Error updating status for equipment")


@app.route("/getSessions", methods=["GET"])
def getSessions():
    try:
        cur.execute(
            """
                    SELECT *
                    FROM Session 
                    """,
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            for key, value in row_data.items():
                if isinstance(value, datetime.time):
                    row_data[key] = str(value)
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})


@app.route("/getCurrentSessions/<int:memberId>", methods=["GET"])
def getCurrentSessions(memberId):
    try:
        cur.execute(
            """
                    SELECT *
                    FROM Session 
                    WHERE memberId = %s
                    """,
            (memberId,),
        )
        columns = [desc[0] for desc in cur.description]
        results = cur.fetchall()
        data = []
        for row in results:
            row_data = dict(zip(columns, row))
            for key, value in row_data.items():
                if isinstance(value, datetime.time):
                    row_data[key] = str(value)
            data.append(row_data)
        return jsonify(data)

    except Exception as e:
        print(e)
        return jsonify({"error": str(e)})
