# Gym Simulator CLI
### Authors:
Jowi Aoun, Ashwin Srirankan, Ishar Ghura

### Database design
The comprehensive database design model & diagrams can be found [here](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=COMP3005%20Final%20Project.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1G8cP0KFTZ3onGO9z26zLNH8NQYQ_nawp%26export%3Ddownload)

### Description
This is a gym application, where users are able to authenticate under one of the following roles: 

**Members** are able to sign up for available sessions, 
edit various aspects of their account, and give
themselves fitness goals and pay for any bills that
come with using different services of the Health Club

**Trainers** will have the ability to indicate and adjust their availabilities
in order to be assigned to certain sessions at the Health Club. 
Additionally, the trainers can search members by name and view their profile(s).

**Administrators** have the ability to manage the room bookings for a given session as well as 
indicate the availability of equipment in the different rooms of the health club. Additionally, 
they also are responsible for assigning trainers to different sessions based on their availabilities. 
Administrators also are required to process to payments made by members for using the health club's different
services.

### Install & Run
1. Execute `cd cli`
2. Execute `pip install -r requirements.txt`
3. In a PostgreSQL server (using pgAdmin4), create a database called "finalproject"
4. In `app.py`, edit POSTGRES_PASS to the password of the database
5. Run the command `python ./main.py`
