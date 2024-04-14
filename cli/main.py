import app
from trainer import trainerLogin
from member import memberLogin

class Administrator:
    def __init__(self, adminId, username, firstName, lastName, password):
        self.adminId: int = adminId
        self.firstName: str = firstName
        self.lastName: str = lastName
        self.username: str = username
        self.password: str = password

def main():
    choice = -1
    while choice != 0:
        print("\nLogin as a user:")
        print("(1) Member")
        print("(2) Trainer")
        print("(3) Admin")
        print("(0) Exit")
        choice = int(input("Select an option: "))

        if choice == 1:
            memberLogin()

        if choice == 2:
            trainerLogin()

        if choice == 3:
            result = app.login("stanley", "pretzelday", "Administrator")
            user = Administrator(result[0], result[1], result[2], result[3], result[4])

            while choice != 0:
                print("\nAdministrator Menu:")
                print("(1) View rooms")
                print("(2) Class Sessions")
                print("(3) Billings")
                print("(0) Exit")
                choice = int(input("Select an option: "))

                match choice:
                    case 1:
                        rooms = app.getAllRooms()
                        if rooms is None:
                            print("Could not find any rooms.")
                            continue

                        print("\nRoom Number  | Capacity  | Is Available?")
                        print("----------------------------------------")
                        for room in rooms:
                            print(f"{room[0]:<13}| {room[1]:<10}| {room[2]}")

                        print("\n(1) View equipment")
                        print("(2) Update equipment")
                        print("(3) Add equipment")
                        print("(0) Return to menu")
                        choice = int(input("Select an option: "))

                        match choice:
                            case 1:
                                roomNumber = int(input("Enter room number: "))

                                equipments = app.getEquipments(roomNumber)
                                if equipments is None:
                                    print("Invalid room number.")
                                    continue

                                if len(equipments) == 0:
                                    print("There are no equipments in this room.")
                                    continue

                                print("\nName                    | Status")
                                print("--------------------------------")
                                for equipment in equipments:
                                    print(f"{equipment[0]:<24}| {equipment[1]}")

                            case 2:
                                roomNumber = int(input("Enter room number: "))

                                equipments = app.getEquipments(roomNumber)
                                if equipments is None:
                                    print("Invalid room number.")
                                    continue

                                if len(equipments) == 0:
                                    print("There are no equipments in this room.")
                                    continue

                                print("\nName                    | Status")
                                print("--------------------------------")
                                for equipment in equipments:
                                    print(f"{equipment[0]:<24}| {equipment[1]}")

                                equipmentName = input("Enter equipment name: ")
                                equipmentStatus = input("Enter new equipment's status: ")

                                res = app.updateEquipment(equipmentStatus, roomNumber, equipmentName)
                                if res:
                                    print("Successfully updated status for equipment:", equipmentName)
                                else:
                                    print("Could not update status for the equipment.")

                            case 3:
                                roomNumber = int(input("Enter room number: "))

                                equipments = app.getEquipments(roomNumber)
                                if equipments is None:
                                    print("Invalid room number.")
                                    continue

                                if len(equipments) > 0:
                                    print("\nName                    | Status")
                                    print("--------------------------------")
                                    for equipment in equipments:
                                        print(f"{equipment[0]:<24}| {equipment[1]}")

                                equipmentName = input("Enter new equipment's name: ")
                                equipmentStatus = input("Enter new equipment's status: ")

                                res = app.addEquipment(roomNumber, equipmentName, equipmentStatus)
                                if res:
                                    print("Successfully added equipment", equipmentName, "to room", equipmentName)
                                else:
                                    print("Could not add equipment to the room.")

                            case _:
                                choice = -1
                                continue

                    case 2:
                        print("\nClass Sessions:")

                        sessions = app.getSessions()
                        if len(sessions) == 0:
                            print("There are no sessions to display.")

                        print("Session ID | Name                 | Room | Day        | Capacity")
                        print("----------------------------------------------------------------")
                        for session in sessions:
                            print(f"{session[0]:<11}| {session[3]:<21}| {session[11]:<5}| {session[5]:<11}| {session[2]}")

                        print("\n(1) View session details")
                        print("(2) Add session")
                        print("(3) Cancel session")
                        print("(0) Return to menu")
                        choice = int(input("Select an option: "))

                        match choice:
                            case 1:
                                sessionId = input("Enter the session ID: ")
                                session = app.getSession(sessionId)
                                if session is None:
                                    print("Could not find session with ID:", sessionId)
                                    continue

                                print("Session Details:")
                                print("----------------")
                                print(f"Session ID  : {session[0]}")
                                print(f"Type        : {session[1]}")
                                print(f"Capacity    : {session[2]}")
                                print(f"Name        : {session[3]}")
                                print(f"Description : {session[4]}")
                                print(f"Day         : {session[5]}")
                                print(f"Start date  : {session[6]}")
                                print(f"End date    : {session[7]}")
                                print(f"Start time  : {session[8]}")
                                print(f"End time    : {session[9]}")
                                print(f"Trainer ID  : {session[10]}")
                                print(f"Room Number : {session[11]}")
                                print(f"Admin ID    : {session[12]}")

                            case 2:
                                print("Enter the Session Details:")
                                print("--------------------------")
                                name = input("Title       : ")
                                sessionType = input("Type        : ")
                                capacity = input("Capacity    : ")
                                description = input("Description : ")
                                roomNumber = input("Room Number : ")
                                startTime = input("Start time (HH:MM:SS)  : ")
                                endTime = input("End time   (HH:MM:SS)  : ")
                                startDate = input("Start date (YYYY-MM-DD)  : ")
                                endDate = input("End date   (YYYY-MM-DD)  : ")

                                if not app.is_valid_date(startDate) or not app.is_valid_date(endDate):
                                    print("Please enter correctly formatted dates in the form YYYY-MM-DD")
                                    continue
                                day = app.get_day_of_week(startDate)
                                availableTrainers = app.getAvailableTrainers(day, startTime, endTime)

                                if availableTrainers is None or len(availableTrainers) == 0:
                                    print("There are no available trainers for the given days.")
                                    continue

                                print("Available trainer IDs:")
                                print("----------------------")
                                for trainer in availableTrainers:
                                    print("- Trainer ID:", trainer[0])

                                trainerId = input("Enter an available trainer ID: ")

                                res = app.createSession(sessionType, capacity, name, description, startDate, endDate, trainerId, roomNumber, user.adminId, startTime, endTime, day)
                                if res:
                                    print("Successfully created session")
                                else:
                                    print("Could not create session")

                            case 3:
                                sessionId = input("Enter the session ID: ")
                                res = app.cancelSession(sessionId)
                                if res:
                                    print("Successfully canceled session with ID:", sessionId)
                                else:
                                    print("Could not find a session with ID:", sessionId)
                            case _:
                                choice = -1
                                continue

                    case 3:
                        print("\n(1) View a member's bills")
                        print("(2) Bill a member")
                        print("(0) Return to menu")
                        choice = int(input("Select an option: "))

                        match choice:
                            case 1:
                                memberId = int(input("Enter member's ID: "))
                                member = app.getMember(memberId)
                                if member is None:
                                    print("Could not find member with ID:", memberId)
                                    continue

                                bills = app.getBills(member[0])

                                if len(bills) == 0:
                                    print("This user does not currently have any bills.")
                                    continue

                                print("Bills for", member[1], member[2])
                                print("Inv. ID  | Service                  | Amount  | Issued By                  | Payment Date  | Is Paid?")
                                print("-----------------------------------------------------------------------------------------------------")
                                for bill in bills:
                                    issuedByAdmin = app.getAdministrator(bill[3])

                                    issuedByAdminName = issuedByAdmin[1] + " " + issuedByAdmin[2]
                                    if issuedByAdmin is not None:
                                        issuedByAdminName = "Unknown"
                                    paymentDate = "" if not bill[6] else str(bill[5])

                                    print(f"{bill[0]:<9}| {bill[2]:<25}| {bill[1]:<8}| {issuedByAdminName:<27}| {paymentDate:<14}| {'Yes' if bill[6] else 'No'}")

                            case 2:
                                memberId = int(input("Enter member's ID: "))
                                member = app.getMember(memberId)
                                if not member:
                                    print("Could not find member with ID:", memberId)
                                    continue

                                print("Member to bill:", member[1], member[2], "(" + member[11] + ")")
                                billDescription = input("Enter the bill's service description: ")
                                billAmount = round(float(input("Enter the bill's amount: $")), 2)

                                if billAmount < 0:
                                    print("Bill amount should be more than $0")
                                    continue

                                res = app.addBill(billAmount, billDescription, user.adminId, memberId)
                                if res:
                                    print(f"Successfully billed {member[1]} {member[2]} for ${billAmount:.2f}")
                                else:
                                    print("Could not bill the member.")

                            case _:
                                choice = -1
                                continue
                    case _:
                        continue


if __name__ == "__main__":
    main()
