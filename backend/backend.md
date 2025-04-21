# File structure for Backend
- Database Manager (roommatesDB.py) - Contains queries and initiating the database functions 
- Data structure (FilterTree.py) - custom tree (might change to minheap depending upon how hard it is )
- Algorithms and logic function (roommatesAPI.py) - contains the functions that do the actual filtering 
- Flask (host.py) - where the functions from roommatesAlgo.py are called based on the API call done through GET requests (from frontend)
- Testing (tests.py) - file where i test some basic functionality of all the function calls 
- Data structures 1 (profileManager.py) - file structure where first the whole database is stored and the description is a trie for each profile
- Data structure 2 (findBestMatches.py) - file where priority queue is used to get the best match profiled

pip install -r requirements.txt

# API Information 
- 1. url/profiles :
    - Method : GET 
    - Input : NULL
    - Output : returns all profiles in the database as a dictionary or JSON (key-value pairs)
    Error Code -> 200 : Successful,
                  500 : Unsuccessful with exception E returned in a JSON Dictionary.
                

- 2. url/insertProfile : 
    - Method : POST
    - Input : Dictionary -> contains the post information 
    - {"first_name": "string (required, no enforced max length in DB, but recommended < 50) - e.g., 'Spiderman'",
    - "last_name": "string (required, no enforced max length in DB, but recommended < 50) - e.g., 'Parker'",
    - "age": "integer (required) - e.g., 21",
    - "smoking": "integer (required, must be 0 or 1) - e.g., 0",
    - "drinking_socially": "integer (required, must be 0 or 1) - e.g., 1",
    - "max_rent" : "integer (required, must be between 300 and 10000) - e.g. 500 ", 
    - "subleasing": "integer (required, must be 0 or 1) - e.g., 0",
    - "country": "string (required, max 99 characters) - e.g., 'United States of America'",
    - "language": "string (required, max 49 characters) - e.g., 'English'",
    - "language_2": "string or null (optional, max 49 characters) - e.g., 'Spanish' or null",
    - "sex": "string (required, 1 character: 'M' or 'F') - e.g., 'M'",
    - "email": "string (required, max 199 characters) - e.g., 'spiderman@gmail.com'",
    - "social_link": "string or null (optional, max 299 characters) - e.g., 'https://instagram.com/spidey'",
    - "phone_number": "string or null (optional, max 49 characters) - e.g., '1234567890'",
    - "description": "string or null (optional, max 299 characters) - e.g., 'Looking for a clean and quiet space to swing by.'"
    - }

    - Output : In Progress
    Error Code -> 200 : Successful, 
                  500 : Unsuccessful with exception E returned in a JSON Dictionary, 
                  400 : Bad request, invalid data -> returned as JSON, format is not right, a non nullable value is given a null value, etc.

- 3. url/matchProfiles : 
    - Method : POST
    - Input : Dictionary -> contains the user's roommate matching preferences
    - {
        "age": "integer (required) - e.g., 22",
        "smoking": "integer (required, must be 0 or 1) - e.g., 0",
        "drinking_socially": "integer (required, must be 0 or 1) - e.g., 1",
        "subleasing": "integer (required, must be 0 or 1) - e.g., 1",
        "country": "string (required, max 99 characters) - e.g., 'India'",
        "language": "string (required, max 49 characters) - e.g., 'Hindi'",
        "language_2": "string or null (optional, max 49 characters) - e.g., 'English' or null",
        "sex": "string (required, 1 character: 'M' or 'F') - e.g., 'F'",
        "max_rent": "integer (required, must be between 300 and 10000) - e.g., 1200",
        "description_tags": "list of strings (required) - e.g., ['quiet', 'clean', 'organized']"
      }

    - Output : {
        "matches": [
            {
                "id": 7,
                "first_name": "Kamala",
                "last_name": "Khan",
                "age": 18,
                "smoking": 0,
                "drinking_socially": 0,
                "max_rent": 1200,
                "subleasing": 0,
                "country": "United States",
                "language": "English",
                "language_2": "Urdu",
                "sex": "F",
                "email": "msmarvel@gmail.com",
                "social_link": "instagram.com/msmarvel",
                "phone_number": "1233211234",
                "description": "Need a roommate who loves Marvel... comics or universe."
            },
            ...
        ]
      }

    Error Code -> 200 : Successful, 
                  500 : Matching error or invalid user input returned as {500: "error message"}, 
                  400 : Bad request, empty or malformed input

