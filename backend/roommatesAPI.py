from roommatesDB import * 

def getAllProfiles():
    db = DatabaseManager()
    allProfiles = db.fetch_query(query="SELECT * FROM posts")
    db.close()
    return [dict(row) for row in allProfiles]

# def filter_profiles():
#     try:
#         data = request.get_json # Expects {"age" : ["<", 25], "country" : "USA"}
#         print(data)
#         db = DatabaseManager()
#         results=  db.filter_query(data)
#         db.close()
#         return [dict(row) for row in results]
#     except Exception as e:
#         return {500: "error"}

def insertProfile(user_data):
    db = DatabaseManager()
    required_fields = {
        "first_name": str,
        "last_name": str,
        "age": int,
        "smoking": int,
        "drinking_socially": int,
        "max_rent": int,
        "subleasing": int,
        "country": str,
        "language": str,
        "sex": str,
        "email": str,
    }

    optional_fields = {
        "language_2": str,
        "social_link": str,
        "phone_number": str,
        "description": str
    }

    # Check required fields, non null fields
    for field, expected_type in required_fields.items():
        if field not in user_data:
            return {500: f"Missing required field: {field}"}
        if not isinstance(user_data[field], expected_type):
            return {500: f"Field '{field}' must be of type {expected_type.__name__}"}

    # Validate binary fields 
    if user_data["smoking"] not in (0, 1):
        return {500: "Field 'smoking' must be 0 or 1"}
    if user_data["drinking_socially"] not in (0, 1):
        return {500: "Field 'drinking_socially' must be 0 or 1"}
    if user_data["subleasing"] not in (0, 1):
        return {500: "Field 'subleasing' must be 0 or 1"}
    if user_data["sex"] not in ('M', 'F'):
        return {500: "Field 'sex' must be 'M' or 'F'"}

    # Validate max_rent range
    if not (300 <= user_data["max_rent"] <= 10000):
        return {500: "Field 'max_rent' must be between 300 and 10000"}

    # Validate the size of text fields
    if len(user_data["country"]) >= 100:
        return {500: "Field 'country' must be less than 100 characters"}
    if len(user_data["language"]) >= 50:
        return {500: "Field 'language' must be less than 50 characters"}
    if len(user_data["email"]) >= 200:
        return {500: "Field 'email' must be less than 200 characters"}

    # Validate optional fields (nullable ones)
    for field, max_length in [("language_2", 50), ("social_link", 300), ("phone_number", 50), ("description", 300)]:
        if field in user_data and user_data[field] is not None and len(user_data[field]) >= max_length:
            return {500: f"Field '{field}' must be less than {max_length} characters"}

    # get a list of columns
    all_fields = list(required_fields.keys()) + list(optional_fields.keys())
    columns = []
    values = []
    for field in all_fields:
        if field in user_data:
            columns.append(field)
            values.append(user_data[field])

    placeholders = ', '.join(['?'] * len(columns))
    columns_sql = ', '.join(columns)

    # query 
    query = f"INSERT INTO posts ({columns_sql}) VALUES ({placeholders})"

    try:
        db.execute_query(query, tuple(values))
        allProfiles = db.fetch_query(query="SELECT * FROM posts ORDER BY id DESC")
        db.close()
        return [dict(row) for row in allProfiles]
    except Exception as e:
        db.close()
        return {500: f"Database error: {str(e)}"}


#function intention to filter query and return a fetched table
    # what needs to be done for this to work is make a mapping of filters like this
    # '''
    # filters = {
    #     'age': 25,
    #     'smoking' : 0,
    #     'country': 'USA'
    # }
    # '''

def filter_query(filter_params):
    '''Query = SQL Query
    filter_params = Values you want to find in query
    '''
        
    '''
        AGE : 25
        COUNTRY : 'USA'
            
        WHERE  + AGE = ? AND COUNTRY = ?
        params = [25, 'USA']
    '''
    db = DatabaseManager()
    
    OP_MAP ={
        "=" : "eq",
        ">": "gt",
        "<": "lt",
        ">=": "ge",
        "<=": "le",
        "!=": "ne",
        "<>": "ne"
    }
    try:
        if not filter_params:
            raise ValueError("No filter parameters provided")
        # build base query
        
        where_clauses = []
        params = {}

        # define filter mappings with their sql conditions

        for key,value in filter_params.items():
            #this checks for multiple values (for case of comparison values)
            if isinstance(value, tuple) and len(value) == 2:
                checks = [value]
            elif isinstance(value, list):
                checks = value
            else:
                where_clauses.append(f"{key} = :{key}")
                params[key] = value
                continue
            
            for i, (op, val) in enumerate(checks, start = 1):
                token = OP_MAP.get(op)
                if token is None:
                    raise ValueError(f"Unsupported operator: {op!r}")
                param_name = f"{key}_{token}_{i}"
                where_clauses.append(f"{key} {op} :{param_name}")
                params[param_name] = val

        where_statement = " AND ".join(where_clauses)
        query = f"SELECT * FROM posts WHERE {where_statement}"
        
        rows = db.fetch_query(query = query, params = params)
        return [dict(r) for r in rows]
    
    finally:
        db.close()
    
# if __name__ == "__main__":
#     app.run(debug=True)

