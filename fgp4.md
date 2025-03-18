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

### Ethical Issues:
**Should we allow listings including race or ethnicity?**
<br>
An ethical dilemma we’ve encountered is whether users should have the option to filter or list race and ethnicity as part of their roommate preferences. In our personal lives, we have had friends and acquaintances express that they feel more comfortable living in an environment where they share cultural similarities with their roommates. This is something that we believe is more common than we would personally expect it to be, and many people believe that familiarity with certain cultural norms, traditions, and lifestyles can contribute to a more comfortable living situation. 
<br>
However, allowing users to filter based on race or ethnicity raises concerns about inclusivity and fairness. Implementing such filters could unintentionally create exclusionary practices, limiting housing options for all users and reinforcing divisions. Additionally, from a legal and ethical standpoint, this approach could conflict with anti-discrimination policies that many institutions and housing platforms may uphold. 
<br>

**Should religious preferences be included as a filter?**
<br>
Another question we’ve considered is whether users should be able to filter roommates based on religious beliefs. Religion plays a major role in many people’s daily lives, influencing social norms and lifestyle choices (such as diet or prayer practices). Some individuals may prefer to live with roommates who share similar religious values. 
<br>
While religious preferences are personal, allowing filters based solely on religion raises similar concerns that the race and ethnicity filters did. It could lead to exclusionary practices and unintentionally discourage diversity in shared living spaces. However, we also recognize that for some, religious observances may require specific accommodations. These could include quiet space for prayer, dietary restrictions, or the observance of specific customs. 
<br>

**Our Solution**
<br>
Rather than allowing users to filter by race or ethnicity, we believe a more inclusive approach is to provide an option for users to specify language preferences or requirements. This serves the practical purpose of ensuring effective communication in shared living spaces while also allowing individuals to find roommates that they may share cultural or linguistic backgrounds with. 
<br>
By focusing on language rather than race or ethnicity, we aim to strike a balance between personal comfort and inclusivity. This approach supports connections between roommates while ensuring that our platform remains both welcoming and fair to all users. 
Overall, we want to make sure that there are options for lifestyle preferences for users, such as: 
<br>
**Language Preferences**
<br>
Ensure effective communication in shared living spaces.
<br> 
**Dietary Restrictions**
<br>
Allows users to indicate if they follow specific dietary laws. This could include things like halal, kosher, vegetarian, and vegan. 
<br>
**Religious Observances**
<br>
Provide an option for users to mention if they require a quiet space for prayer, observe a certain holiday, or have other religious practices that could impact shared space. 
<br>
By focusing on practical accommodations, we aim to create a platform that respects individual needs while fostering inclusivity and fairness. 

### Timeline: 

Please refer to this link [Prospective Timeline (Google Drive)](https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing) or the document labeled Timeline.png to see the timeline for this project


# Frontend : TODO
We used Figma to create our front-end layout. We wanted to lay out our design choices before beginning work on our code. 

The use of Figma helped us put our ideas together regarding general layout, font sizing and style, and color palette. 

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

### Trie Search :
So let's do a little bit of a deeper dive into the Trie Search. First lets visualize our Trie -> 
Lets say you want to find all users who drink but don't smoke and have rent range higher than 800, below is 

```
Root
 ├── Drinking: 1 → [User A, User B, User C, User D]
      ├── Smoking: 0 → [User A, User B, User C]
          ├── Rent: >800 → [User A, User B]
```

As you can see the Rent node is where all the users are which drink, dont smoke and also have rent >800!   

Why trie? -> We thought about using HashMap but hashmap makes filtering really hard and long since we have to search each key however it does have fast lookup! Hence we settled on trie, one problem with trie would be loading in a lot of data but that can be solved by adding SQL filtered queries! Hence, trie felt like the most optimal for us in this problem since it allows for fast lookups and also will help with filtering & priority queue generation in our second feature

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



### Priority Queue : 
This data structure will be used to find the best matches for a user. Lets understand a bit more so let's say the user preferences are as above they want someone who drinks, but doesnt smoke and their rent is above 800 we need to find best matches so we will generate our trie as we did above and then based on that tree we are going to assign scoring and priority and return the best matches that user can look through. I think this visual helps the best

```
Root
 ├── Drinking: 1 → [User A, User B, User C, User D]    -> Users here will have score of 1
      ├── Smoking: 0 → [User A, User B, User C]         -> Users here will have score of 2 
           ├── Rent: >800 → [User A, User B]            -> Users here will have score of 3
```

Based on the above information we create a priority queue using heapq (min-heap) which has a list of users that going from highest score (best match) to lowest score (worst match)

Why priority Queue? - We thought about using linkedin list but its slower since priority queue is O(nlogn) and linked list is O(n). Hence,we think priority queue is the best option since it will be fast, structured and there is already a library to implement it saving us time as well!


Complexity based on my calculations - 

Insert 
Time -> O(klogk)
Space -> O(k)

Search 
Time -> O(plogp)
Space -> O(k)

k= size of the heap 
p= matches


# Dividing the work : 
Please refer to the timeline document to see the work divided in more specific manner! The way we divide work is basically what we said in FGP3, so far everyone is okay with their work and we plan on addressing any problems related to timeline, work distribution, etc as a group through voting and proper reasoning!
- Jash : Backend + Database Design
- Jason : Combining Backend with Frontend + Project Manager
- Julia : UI Design + Combining Backend with Frontend

# Links 
- [Rough Sketch (Google Drive)](https://drive.google.com/file/d/1My_7lp2iwR_VSw3lfs7sH44eKiqmCfHs/view?usp=drive_link)
- [Prospective Timeline (Google Drive)](https://docs.google.com/spreadsheets/d/1QTe-mFRo7sTU4L_SmyDVEYZrcw_PVkqmXeAp4OfxzzY/edit?usp=sharing)
- [Database Schema(Google Drive)](https://docs.google.com/document/d/1toPXoWXzk6dNUHmIP1TO_cQGtIG-yduFB97hK3J5E0c/edit?usp=sharing)