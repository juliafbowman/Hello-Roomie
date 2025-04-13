from roommatesDB import * 

def getAllProfiles():
    db = DatabaseManager()
    allProfiles = db.fetch_query(query="SELECT * FROM posts")
    db.close()
    return [dict(row) for row in allProfiles]


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
