# HelloRoomie - A Roommate Finder Application For UIC


## About
HelloRoomie is a roommate finder app that is designed for UIC students that helps you find compatible roommates through:
- **Best Matches algorithm** - Suggests ideal matches by analyzing post descriptions
- **Advanced filters** - Search by location, budget, age and lifestyle preferences
- **Flexible contact options** - Connect via email, phone, or social media

## Key Features

#### Best Matches Algorithm
- Suggests ideal roommates by analyzing post descriptions (keywords you are looking for)
- Considers preferences like lifestyle factors

#### Advanced Filters
Search by:
- **Age**
- **Smoking**
- **Drinking Socially**
- **Max Rent**
- **Subleasing**
- **Country**
- **Sex**
- **Neighborhood**

#### Post Listings
- Create posts about yourself and browse posts of available roommates
- Multiple contact methods : email, phone, or social media links

## Application Purpose
Finding compatible roommates at UIC can be challenging for most students due to:
1. **Limited Discovery Options**
    - Current platforms don't have an effective way to match student's based on their needs and preferences
    - Students often have to rely on social media groups or impoersonal classifieds

2. **Inefficient Search Process**
    - Manual filtering through dozens of listings is time-consuming
    - No smart matching system exists for roommate preferences

3. **Safety Concerns**
    - Random roommate assignemtns don't consider perosnal habits or schedules
    - Lack of ways to contact Roommates leads to uncertainty

HelloRoomie solves these problems by:  
    ✅ Using Dynamic Data Structures to suggest ideal roommmates  
    ✅ Providing advanced filters to provide precise searching  
    ✅ Creating a UIC-based platform for safer connections  
    ✅ Focusing on lifestyle compatibility beyond just price/location  

## React Libraries and Frameworks
### Backend
#### Frameworks
- Flask  
    - Flask was chosen over Django because it's framework is more flexible and easier to work with. We have the options to choose our components and the Setup time for it all is faster. It is more ideal for our APIs as it is restful and allows our frontend to do the heavy lifting.  
- Werkzeug  
- Jinja2  

#### Essential Utilities  
- click  
- itsdangerous  
- MarkupSafe  

#### Libraries  
- flask-cors  
- blinker  
- tabulate  
- colorama  

### Frontend Dependencies  
- react  
- react-dom  
- react-router-dom  
- lucide-react  
- Axios  


## How to Use
### 1. Install VSCode
- Download VSCode from their [official website](https://code.visualstudio.com/download)
- Install Python Extension from the left navigation bar
### 2. Install Git and set up GitHub
- Install Git from the [official website](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- For Mac users, install [Homebrew](https://brew.sh/) and then type ```brew install git``` in the terminal
- After installation, open Git Bash/(Terminal for Mac users) from your Start menu and then type git --version to confirm

- Set up your username and email globally through these commands : 
    - git config --global user.name "Your Name"
    - git config --global user.email "your.email@example.com"
- In order to work with both GitHub and VSCode, install GitHub Repositories from the Extensions tab and you'll see a Source Control icon in your navigation tab and an option to clone Git repository.

### 3. Backend
- For Windows users, Download Python from [official website](https://www.python.org/downloads/). During Installation, it is important that you click on the option "add Python to Path"
- For Mac Users, install using Homebrew: ```brew install python```
- Confirm that Python installed correctly by typing ```python --version``` and ```pip --version``` on Command Prompt

    #### Backend Demo Setup
    - Go to your Forked Repositoryo n Github and cl
### 4. Frontend
- For windows users, install [Node.js and npm LTS version](https://nodejs.org/en/download)
- For Mac users, use Homebrew ```brew install node```
- Confirm installation by running ```node -v``` and ```npm -v```
### 5. Setup Flask + React locally
- Go to the forked version of  this repository on Github, click the green Code button and then copy the URL using HTTPS or SSH.
- Open VS Code and click *Clone on a repository*. (This can be seen in the home page or under Source Control) Choose a directory to store this project on your local computer. (this can also be done using ''' git clone REPO_URL''')
- You will now have a local verson of all the files / source code from GitHub.
#### a. Set up Backend
- Right click the folder called ```backend``` and click the option ```Open in integrated terminal```
- Create a new virtual environment ```python -m venv env```
- Activate the virtual environment
    - Windows: ```.\env\Scripts\activate```
    - Mac: ```source env/bin/activate```
- Now you will see (venv) in front of your command line. This means virtual environment successfully was created
- install all dependencies and packages by using:
    - ```pip install -r requirements.txt```
- If you ever choose to deactivate it, run ```env\Scripts\deactivate.bat```
- run ```py host.py``` to initalize flask app setup
- Your flask server will now be running on ```localhost:PORT```. You can find port number inside the terminal
- If you get any errors for Mac Users, you can reactivate your env by running: ```source env/bin/activate```

#### b. Set up Frontend
- Open up a new terminal by right clicking the folder called ```frontend``` and clicking on the option ```Open in integrated terminal```
- Install all packages by running ```npm install```
- To run the react frontend, write ```npm run dev```
- Your react app should now be running on ```localhost:PORT```. Follow that link for the port number

## Demo<!-- Required -->
<!-- 
* You can add a demo here GH supports images/ GIFs/videos 
* 
* It's recommended to use GIFs as they are more dynamic
-->



## Contributors<!-- Required -->
<!-- 
* Without contribution we wouldn't have open source. 
* 
* Generate github contributors Image here https://contrib.rocks/preview?repo=angular%2Fangular-ja
-->



<!-- - Use this html element to create a back to top button. -->
<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>


## Feedback<!-- Required -->
<!-- 
* You can add contacts information like your email and social media account 
* 
* Also it's common to add some PR guidance.
-->

## Contact<!-- Required -->
<!-- 
* add your email and contact info here
* 
* 
-->

## References
https://github.com/University-of-Illinois-Chicago/flask-react-demo
    - Used for helping to create the installation guide for this README
    - (Thank you Amazing TAs)

<!-- - Use this html element to create a back to top button. -->
<p align="right"><a href="#how-to-use-this-project">back to top ⬆️</a></p>