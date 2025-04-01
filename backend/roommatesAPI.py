from roommatesDB import * 

def getAllProfiles():
    db = DatabaseManager()
    allProfiles = db.fetch_query(query="SELECT * FROM posts")
    db.close()
    return [dict(row) for row in allProfiles]


def insertProfile(profile):
    return None