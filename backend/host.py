from flask import Flask, jsonify
from roommatesAPI import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/profiles",methods = ["GET"])
def get_all_profiles():
    '''
    Output -> Dictionary with all the roommate posts
    Error Code -> 200 : Successful 
                  500 : Unsuccessful 
    '''
    try:
        profiles = getAllProfiles()
        print("Request all profiles")
        return jsonify(profiles),200 
    except Exception as e:
        return jsonify({"error": str(e)}),500
    

@app.route("/insertProfile", methods = ["POST"])
def insert_profile(): 
    return None


if __name__ == "__main__":
    app.run(debug=True)