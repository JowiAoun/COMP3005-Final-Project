Authors:
Ashwin Srirankan, Ishar Ghura, Jowi Aoun

Install & Run:
1. Execute `cd cli`
2. Execute `pip install -r requirements.txt`
3. In a PostgreSQL server (using pgAdmin4), create a database called "finalproject"
4. In `app.py`, edit POSTGRES_PASS to the password of the database
5. Run the command `python ./main.py`

Description:
Description: 

Within the application, users will be able to log into 
the application under one of the following roles: 

Members
Members are able to sign up for available sessions, 
edit various aspects of their account, and give
themselves fitness goals and pay for any bills that
come with using different services of the Health Club

Trainers
Trainers will have the ability to indicate and adjust their availabilities
in order to be assigned to certain sessions at the Health Club. 
Additionally, the trainers can search members by name and view their profile(s).

Administrators
Administrators have the ability to manage the room bookings for a given session as well as 
indicate the availability of equipment in the different rooms of the health club. Additionally, 
they also are responsible for assigning trainers to different sessions based on their availabilities. 
Administrators also are required to process to payments made by members for using the health club's different
services.
