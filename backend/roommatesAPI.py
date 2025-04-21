from roommatesDB import * 
from findBestMatches import *

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

        # TO DO : make print statement in function if data type is not correct

        for key,value in filter_params.items():
            #this checks for multiple values (for case of comparison values)
            if isinstance(value, list) and len(value) == 2:
                op1,val1 = value[0]
                op2,val2 = value[1]
                token1 = OP_MAP.get(op1)
                token2 = OP_MAP.get(op2)

                if token1 is None or token2 is None:
                    raise ValueError(f"Unsupported operator in range: {op1} or {op2}")
                
                param_name1 = f"{key}_{token1}"
                param_name2 = f"{key}_{token2}"

                where_clauses.append(f"{key} {op1} :{param_name1} AND {key} {op2} :{param_name2}")
                params[param_name1] = val1
                params[param_name2] = val2

            else:
                if isinstance(value, (list,tuple)):
                    raise ValueError(f"Expected scalar for {key}, got list. ")
                # handle other cases (single value)
                if key in {"age", "max_rent"}:
                    op = "<="
                    param_name = f"{key}_ge_default"
                    where_clauses.append(f"{key} {op} :{param_name}")
                    params[param_name] = int(value) #ensure it's an integer

                else:
                    where_clauses.append(f"{key} = :{key}")
                    params[key] = value
            
            

        where_statement = " AND ".join(where_clauses)
        query = f"SELECT * FROM posts WHERE {where_statement}"
        
        rows = db.fetch_query(query = query, params = params)
        return [dict(r) for r in rows]
    
    finally:
        db.close()
    


def matchProfiles(user_prefs):
    required_fields = {
        "age": int,
        "smoking": int,
        "drinking_socially": int,
        "subleasing": int,
        "country": str,
        "language": str,
        "sex": str,
        "max_rent": int,
        "description_tags": list  # List of tags to match in Trie
    }

    optional_fields = {
        "language_2": str
    }

    # Validate required fields
    for field, expected_type in required_fields.items():
        if field not in user_prefs:
            return {500: f"Missing required field: {field}"}
        if not isinstance(user_prefs[field], expected_type):
            return {500: f"Field '{field}' must be of type {expected_type.__name__}"}

    # Validate binary fields
    for field in ["smoking", "drinking_socially", "subleasing"]:
        if user_prefs[field] not in (0, 1):
            return {500: f"Field '{field}' must be 0 or 1"}

    # Validate sex
    if user_prefs["sex"] not in ("M", "F"):
        return {500: "Field 'sex' must be 'M' or 'F'"}

    # Validate ranges
    if not (300 <= user_prefs["max_rent"] <= 10000):
        return {500: "Field 'max_rent' must be between 300 and 10000"}

    # Validate string lengths
    if len(user_prefs["country"]) >= 100:
        return {500: "Field 'country' must be less than 100 characters"}
    if len(user_prefs["language"]) >= 50:
        return {500: "Field 'language' must be less than 50 characters"}

    # Validate optional fields
    if "language_2" in user_prefs and user_prefs["language_2"]:
        if not isinstance(user_prefs["language_2"], str):
            return {500: "Field 'language_2' must be a string"}
        if len(user_prefs["language_2"]) >= 50:
            return {500: "Field 'language_2' must be less than 50 characters"}

    # Validate and normalize description_tags
    if not all(isinstance(tag, str) for tag in user_prefs["description_tags"]):
        return {500: "All description tags must be strings"}

    # Convert all tags to lowercase
    user_prefs["description_tags"] = [tag.lower() for tag in user_prefs["description_tags"]]

    try:
        matches = get_best_matches(user_prefs, limit=5)

        serialized_matches = []
        for m in matches:
            desc_trie = m.get("description")

            cleaned = {
                "id": m.get("id"),
                "first_name": m.get("first_name"),
                "last_name": m.get("last_name"),
                "age": m.get("age"),
                "smoking": m.get("smoking"),
                "drinking_socially": m.get("drinking_socially"),
                "max_rent": m.get("max_rent"),
                "subleasing": m.get("subleasing"),
                "country": m.get("country"),
                "language": m.get("language"),
                "language_2": m.get("language_2"),
                "sex": m.get("sex"),
                "email": m.get("email"),
                "social_link": m.get("social_link"),
                "phone_number": m.get("phone_number"),
                "description": m.get("description"),
                # No descriptionTrie
            }

            serialized_matches.append(cleaned)

        return {"matches": serialized_matches}

    except Exception as e:
        return {500: f"Matching error: {str(e)}"}
