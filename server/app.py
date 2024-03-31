from flask import Flask, request, jsonify
from server.db import conn
app = Flask(__name__)

cursor = conn.cursor()

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
    

if __name__ == "__main__":
    app.run(debug = True)