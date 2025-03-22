from roommatesDB import * 

#test profiles to insert into the database
# firstname, last name, age, smoking, drinking socially, subleasing, country, language1, language 2, sex, email, social, phone number, description
test_profiles = [
    ["John", "Cena", 40, 0, 1, 0, "United States of America", "English", "Mandarin", 'M', "jcena@gmail.com", "instagram.com/johncena", "6405905903", "Looking for roommates who don’t call me invisible"],
    ["Michael", "Myers", 80, 0, 0, 0, "United States of America", "English", None, 'M', "mMyers@gmail.com", "instagram.com/mikaelmyer", "911", "Favorite festival is Halloween"],
    ["Cristiano", "Ronaldo", 36, 0, 0, 0, "Portugal", "Portuguese", None, 'M', "cRonaldo@gmail.com", "instagram.com/thebest", "007", "SUIIIII"],
    ["Diana", "Prince", 1000, 0, 0, 1, "Themyscira", "Greek", "English", 'F', "wonderwoman@gmail.com", "instagram.com/wonderwoman", "1000", "Warrior princess seeking peace and quiet."],
    ["Natasha", "Romanoff", 35, 0, 1, 0, "Russia", "Russian", "English", 'F', "blackwidow@gmail.com", "instagram.com/blackwidow", "2345678901", "Spy by day, roommate by night."],
    ["Wanda", "Maximoff", 29, 0, 0, 0, "Sokovia", "Sokovian", "English", 'F', "scarletwitch@gmail.com", "instagram.com/scarletwitch", "8888888888", "Looking for a roommate who doesn’t fear a little magic."],
    ["Kamala", "Khan", 18, 0, 0, 0, "United States of America", "English", "Urdu", 'F', "msmarvel@gmail.com", "instagram.com/msmarvel", "1233211234", "Need a roommate who loves Marvel... comics or universe."],
    ["Clark", "Kent", 35, 0, 0, 1, "United States of America", "English", "Kryptonian", 'M', "superman@gmail.com", "instagram.com/superman", "0000000000", "Super clean and respectful roommate (but may fly off occasionally)."],
    ["Bruce", "Wayne", 40, 0, 0, 0, "United States of America", "English", "French", 'M', "batman@gmail.com", "instagram.com/batman", "1010101010", "Quiet. Keeps to himself. Might be out at night."],
    ["Peter", "Parker", 21, 0, 1, 0, "United States of America", "English", "Spanish", 'M', "spiderman@gmail.com", "instagram.com/spidey", "9988776655", "Looking for someone who won’t mind web on the ceiling."]
]

def testinsertDB():
    '''Function to insert data from test profiles into the database
        RUN THIS ONLY ONCE TO MAKE SURE YOUR DATABASE IS POPULATED
    '''
    db = DatabaseManager()

    for profile in test_profiles:
        db.execute_query(query='''
            INSERT INTO posts(first_name, last_name, age, smoking, drinking_socially,
                          subleasing, country, language, language_2, sex, email, social_link, phone_number,
                         description) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            ''',params=(profile[0],profile[1],profile[2],profile[3],profile[4],profile[5],profile[6],profile[7],profile[8],profile[9],
             profile[10],profile[11],profile[12],profile[13]))
        
    db.close()


def printDB():
    '''Function to print the whole database'''
    db = DatabaseManager()
    results = db.fetch_query(query="SELECT * FROM posts")
    for row in results:
        print(row)
    db.close()
    