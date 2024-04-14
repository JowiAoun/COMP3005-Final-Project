import app

class user:
    def __init__(self, memberId, firstName,lastName,username,password):
        self.memberId = memberId
        self.firstName = firstName
        self.lastName = lastName
        self.userName = username
        self.password = password


def registerMember():
    firstname = input("\nEnter your first name: ")
    lastname = input("\nEnter your last name: ")
    age = input("\nEnter your age: ")
    weight = input("\nEnter your weight: ")
    height = input("\nEnter your height: ")
    bmi = input("\nEnter your bmi: ")
    restingHeartRate = input("\nEnter your resting heart rate: ")
    membershipType = input("\nEnter your membership type: ")
    username = input("\nEnter your username: ")
    password = input("\nEnter your password: ")
    app.enrollMember(
        firstname,
        lastname,
        age,
        weight,
        height,
        bmi,
        restingHeartRate,
        membershipType,
        username,
        password,
    )
def profileManagement(member):
    choice = 0
    while(choice!="5"):
        print("1. Create a new routine \n 2. Create a new fitness goal \n 3. Update Personal Information \n 4. Update health statistics \n 5.Exit profileManagement \n")
        choice = input("Select one of the following options")
        if(choice=="1"):
            routineName = ""
            description = ""
            exercises = ""
            print("Enter a name for your exercise: ")
            routineName = input("Enter the name here: ")
            description = input("Enter a description here: \n")
            print("From the set of exercises below, enter a list containing the number beside each exercise: ")
            results = app.getExercises()
            for i in range(0, len(results)):
                print(str(results[i][0]) + ". " + str(results[i][1]))
                print("\tSets:" + str(results[i][2]))
                print("\tReps:" + str(results[i][3]))

            exercises = input("Enter here: ")
            exercises = exercises.split(",")
            app.createRoutine(routineName, description, str(member.memberId), exercises)

        elif(choice=="2"):
            goalName = input("Enter the name of your fitness goal here: ")
            deadLine = input("Enter the deadline of tha goal: ")
            description = input("Enter the description of the goal here: ")
            type = input("Enter the type of this goal: ")
            commitment = input("Enter the number of days you want to commit per week: ")
            memberId = str(member.memberId)

            ###Creating the goal:
            app.createFitnessGoals(goalName, deadLine, description, type, commitment, memberId)
        elif(choice=="3"):
            results = app.getMembers(str(member.memberId))
            age = str(results[0][3])
            weight = str(results[0][4])
            height = str(results[0][5])
            bmi = str(results[0][6])
            restingHeartRate = str(results[0][7])
            print("(1). Age: "+str(age))
            print("(2). Weight(lbs): "+str(weight))
            print("(3). Height(inches): "+str(height))
            print("(4). restingHeartRate: "+str(restingHeartRate))
            print("Enter anything else to exit")
            choice = input("Choose one of the following to update: \n")
            if(choice == "1"):
                age = input("Update your age:")
                app.setHealthMetrics(age,weight,height,restingHeartRate,str(member.memberId))
            elif(choice=="2"):
                weight = input("Update your weight")
                app.setHealthMetrics(age, weight, height, restingHeartRate,str(member.memberId))
            elif(choice=="3"):
                height = input("Update your height")
                app.setHealthMetrics(age, weight, height, restingHeartRate,str(member.memberId))
            elif(choice=="4"):
                restingHeartRate = input("Update your restingHeartRate")
                app.setHealthMetrics(age, weight, height, restingHeartRate,str(member.memberId))
            else:
                print("")

        elif(choice=="4"):
            results = app.getHealthStats(member.memberId)
            numKm = results[0][0]
            caloriesBurned = results[0][1]
            print("(1) Number of Km Ran: "+str(numKm))
            print("(2) Number of calories burned: " + str(caloriesBurned))
            print("Enter anything else to exit")
            choice = input("Choose one of the following health metrics to update: \n")

            if(choice=="1"):
                numKm = input("Update the number of km you have ran: ")
                app.setHealthStats(str(member.memberId),str(numKm),str(caloriesBurned))
            elif (choice == "2"):
                caloriesBurned = input("Update the number of calories you have burned: ")
                app.setHealthStats(str(member.memberId), str(numKm), str(caloriesBurned))
            else:
                print("")
        elif(choice=="5"):
            break
        else:
            print("Enter one of the choices presented")



def scheduleManagement(member):
    print("Select a session that you would like to enroll for: ")
    results = app.getSessions()

    for result in results:
        sessionId = result[0]
        sessionType = result[1]
        capacity = result[2]
        name = result[3]
        description = result[4]
        day = result[5]
        startDate = result[6]
        endDate = result[7]
        startTime = result[8]
        endTime = result[9]
        trainerId = result[10]
        roomNumber = result[11]
        adminId = result[12]

        print(
            f"{sessionId}. {name}\n"
            f"\tType: {sessionType}\n"
            f"\tCapacity: {capacity}\n"
            f"\tDescription: {description}\n"
            f"\tDay: {day}\n"
            f"\tStart Date: {startDate}\n"
            f"\tEnd Date: {endDate}\n"
            f"\tStart Time: {startTime}\n"
            f"\tEnd Time: {endTime}\n"
            f"\tTrainer ID: {trainerId}\n"
            f"\tRoom Number: {roomNumber}\n"
            f"\tAdmin ID: {adminId}"
        )

    option = input("Enter the id for a session: ")
    app.enrollInSession(str(member.memberId), str(option))


