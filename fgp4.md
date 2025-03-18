# FGP Application Idea and Approach 

### Problem Statement:  
Many incoming students at UIC struggle to find suitable roommates when they are admitted. The most common approach is to join Facebook groups and manually search for potential roommates by posting long descriptions and browsing through other posts. This process is time-consuming, unstructured, and inefficient, often leading to mismatches or delays in finding a compatible roommate.  

### Solution:  
We propose a webApp that makes the roommate-finding process easier by allowing students to post their roommate preferences and find best matches based on the information they probide. Instead of manually searching through posts, users can easily filter and find potential roommates who align with their preferences, such as:  

User Profiles:
    Name
    Smoking
    Drinking
    Short Description (e.g., lifestyle, habits, interests)

Roommate Preferences & Filters:
    Country & Language (Preferred nationality and spoken languages)
    Sex  Preference (If applicable)
    Price Range (Budget for rent)
    Subleasing (Is the person posting subleasing? )
    Time period (In months)

Contact & Social Details:
    Email (Required)
    Phone (Optional)
    Social Media Links (Optional)


This structured approach improves efficiency, accuracy, and user experience, helping students quickly and effectively find the right roommate.

Please refer to this link - https://drive.google.com/file/d/1My_7lp2iwR_VSw3lfs7sH44eKiqmCfHs/view?usp=sharing
or the document labeled RoughSketch.pdf for more in depth details for the rough sketch and layout and features 


### Ethical Issues: 







### Timeline: 

Please refer to this link - https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing or the document labeled Timeline.png to see the prospective timeline for this project




# Data 

### Data source :  
Database Query Manager - SQLite with python 
Database Schema - https://docs.google.com/document/d/1toPXoWXzk6dNUHmIP1TO_cQGtIG-yduFB97hK3J5E0c/edit?usp=sharing

For this project, we are planning to make our own database with each preference being a feature (column) with constraints. Each column is basically a user preference with constraints in SQLite, an example would be each entry will have an Unique ID (Integer), First Name (String), Last Name (String), Drinking (Boolean - 0/1) , Smoking (Boolean - 0/1), Rent (int - 300/6000). To keep track of each feature's constraints please follow the google doc above! 


### Pulling Data into the Backend : 
There are two methods here. The most simple is going to be using SQLite queries and just passing it to the frontend. However, the scope of our project requires using two advanced data structures so we will be adding an extra step to the data pulling, we will use SQLite queries to get the data and then generate a Trie from that data in our backend! The backend will send data to the frontend when GET/POST/PUT requests are made! 

### Data cleaning and processing :
The most important part here is making sure data is within constraints when inserting to the Database! We are implementing tests on both frontend and backend to make sure the data follows the constraints of the SQLite table and all errors are caught before the data is inserted! Example if user enters a string in price range then the error is caught in frontend and user is prompted to reenter, even if it passes the backend should ensure if the constraints are met before inserting data. This makes our SQL database very clean and processed! 

