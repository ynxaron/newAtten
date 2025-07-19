import json
import requests
import base64

# My API URL & Login URL
API_URL = "http://localhost:8000/employee/add/"
LOGIN_URL = "http://localhost:8000/employee/login/"

# My Path to JSON File
JSON_PATH = "./data.json"

# Opening and Saving the file
employeeVal = None
try:
    with open(JSON_PATH, 'r') as f:
        employeeVal = json.load(f)

except:
    raise Exception("Failed to load JSON")

login_data = {
    "email": "admin@djubo.com",
    "password": "1234",
    "next": "/"
}

try:
    session = requests.Session()
    login_res = session.post(LOGIN_URL, json=login_data)
    print("Cookies after login:", session.cookies.get_dict())
    login_res.raise_for_status()

except:
    raise Exception("Cannot Login At EndPoint. Either credentials are incorrect, or /employee/login/ not working")

for emp in employeeVal:
    with open(emp['profile_img'], 'rb') as img:
        try:
            img_b64 = base64.b64encode(img.read()).decode('utf-8')
            emp['profile_img'] = f"data:image/png;base64,{img_b64}"
            db_log = session.post(API_URL, json=emp)
            print("  --> STATUS CODE = " + str(db_log.status_code))
            db_log.raise_for_status()
        except:
            raise Exception("Failed To Send Value")
