from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import uvicorn

app = FastAPI(title="StudySync Full API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- In-Memory Database ---
users_db = {}
groups_db = [{"id": 1, "name": "Science Toppers", "members": 5}, {"id": 2, "name": "UPSC 2026", "members": 12}]
quizzes_db = [{"id": 1, "title": "General Science Quiz", "questions": 10}]

class User(BaseModel):
    name: str = ""
    email: str
    password: str

class LoginUser(BaseModel):
    email: str
    password: str

@app.get("/")
def home():
    return {"message": "StudySync Backend Running on 8001!"}

@app.post("/signup")
def signup(user: User):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="User already exists")
    users_db[user.email] = user.dict()
    return {"message": "User created", "token": f"fake-token-for-{user.email}"}

@app.post("/login")
def login(user: LoginUser):
    if user.email not in users_db or users_db[user.email]['password'] != user.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login success", "token": f"fake-token-for-{user.email}", "name": users_db[user.email].get('name','User')}

@app.get("/groups")
def get_groups():
    return groups_db

@app.get("/quizzes")
def get_quizzes():
    return quizzes_db

@app.get("/dashboard-stats")
def stats():
    return {"users": len(users_db), "groups": len(groups_db), "quizzes": len(quizzes_db)}