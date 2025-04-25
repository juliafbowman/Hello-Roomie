from roommatesDB import * 
from roommatesAPI import *
from profileManager import * 
from findBestMatches import *
import json

#test profiles to insert into the database
# all_test_profiles = [
#     ["John", "Cena", 40, 0, 1, 3000, 0, "United States", "English", "Mandarin", 'M', "jcena@gmail.com", "instagram.com/johncena", "6405905903", "Looking for roommates who don’t call me invisible"],
#     ["Michael", "Myers", 80, 0, 0, 1500, 0, "United States", "English", None, 'M', "mMyers@gmail.com", "instagram.com/mikaelmyer", "911", "Favorite festival is Halloween"],
#     ["Cristiano", "Ronaldo", 36, 0, 0, 4000, 0, "Portugal", "Portuguese", None, 'M', "cRonaldo@gmail.com", "instagram.com/thebest", "007", "SUIIIII"],
#     ["Diana", "Prince", 1000, 0, 0, 5000, 1, "Greece", "Greek", "English", 'F', "wonderwoman@gmail.com", "instagram.com/wonderwoman", "1000", "Warrior princess seeking peace and quiet."],
#     ["Natasha", "Romanoff", 35, 0, 1, 2500, 0, "Russia", "Russian", "English", 'F', "blackwidow@gmail.com", "instagram.com/blackwidow", "2345678901", "Spy by day, roommate by night."],
#     ["Wanda", "Maximoff", 29, 0, 0, 2200, 0, "Czech Republic", "Czech", "English", 'F', "scarletwitch@gmail.com", "instagram.com/scarletwitch", "8888888888", "Looking for a roommate who doesn’t fear a little magic."],
#     ["Kamala", "Khan", 18, 0, 0, 1200, 0, "United States", "English", "Urdu", 'F', "msmarvel@gmail.com", "instagram.com/msmarvel", "1233211234", "Need a roommate who loves Marvel... comics or universe."],
#     ["Clark", "Kent", 35, 0, 0, 2800, 1, "United States", "English", "Kryptonian", 'M', "superman@gmail.com", "instagram.com/superman", "0000000000", "Super clean and respectful roommate (but may fly off occasionally)."],
#     ["Bruce", "Wayne", 40, 0, 0, 4500, 0, "United States", "English", "French", 'M', "batman@gmail.com", "instagram.com/batman", "1010101010", "Quiet. Keeps to himself. Might be out at night."],
#     ["Peter", "Parker", 21, 0, 1, 1300, 0, "United States", "English", "Spanish", 'M', "spiderman@gmail.com", "instagram.com/spidey", "9988776655", "Looking for someone who won’t mind web on the ceiling."],
#     ["Tony", "Stark", 45, 1, 1, 5000, 1, "United States", "English", "Italian", 'M', "ironman@starkindustries.com", None, "9999999999", "Genius, billionaire, playboy, philanthropist."],
#     ["Steve", "Rogers", 106, 0, 0, 1500, 0, "United States", "English", None, 'M', "captainamerica@avengers.com", None, None, "Old-fashioned but pays rent on time."],
#     ["Bruce", "Banner", 39, 0, 0, 2000, 0, "United States", "English", "Latin", 'M', "hulk@greenmail.com", "instagram.com/hulk", "4545454545", "Will not smash as long as chores are done."],
#     ["Stephen", "Strange", 42, 0, 1, 2700, 0, "Nepal", "English", "Tibetan", 'M', "sorcerer@kamar-taj.org", None, "7777777777", "I keep portals and mess to a minimum."],
#     ["T'Challa", "Udaku", 35, 0, 0, 3200, 0, "South Africa", "Xhosa", "English", 'M', "blackpanther@wakanda.gov", None, "1212121212", "Wakanda forever. Rent always on time."],
#     ["Carol", "Danvers", 34, 0, 1, 2800, 0, "United States", "English", "Kree", 'F', "captainmarvel@avengers.com", "instagram.com/danvers", None, "Travels a lot. Needs someone grounded."],
#     ["Gamora", "Zen", 29, 0, 0, 2300, 1, "Colombia", "Spanish", "English", 'F', "gamora@guardians.com", None, None, "Green is the new clean."],
#     ["Nebula", "Luphomoid", 31, 0, 0, 1800, 0, "Romania", "Romanian", None, 'F', "nebula@guardians.com", None, None, "Prefers minimal interaction. Quiet."],
#     ["Scott", "Lang", 38, 0, 1, 2100, 0, "United States", "English", None, 'M', "antman@quantum.com", "instagram.com/antman", "4561237890", "Great with kids. Shrinks clutter."],
#     ["Hope", "van Dyne", 35, 0, 1, 2700, 0, "United States", "English", "French", 'F', "wasp@quantum.com", "instagram.com/wasp", "3214569870", "Clean, professional, and organized."],
#     ["Sam", "Wilson", 34, 0, 0, 1900, 0, "United States", "English", "Spanish", 'M', "falcon@shield.com", None, None, "Great with teamwork. Brings good vibes."],
#     ["Bucky", "Barnes", 107, 0, 0, 1700, 0, "United States", "English", "Russian", 'M', "winter@hydra.org", "instagram.com/winter", None, "Reformed assassin. Keeps to himself."],
#     ["Loki", "Odinson", 1050, 0, 1, 2900, 0, "Norway", "Norwegian", "English", 'M', "loki@asgard.com", "instagram.com/loki", "0000000001", "Charming, magical, and a little chaotic."],
#     ["Thor", "Odinson", 1500, 0, 1, 3500, 1, "Norway", "Old Norse", "English", 'M', "thor@asgard.com", "instagram.com/thor", "0000000002", "God of Thunder. Cleans with lightning speed."],
#     ["Shuri", "Udaku", 20, 0, 1, 2000, 0, "South Africa", "Xhosa", "English", 'F', "shuri@wakanda.com", "instagram.com/shuri", "3030303030", "Tech genius, quiet and focused."],
#     ["Nick", "Fury", 55, 0, 0, 3100, 1, "United States", "English", None, 'M', "nfury@shield.gov", None, None, "You won't even know I'm there."],
#     ["Peggy", "Carter", 100, 0, 0, 1600, 0, "United Kingdom", "English", "French", 'F', "agentcarter@shield.com", None, None, "Witty and punctual. Loves tea."],
#     ["Wade", "Wilson", 35, 1, 1, 1800, 0, "Canada", "English", "Spanish", 'M', "deadpool@merc.com", "instagram.com/deadpool", "6666666666", "May talk a lot. Pays rent with jokes."],
#     ["Jean", "Grey", 29, 0, 0, 2500, 1, "United States", "English", "French", 'F', "phoenix@xmen.com", "instagram.com/jeangrey", "1112223333", "Emotionally intense, but kind roommate."],
#     ["Logan", "Howlett", 137, 0, 0, 2200, 0, "Canada", "English", "Japanese", 'M', "wolverine@xmen.com", None, "2323232323", "I like silence. And beer."]
# ]

