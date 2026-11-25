from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth", tags=["Auth"])

# Temporary memory me user save honge
users_db = {}

class User(BaseModel):
    email: str
    password: str

@router.post("/signup")
def signup(user: User):
    if user.email in users_db:
        return {"message": "User already exists!"}
    users_db[user.email] = user.password
    return {"message": "Signup successful!", "email": user.email}

@router.post("/login")
def login(user: User):
    if user.email not in users_db:
        return {"message": "User not found! Please signup first"}
    if users_db[user.email] != user.password:
        return {"message": "Wrong password!"}
    return {"message": "Login successful!", "email": user.email}