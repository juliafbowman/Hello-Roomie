from flask import Flask, request, jsonify
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
    try:
        # Parse JSON input from frontend
        user_data = request.get_json()

        if not user_data:
            return jsonify({500: "No JSON data provided"}), 400

        result = insertProfile(user_data)

       
        status_code = 500 if 500 in result else 200
        return jsonify(result), status_code

    except Exception as e:
        return jsonify({500: f"Server error: {str(e)}"}), 500

@app.route("/filterProfile", methods =["POST"])
def filter_profiles():
    filters = request.get_json()
    
    if not filters:
        return jsonify({"error" : "No filter parameters provided"}),500
    
    try:
        results = filter_query(filters)
        return jsonify(results), 200
    except Exception as e:
        return jsonify({"error" : str(e)}), 500
        

if __name__ == "__main__":
    app.run(debug=True)