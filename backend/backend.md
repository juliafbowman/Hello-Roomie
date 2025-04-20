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

