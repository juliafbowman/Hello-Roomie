from roommatesDB import * 
from roommatesAPI import *
import json

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




def printDB():
    '''Function to print the whole database'''
    db = DatabaseManager()
    results = db.fetch_query(query="SELECT * FROM posts")
    for row in results:
        print(row)
    db.close()
    
def convertDBtoDict():
    '''Function to test conversion of database into a dictionary and then into a jsonified dictionary'''
    profiles = json.dumps(getAllProfiles())
    print(profiles)


test_profiles_extra = [
    ["Tony", "Stark", 45, 1, 1, 1, "United States of America", "English", "Italian", 'M', "ironman@starkindustries.com", None, "9999999999", "Genius, billionaire, playboy, philanthropist."],
    ["Steve", "Rogers", 106, 0, 0, 0, "United States of America", "English", None, 'M', "captainamerica@avengers.com", None, None, "Old-fashioned but pays rent on time."],
    ["Bruce", "Banner", 39, 0, 0, 0, "United States of America", "English", "Latin", 'M', "hulk@greenmail.com", "instagram.com/hulk", "4545454545", "Will not smash as long as chores are done."],
    ["Stephen", "Strange", 42, 0, 1, 0, "Nepal", "English", "Tibetan", 'M', "sorcerer@kamar-taj.org", None, "7777777777", "I keep portals and mess to a minimum."],
    ["T'Challa", "Udaku", 35, 0, 0, 0, "Wakanda", "Xhosa", "English", 'M', "blackpanther@wakanda.gov", None, "1212121212", "Wakanda forever. Rent always on time."],
    ["Carol", "Danvers", 34, 0, 1, 0, "United States of America", "English", "Kree", 'F', "captainmarvel@avengers.com", "instagram.com/danvers", None, "Travels a lot. Needs someone grounded."],
    ["Gamora", "Zen", 29, 0, 0, 1, "Zen-Whoberi", "Zenian", "English", 'F', "gamora@guardians.com", None, None, "Green is the new clean."],
    ["Nebula", "Luphomoid", 31, 0, 0, 0, "Luphomoid", "Luph", None, 'F', "nebula@guardians.com", None, None, "Prefers minimal interaction. Quiet."],
    ["Scott", "Lang", 38, 0, 1, 0, "United States of America", "English", None, 'M', "antman@quantum.com", "instagram.com/antman", "4561237890", "Great with kids. Shrinks clutter."],
    ["Hope", "van Dyne", 35, 0, 1, 0, "United States of America", "English", "French", 'F', "wasp@quantum.com", "instagram.com/wasp", "3214569870", "Clean, professional, and organized."],
    ["Sam", "Wilson", 34, 0, 0, 0, "United States of America", "English", "Spanish", 'M', "falcon@shield.com", None, None, "Great with teamwork. Brings good vibes."],
    ["Bucky", "Barnes", 107, 0, 0, 0, "United States of America", "English", "Russian", 'M', "winter@hydra.org", "instagram.com/winter", None, "Reformed assassin. Keeps to himself."],
    ["Loki", "Odinson", 1050, 0, 1, 0, "Asgard", "Old Norse", "English", 'M', "loki@asgard.com", "instagram.com/loki", "0000000001", "Charming, magical, and a little chaotic."],
    ["Thor", "Odinson", 1500, 0, 1, 1, "Asgard", "Old Norse", "English", 'M', "thor@asgard.com", "instagram.com/thor", "0000000002", "God of Thunder. Cleans with lightning speed."],
    ["Shuri", "Udaku", 20, 0, 1, 0, "Wakanda", "Xhosa", "English", 'F', "shuri@wakanda.com", "instagram.com/shuri", "3030303030", "Tech genius, quiet and focused."],
    ["Nick", "Fury", 55, 0, 0, 1, "United States of America", "English", None, 'M', "nfury@shield.gov", None, None, "You won't even know I'm there."],
    ["Peggy", "Carter", 100, 0, 0, 0, "United Kingdom", "English", "French", 'F', "agentcarter@shield.com", None, None, "Witty and punctual. Loves tea."],
    ["Wade", "Wilson", 35, 1, 1, 0, "Canada", "English", "Spanish", 'M', "deadpool@merc.com", "instagram.com/deadpool", "6666666666", "May talk a lot. Pays rent with jokes."],
    ["Jean", "Grey", 29, 0, 0, 1, "United States of America", "English", "French", 'F', "phoenix@xmen.com", "instagram.com/jeangrey", "1112223333", "Emotionally intense, but kind roommate."],
    ["Logan", "Howlett", 137, 0, 0, 0, "Canada", "English", "Japanese", 'M', "wolverine@xmen.com", None, "2323232323", "I like silence. And beer."]
]


def testInsertProfiles(): 
    for profile in test_profiles_extra:
        profile_dict = {
            "first_name": profile[0],
            "last_name": profile[1],
            "age": profile[2],
            "smoking": profile[3],
            "drinking_socially": profile[4],
            "subleasing": profile[5],
            "country": profile[6],
            "language": profile[7],
            "language_2": profile[8],
            "sex": profile[9],
            "email": profile[10],
            "social_link": profile[11],
            "phone_number": profile[12],
            "description": profile[13]
        }
        result = insertProfile(profile_dict)
        print(result)

def deleteLastElement():
    db = DatabaseManager()
    db.execute_query("DELETE from posts where id=?", params=(33,))
    db.close()
if __name__ == '__main__':
    deleteLastElement()