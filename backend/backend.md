# File structure for Backend
- Database Manager (roommatesDB.py) - Contains queries and initiating the database functions 
- Data structure (FilterTree.py) - custom tree (might change to minheap depending upon how hard it is )
- Algorithms and logic function (roommatesAPI.py) - contains the functions that do the actual filtering 
- Flask (host.py) - where the functions from roommatesAlgo.py are called based on the API call done through GET requests (from frontend)
- Testing (tests.py) - file where i test some basic functionality of all the function calls 

# API Information 
- 1. url/profiles :
    - Method : GET 
    - Input : NULL
    - Output : returns all profiles in the database as a dictionary or JSON (key-value pairs)