# firstname, last name, age, smoking, drinking socially, max_rent, subleasing, country, neighborhood, language1, language 2, sex, email, social, phone number, description
all_test_profiles = [
    ["Mwikali", "Otieno", 29, 0, 0, 1452, 1, "Kenya", "Wicker Park", "Swahili", "English", 'F', "mwikali.otieno@email.com", "instagram.com/mwikaliotieno", "5317883173", "I work a lot so you'll barely see me."],
    ["Brian", "Mutua", 32, 0, 0, 1792, 0, "Kenya", "Logan Square", "Swahili", "English", 'M', "brian.mutua@email.com", "instagram.com/brianmutua", "7048823304", "Wanna split Netflix?"],
    ["Ashley", "Miller", 25, 1, 0, 1643, 1, "United States", "Bridgeport", "English", None, 'F', "ashley.miller@email.com", "instagram.com/ashleymiller", "5587341203", "Pretty chill, just don’t leave dishes in the sink."],
    ["Rohan", "Patel", 24, 0, 0, 1499, 0, "India", "Logan Square", "Hindi", "English", 'M', "rohan.patel@email.com", "instagram.com/rohanpatel", "7226848579", "Clean-ish and friendly. Open to splitting groceries."],
    ["Charlotte", "Davies", 23, 0, 0, 1195, 1, "United Kingdom", "Logan Square", "English", None, 'F', "charlotte.davies@email.com", "instagram.com/charlottedavies", "6695421539", "Early riser, into yoga and iced coffee."],
    ["Luis", "Martinez", 28, 1, 0, 1550, 1, "Mexico", "Bridgeport", "Spanish", "English", 'M', "luis.martinez@email.com", "instagram.com/luismartinez", "3892846631", "Wanna split Netflix?"],
    ["Camille", "Moreau", 31, 0, 0, 1515, 0, "France", "Evanston", "French", "English", 'F', "camille.moreau@email.com", "instagram.com/camillemoreau", "9112180133", "Pretty chill, just don’t leave dishes in the sink."],
    ["Bo", "Li", 34, 0, 1, 1086, 1, "China", "Hyde Park", "Mandarin", "English", 'M', "bo.li@email.com", "instagram.com/boli", "7925566347", "Love to cook, just need someone chill."],
    ["Anjali", "Verma", 22, 0, 1, 1003, 0, "India", "Wicker Park", "Hindi", "English", 'F', "anjali.verma@email.com", "instagram.com/anjaliverma", "3425383759", "Clean-ish and friendly. Open to splitting groceries."],
    ["Minho", "Choi", 32, 1, 1, 1454, 1, "South Korea", "Bridgeport", "Korean", "English", 'M', "minho.choi@email.com", "instagram.com/minhochoi", "7992893580", "Pretty chill, just don’t leave dishes in the sink."],
    ["Grace", "Wilson", 35, 0, 0, 1250, 0, "Canada", "Oak Park", "English", None, 'F', "grace.wilson@email.com", "instagram.com/gracewilson", "4576109483", "Love to cook, just need someone chill."],
    ["Lucas", "Bernard", 23, 0, 0, 1708, 1, "France", "Logan Square", "French", "English", 'M', "lucas.bernard@email.com", "instagram.com/lucasbernard", "7321348785", "Not a party person, but cool with small hangouts."],
    ["Usman", "Iqbal", 27, 0, 1, 1516, 0, "Pakistan", "Wicker Park", "Urdu", "English", 'M', "usman.iqbal@email.com", "instagram.com/usmaniqbal", "4734658711", "Wanna split Netflix?"],
    ["Emily", "Clark", 25, 0, 1, 1676, 0, "United Kingdom", "Bridgeport", "English", None, 'F', "emily.clark@email.com", "instagram.com/emilyclark", "7641658277", "Early riser, into yoga and iced coffee."],
    ["Wei", "Zhang", 29, 1, 0, 1063, 0, "China", "Hyde Park", "Mandarin", "English", 'M', "wei.zhang@email.com", "instagram.com/weizhang", "9136483342", "Clean-ish and friendly. Open to splitting groceries."],
    ["Charlotte", "Davies", 33, 0, 1, 1712, 0, "United Kingdom", "Hyde Park", "English", None, 'F', "charlotte.davies@email.com", "instagram.com/charlottedavies", "6137864520", "Not a party person, but cool with small hangouts."],
    ["Julien", "Leroy", 31, 1, 1, 1583, 0, "France", "Logan Square", "French", "English", 'M', "julien.leroy@email.com", "instagram.com/julienleroy", "8149375830", "Pretty chill, just don’t leave dishes in the sink."],
    ["Valeria", "Gonzalez", 27, 1, 1, 1320, 1, "Mexico", "Hyde Park", "Spanish", "English", 'F', "valeria.gonzalez@email.com", "instagram.com/valeriagonzalez", "4562937242", "Let's keep the bathroom clean and we’re good."],
    ["Fatima", "Ahmed", 35, 0, 1, 1788, 1, "Pakistan", "Logan Square", "Urdu", "English", 'F', "fatima.ahmed@email.com", "instagram.com/fatimaahmed", "6037591283", "Pretty chill, just don’t leave dishes in the sink."],
    ["Oliver", "Smith", 22, 0, 1, 1683, 1, "United Kingdom", "Oak Park", "English", None, 'M', "oliver.smith@email.com", "instagram.com/oliversmith", "9987321453", "I work a lot so you'll barely see me."],
    ["Jason", "Carmona", 21, 0, 0, 1700, 0, "United States", "Naperville", "English", None, 'M', "jason2@email.com", None, None, "I love doing art! My favorite festival is halloween and yes i get nightmare before christmas"],
    ["Julia", "Bowman", 21, 0, 0, 1700, 0, "United States", "Naperville", "English", None, 'F', "juliB@email.com", None, None, "halloween , doomscroll , instagram , repeat"],
    ["Jash", "Shah", 21, 0, 0, 1700, 0, "United States", "Naperville", "English", None, 'M', "jashs28@email.com", None, None, "i love playing valorant and watching horror movies especially near halloween"]
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


def testInsertProfiles(): 
    for profile in all_test_profiles:
        profile_dict = {
            "first_name": profile[0],
            "last_name": profile[1],
            "age": profile[2],
            "smoking": profile[3],
            "drinking_socially": profile[4],
            "max_rent": profile[5],
            "subleasing": profile[6],
            "country": profile[7],
            "neighborhood": profile[8],
            "language": profile[9],
            "language_2": profile[10],
            "sex": profile[11],
            "email": profile[12],
            "social_link": profile[13],
            "phone_number": profile[14],
            "description": profile[15]
        }

        result = insertProfile(profile_dict)
        print(result)

def testProfielManager():
    manager = ProfileManager()
    print(manager.get_all_profiles())
    
def testFilterQuery():
    """
    Test the filter_query function with example filters
    """
    
    examples = [
        {'age' : [[">=" , 25],["<=", 40]], 'neighborhood' : 'Wicker Park'}
          ]
    for filters in examples:
        print(f"\n>>>Filters: {filters}")
        try:
            results = filter_query(filters)
            
        except Exception as e:
            print("Error running filter_query:", e)
            continue
        
        if not results:
            print("no matching profiles.")
        for r in results:
            print(print(json.dumps(filter_query(filters), indent=2))
)

def clearPosts():
    db = DatabaseManager()
    db.execute_query("DELETE FROM posts")
    db.close()

def deleteElement(id):
    db = DatabaseManager()
    db.execute_query("DELETE from posts where id=?", params=(id,))
    db.close()

if __name__ == '__main__':
    #testInsertProfiles()
    testFilterQuery()
    # preferences = {
    # "age": 22,
    # "smoking": 0,
    # "drinking_socially": 1,
    # "subleasing": 1,
    # "country": "USA",
    # "language": "English",
    # "language_2": None,
    # "sex": "M",
    # "max_rent": 900,
    # "description_tags": ["clean", "quiet", "friendly"]
    # }

    # top_profiles = get_best_matches(preferences, limit=3)
    # print(top_profiles)
    
    # clearPosts()
    
    # testInsertProfiles()
    # print("\n=== All profiles in DB ===")
    # printDB()
     
    # print("\n=== Convert DB to JSON ===")
    # convertDBtoDict()
     
    # print("\n=== Running FilterQuery Tests ===")
    # testFilterQuery()