- 4. url/filterProfiles :
    - Method : POST
    - Input: JSON object contianing one or more filter criteria. Each key must be one of the profile columns, and each value can be like this:
        1. equality (string or int)
        {"country": "United States"}

        2. Single Comparison as a two-element list [operator, value]
        { "age": [">", 25] }

        3. Range / multi-check as a list of comparisons
        {
            'age' : [['>' , 25] , ['<',50]],
            "max_rent" : [["<=", 3000], [">=", 1000]]
        }

        example input :
        {'age' : [('>' , 25) , ('<',50)] , 'country' : 'United States'}

        example output :
            {'id': 421, 'first_name': 'John', 'last_name': 'Cena', 'age': 40, 'smoking': 0, 'drinking_socially': 1, 'max_rent': 3000, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': 'Mandarin', 'sex': 'M', 'email': 'jcena@gmail.com', 'social_link': 'instagram.com/johncena', 'phone_number': '6405905903', 'description': 'Looking for roommates who don’t call me invisible'}
            {'id': 428, 'first_name': 'Clark', 'last_name': 'Kent', 'age': 35, 'smoking': 0, 'drinking_socially': 0, 'max_rent': 2800, 'subleasing': 1, 'country': 'United States', 'language': 'English', 'language_2': 'Kryptonian', 'sex': 'M', 'email': 'superman@gmail.com', 'social_link': 'instagram.com/superman', 'phone_number': '0000000000', 'description': 'Super clean and respectful roommate (but may fly off occasionally).'}
            {'id': 429, 'first_name': 'Bruce', 'last_name': 'Wayne', 'age': 40, 'smoking': 0, 'drinking_socially': 0, 'max_rent': 4500, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': 'French', 'sex': 'M', 'email': 'batman@gmail.com', 'social_link': 'instagram.com/batman', 'phone_number': '1010101010', 'description': 'Quiet. Keeps to himself. Might be out at night.'}
            {'id': 431, 'first_name': 'Tony', 'last_name': 'Stark', 'age': 45, 'smoking': 1, 'drinking_socially': 1, 'max_rent': 5000, 'subleasing': 1, 'country': 'United States', 'language': 'English', 'language_2': 'Italian', 'sex': 'M', 'email': 'ironman@starkindustries.com', 'social_link': None, 'phone_number': '9999999999', 'description': 'Genius, billionaire, playboy, philanthropist.'}
            {'id': 433, 'first_name': 'Bruce', 'last_name': 'Banner', 'age': 39, 'smoking': 0, 'drinking_socially': 0, 'max_rent': 2000, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': 'Latin', 'sex': 'M', 'email': 'hulk@greenmail.com', 'social_link': 'instagram.com/hulk', 'phone_number': '4545454545', 'description': 'Will not smash as long as chores are done.'}
            {'id': 436, 'first_name': 'Carol', 'last_name': 'Danvers', 'age': 34, 'smoking': 0, 'drinking_socially': 1, 'max_rent': 2800, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': 'Kree', 'sex': 'F', 'email': 'captainmarvel@avengers.com', 'social_link': 'instagram.com/danvers', 'phone_number': None, 'description': 'Travels a lot. Needs someone grounded.'}
            {'id': 439, 'first_name': 'Scott', 'last_name': 'Lang', 'age': 38, 'smoking': 0, 'drinking_socially': 1, 'max_rent': 2100, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': None, 'sex': 'M', 'email': 'antman@quantum.com', 'social_link': 'instagram.com/antman', 'phone_number': '4561237890', 'description': 'Great with kids. Shrinks clutter.'}
            {'id': 440, 'first_name': 'Hope', 'last_name': 'van Dyne', 'age': 35, 'smoking': 0, 'drinking_socially': 1, 'max_rent': 2700, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': 'French', 'sex': 'F', 'email': 'wasp@quantum.com', 'social_link': 'instagram.com/wasp', 'phone_number': '3214569870', 'description': 'Clean, professional, and organized.'}
            {'id': 441, 'first_name': 'Sam', 'last_name': 'Wilson', 'age': 34, 'smoking': 0, 'drinking_socially': 0, 'max_rent': 1900, 'subleasing': 0, 'country': 'United States', 'language': 'English', 'language_2': 'Spanish', 'sex': 'M', 'email': 'falcon@shield.com', 'social_link': None, 'phone_number': None, 'description': 'Great with teamwork. Brings good vibes.'}
            {'id': 449, 'first_name': 'Jean', 'last_name': 'Grey', 'age': 29, 'smoking': 0, 'drinking_socially': 0, 'max_rent': 2500, 'subleasing': 1, 'country': 'United States', 'language': 'English', 'language_2': 'French', 'sex': 'F', 'email': 'phoenix@xmen.com', 'social_link': 'instagram.com/jeangrey', 'phone_number': '1112223333', 'description': 'Emotionally intense, but kind roommate.'}
            
    - Output: -> 200 : OK with a JSON array of profile objects matching all filters
                 500 : Unexpected backend failure. Responds with ""error" <message>"
