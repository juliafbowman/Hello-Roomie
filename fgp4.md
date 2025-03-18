# FGP Application Idea and Approach 


### Problem Statement: 
Many incoming students at UIC struggle to find suitable roommates when they are admitted. The most common approach is to join Facebook groups and manually search for potential roommates by posting long descriptions and browsing through other posts. This process is time-consuming, unstructured, and inefficient, often leading to mismatches or delays in finding a compatible roommate.  

### Solution:  
We propose a webApp that makes the roommate-finding process easier by allowing students to post their roommate preferences and find best matches based on the information they probide. Instead of manually searching through posts, users can easily filter and find potential roommates who align with their preferences, such as:  

### User Profiles:
- **Name**
- **Smoking**
- **Drinking**
- **Short Description** (e.g., lifestyle, habits, interests)

### Roommate Preferences & Filters:
- **Country & Language** (Preferred nationality and spoken languages)
- **Sex Preference** (If applicable)
- **Price Range** (Budget for rent)
- **Subleasing** (Is the person posting subleasing?)
- **Time Period** (In months)

### Contact & Social Details:
- **Email** (Required)
- **Phone** (Optional)
- **Social Links** (Optional)


This structured approach improves efficiency, accuracy, and user experience, helping students quickly and effectively find the right roommate.


### Approach: 
Please refer to this link [Rough Sketch (Google Drive)](https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing) or the document labeled RoughSketch.pdf for more in depth details for the rough sketch and layout and features 

- Database: SQLite
- Backend: Python 
- Frontend: React

The idea is to create a user layout where there are two main tabs. First tab represents a filter bar and all the posts present in the database, Second tab can will get user details and then fetch best matches. UI will be made using react which will send API requests to the backend in Python (Flask), which will then query the data from a custom SQLite Database

### Ethical Issues: TODO 



### Timeline: 

Please refer to this link [Prospective Timeline (Google Drive)](https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing) or the document labeled Timeline.png to see the timeline for this project


# Data 

### Data source :  
- Database Query Manager - SQLite with python 
- Database Schema - [Database Schema(Google Drive)](https://docs.google.com/document/d/1toPXoWXzk6dNUHmIP1TO_cQGtIG-yduFB97hK3J5E0c/edit?usp=sharing)

For this project, we are planning to make our own database with each preference being a feature (column) with constraints. Each column is basically a user preference with constraints in SQLite, an example would be each entry will have an Unique ID (Integer), First Name (String), Last Name (String), Drinking (Boolean - 0/1) , Smoking (Boolean - 0/1), Rent (int - 300/6000). To keep track of each feature's constraints please follow the google doc above! 


### Pulling Data into the Backend : 
 The most simple is going to be using SQLite queries and just passing it to the frontend. We will use SQLite queries to get the data and then generate a dictionary as needed from that data in our backend! The backend will send data to the frontend when GET/POST/PUT requests are made! Another idea was to just store the database as a Dictionary and then use that dictionary to manipulate values in our features! 

### Data cleaning and processing :
The most important part here is making sure data is within constraints when inserting to the Database! We are implementing tests on both frontend and backend to make sure the data follows the constraints of the SQLite table and all errors are caught before the data is inserted! Example if user enters a string in price range then the error is caught in frontend and user is prompted to reenter, even if it passes the backend should ensure if the constraints are met before inserting data. This makes our SQL database very clean and processed! 

# Data Structures: 

### Application & Usage of two advanced data structure :
We are using Trie and Priority Queue as our two advanced data structures. The trie is where the backend will store all the data from the user search parameters. Each node in tree will be an attribute and each attribute will have all the user profiles meeting those attributes. Priority Queue is used to find the best matches based on user's preferences. 

1. Trie Search - So let's do a little bit of a deeper dive into the Trie Search. First lets visualize our Trie -> 
Lets say you want to find all users who drink but don't smoke and have rent range higher than 800, below is 

```
Root
 ├── Drinking: 1 → [User A, User B, User C, User D]
      ├── Smoking: 0 → [User A, User B, User C]
          ├── Rent: >800 → [User A, User B]
```

As you can see the Rent node is where all the users are which drink, dont smoke and also have rent >800!   

Why trie? -> We thought about using HashMap but hashmap makes filtering really hard and long since we have to search each key however it does have fast lookup! Hence we settled on trie, one problem with trie would be loading in a lot of data but that can be solved by adding SQL filtered queries! 

Complexity based on my calculations - 

Insert 
Time -> O(nm)
Space -> O(nm)

Search 
Time -> O(m+k)
Space -> O(nm)

n -> total roommates posts
m -> attribute/features
k -> no of matches 



2. Priority Queue - This data structure will be used to find the best matches for a user. Lets understand a bit more so let's say the user preferences are as above they want someone who drinks, but doesnt smoke and their rent is above 800 we need to find best matches so we will generate our trie as we did above and then based on that tree we are going to assign scoring and priority and return the best matches that user can look through. I think this visual helps the best

```
Root
 ├── Drinking: 1 → [User A, User B, User C, User D]    -> Users here will have score of 1
      ├── Smoking: 0 → [User A, User B, User C]         -> Users here will have score of 2 
           ├── Rent: >800 → [User A, User B]            -> Users here will have score of 3
```

Based on the above information we create a priority queue using heapq (min-heap) which has a list of users that going from highest score (best match) to lowest score (worst match)

Why priority Queue? - We thought about using linkedin list but its slower since priority queue is O(nlogn) and linked list is O(n).


Complexity based on my calculations - 

Insert 
Time -> O(klogk)
Space -> O(k)

Search 
Time -> O(plogp)
Space -> O(k)

k= size of the heap 
p= matches



# Links 

- [Rough Sketch (Google Drive)](https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing)
- [Prospective Timeline (Google Drive)](https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing)
- [Database Schema(Google Drive)](https://docs.google.com/document/d/1toPXoWXzk6dNUHmIP1TO_cQGtIG-yduFB97hK3J5E0c/edit?usp=sharing)