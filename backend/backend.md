# File structure for Backend
- Database Manager (roommatesDB.py) - Contains queries and initiating the database functions 
- Data structure (FilterTree.py) - custom tree (might change to minheap depending upon how hard it is )
- Algorithms and logic function (roommatesAlgo.py) - contains the functions that do the actual filtering 
- Flask (host.py) - where the functions from roommatesAlgo.py are called based on the API call done through GET requests (from frontend)

# API Information 
- 1. getAllProfiles():
    - Input : NULL
    - Output : returns all profiles in the database as a dictionary or JSON (key-value pairs)

- 2. insertProfile():
    - Input : NULL
    - Output : returns error codes or success code, Success code is 400 & Error code is 401,402 (will be defined as we move forward) 

