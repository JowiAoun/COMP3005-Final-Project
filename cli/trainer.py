import app


class Trainer:
    def __init__(self, trainerId, firstName, lastName, username, password):
        self.trainerId = trainerId
        self.firstName = firstName
        self.lastName = lastName
        self.username = username
        self.password = password


def main():
    print("Login as a user")
    print("1 member")
    print("2 trainer")
    print("3 Admin")
    choice = input("\nSelect an option: ")

    if choice == "2":
        trainerLogin()

    else:
        print("Ye")


def trainerLogin():
    # username = input("Enter username: ")
    # password = input("Enter password: ")
    username = "michael"
    password = "officeboss"
    result = app.login(username, password, "Trainer")
    user = Trainer(result[0], result[1], result[2], result[3], result[4])
    print(user.trainerId, user.firstName, user.lastName, user.username, user.password)
    trainerMenu(user.trainerId)


def trainerMenu(trainerId):
    print(
        "\n1. Add a new time availability\n2. Edit an availability\n3. Search for a member"
    )
    selection = input("Select an option: ")
    if selection == "1":
        addAvailabilities(trainerId)
    elif selection == "2":
        updateTrainerAvailabilities(trainerId)
    elif selection == "3":
        memberSearch()
    else:
        print("Invalid, try another number!")


def addAvailabilities(trainerId):
    # day = input("\nEnter a day: ")
    # startTime = input("Enter the start time (HH:MM:SS format): ")
    # endTime = input("Enter the end time (HH:MM:SS format): ")
    day = "Wednesday"
    startTime = "11:00:00"
    endTime = "12:00:00"

    app.addTrainerAvailabilities(day, startTime, endTime, trainerId)


def updateTrainerAvailabilities(trainerId):
    # newDay = input("\nEnter a new day: ")
    # newStartTime = input("Enter a new start time (HH:MM:SS format): ")
    # newEndTime = input("Enter a new end time (HH:MM:SS format): ")
    # day = input("Enter the old day of your availability: ")
    # startTime = input("Enter the old start time (HH:MM:SS format): ")
    # endTime = input("Enter the old end time (HH:MM:SS format): ")
    newDay = "Thursday"
    newStartTime = "2:00:00"
    newEndTime = "3:00:00"
    day = "Wednesday"
    startTime = "11:00:00"
    endTime = "12:00:00"

    app.updateTrainerAvailabilites(
        newDay, newStartTime, newEndTime, trainerId, day, startTime, endTime
    )


def memberSearch():
    searchTerm = input("\nEnter a search term: ")
    result = app.memberSearch(searchTerm)

    if result:
        allMemberRoutines = []
        for member in result:
            memberId = member[0]
            print(memberId)
            routines = app.getRoutines(memberId)
            allMemberRoutines.append(routines)
        for member_index, member in enumerate(result):
            memberId = member[0]
            member_routines = allMemberRoutines[member_index]
            print(
                "\nMember ID: "
                + str(member[0])
                + "\nName: "
                + member[1]
                + " "
                + member[2]
                + "\nAge: "
                + str(member[3])
                + "\nWeight: "
                + str(member[4])
                + " kg"
                + "\nHeight: "
                + str(member[5])
                + " cm"
                + "\nBMI: "
                + str(member[6])
                + "\nResting heart rate: "
                + str(member[7])
                + "\nCalories burned: "
                + str(member[8])
                + "\nNumber of kilometres ran: "
                + str(member[9])
                + "\nMembership type: "
                + str(member[10])
                + "\nUsername: "
                + member[11]
                + "\nRoutines:"
            )
            if member_routines:
                for routine in member_routines:
                    print(
                        "Name of routine: "
                        + str(routine[1])
                        + "\nDescription: "
                        + str(routine[2])
                    )
            else:
                print("No routines!")
    else:
        print("Could not find any member matching the search term.")


main()