def viewCurrentRoutines(memberId):
    routines = app.getRoutines(str(memberId))
    print("")
    for routine in routines:
        routineId = routine[0]
        print(f"\nRoutine ID: {routineId}")
        print(f"Name: {routine[1]}")
        print(f"Description: {routine[2]}")
        exercises = app.getRoutineExercises(routineId)
        if exercises:
            print("Exercises:")
            for exercise in exercises:
                exerciseInfo = app.getExerciseInfoFromRoutine(exercise[0])
                if exerciseInfo:
                    exercise_info_tuple = exerciseInfo[0]
                    print(f"\t\nExercise ID: {exercise_info_tuple[0]}")
                    print(f"\tName: {exercise_info_tuple[1]}")
                    print(f"\tSets: {exercise_info_tuple[2]}")
                    print(f"\tReps: {exercise_info_tuple[3]}")
        else:
            print("This routine does not have any exercises.")

def dashboard(member):
    choice = "0"
    while(choice!="6"):

        print("(1) View current routines \n (2) View fitness goals \n (3) View current achievements(completed goals) \n (4) Display health statistics \n (5) View Bills\n(6) Exit dashbaord")
        choice = input("Select one of the following options")
        if (choice == "1"):
            print("Below are your current routines")
            viewCurrentRoutines(str(member.memberId))


        elif (choice=="2"):
            print("Bellow are your current fitness goals")
            result = app.getFitnessGoals(str(member.memberId), "false")

            if result!=None:
                for i in range(0,len(result)):
                    print(str(i+1))
                    print("GoalName: "+result[i][0])
                    print("DeadLine: "+str(result[i][1]))
                    print("Description: " + result[i][2])
                    print("Type: " + result[i][3])
                    print("Commitment: " + str(result[i][4]))
                    print("\n\n")
                completeGoal = input("Enter 'Y' if you would like to check off a goal or hit enter otherwise :\n")
                if completeGoal == 'Y':
                    goalId = (input("Select a goal that you would like to complete: "))
                    result = app.completeFitnessGoals(str(result[int(goalId)-1][0]),str(member.memberId))
                    if(result == True):
                        print("Goal was successfully marked as complete")
                    else:
                        print("There was an error completing the goal")
                else:
                    print(
                        "(1) View current routine \n (2) View fitness goals \n (3) Enroll for sessions \n (4) View current achievements(completed goals) \n (5) View bills")
                    choice = input("Select one of the following options")

            else:
                print("You have no fitness goals")
        elif(choice=="3"):

            results = app.getFitnessGoals(str(member.memberId),"True")
            if(len(results)>0):
                print("Below are the completed goals: ")
                for i in range(0, len(results)):
                    print(str(i + 1))
                    print("GoalName: " + results[i][0])
                    print("DeadLine: " + str(results[i][1]))
                    print("Description: " + results[i][2])
                    print("Type: " + results[i][3])
                    print("Commitment: " + str(results[i][4]))
                    print("\n\n")

            else:
                print("You have not goals that have been completed")
        elif(choice=="4"):
            results = app.getHealthStats(str(member.memberId))
            print("Below is your health statistics: ")
            for i in range(0, len(results)):
                print("Number of Kilometers ran: "+str(results[i][0]))
                print("Number of calories burned: "+str(results[i][1]))
        elif(choice=="5"):
            results = app.getBills(str(member.memberId))
            print("Below are your current bills: ")
            for i in range(0, len(results)):
                print("Service: " + str(results[i][1]))
                print("Amount: " + str(results[i][0]))

        elif(choice=="6"):
            break
        else:
            print("Please enter one of the options indicated")

def menu(member):
    choice = "0"
    while(choice!="4"):
        print("(1) profileManagement \n (2) scheduleManagement \n (3)dashboard \n 4.Logout")
        choice = input("Choose one of the following")
        if (choice == "1"):
            profileManagement(member)
        elif(choice=="2"):
            scheduleManagement(member)
        elif(choice == "3"):
            dashboard(member)
        elif(choice=="4"):
            print("Logged out")
            break
def memberLogin():
    print("Do you want to: ")
    print("(1) Register")
    print("(2) Login")
    choice = input("Choose one of the following: ")
    if choice == "1":
        registerMember()
    else:
        userName = input("Enter your username here: ")
        passWord = input("Enter your password here: ")
        result = app.login(str(userName),str(passWord),"MEMBERS")
        member = user(result[0], result[1], result[2], result[3], result[4])

        menu(member)
