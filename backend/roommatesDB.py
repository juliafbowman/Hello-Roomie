import sqlite3

class DatabaseManager: 
    def __init__(self, db_name="roommmatesDB.db"):
        self.conn = sqlite3.connect(db_name)
        self.conn.row_factory = sqlite3.Row 
        self.cursor = self.conn.cursor()
        self.createTablePosts()
    
    def createTablePosts(self):
        '''Create a table named posts if it doesnt exist 
           There is no need to call this function it will be called whenever the constructor is called! 
        '''
        self.cursor.execute('''
            CREATE TABLE IF NOT EXISTS posts (
                id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                age INTEGER NOT NULL,
                smoking INTEGER NOT NULL CHECK (smoking IN (0, 1)),
                drinking_socially INTEGER NOT NULL CHECK (drinking_socially IN (0, 1)),
                max_rent INTEGER NOT NULL CHECK (max_rent >= 300 AND max_rent <= 10000),
                subleasing INTEGER NOT NULL CHECK (subleasing IN (0, 1)),
                country TEXT NOT NULL CHECK (length(country) < 100),
                language TEXT NOT NULL CHECK (length(language) < 50),
                language_2 TEXT CHECK (length(language_2) < 50),
                sex CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
                email TEXT NOT NULL CHECK (length(email) < 200),
                social_link TEXT CHECK (length(social_link) < 300),
                phone_number TEXT CHECK (length(phone_number) < 50),
                description TEXT CHECK (length(description) < 300)
            );
        ''')
        self.conn.commit()

    def execute_query(self, query, params=()):
        '''Query = SQL Query with placeholders
        params = Values you want to pass into the SQL Query
        Refer to utils.py to see an example
        '''
        self.cursor.execute(query, params)
        self.conn.commit()
        
    def fetch_query(self, query, params=()):
        '''
        Query = SQL Query with placeholders
        params = Values you want to pass into the SQL Query
        Refer to utils.py to see an example
        '''

        self.cursor.execute(query, params)
        return self.cursor.fetchall()
        

    #function intention to filter query and return a fetched table
    # what needs to be done for this to work is make a mapping of filters like this
    '''
    filters = {
        'age': 25,
        'smoking' : 0,
        'country': 'USA'
    }
    '''
    def filter_query(self, filter_params):
        '''Query = SQL Query
        filter_params = Values you want to find in query
        '''
        
        if not filter_params:
            query = "SELECT * FROM posts"
        
        # build base query
        where_clauses = []
        params = {}

        # define filter mappings with their sql conditions

        for key,value in filter_params.items():
            #this checks for multiple values (for case of comparison values)
            if isinstance(value, tuple) and len(value) == 2:
                operator, val = value
                param_key = f"{key}_{operator}"
                where_clauses.append(f"{key} {operator} :{param_key}")

            else:
                where_clauses.append(f"{key} = :{key}")
                params[key] = value

        where_statement = "AND".join(where_clauses)

        query = f"SELECT * FROM posts WHERE {where_statement}"
        
        return self.fetch_query(query, params);
        
    def close(self):
        '''Close the connection with the database'''
        self.conn.close()

    
