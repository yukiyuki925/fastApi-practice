from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from backend import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
  "http://localhost:5173"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

# Dependency
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

# ユーザー登録
@app.post("/users/", response_model=schemas.User)
def create_user(user:schemas.UserCreate,db:Session=Depends(get_db)):
    db_user = crud.get_user_by_name(db,name=user.name)
    if db_user:
      raise HTTPException(status_code=400,detail="Name already registered")
    return crud.create_user(db=db,user=user)

# 登録済みユーザー検索
@app.get("/users/", response_model=schemas.User)
def read_user(name:str,password:str,db:Session=Depends(get_db)):
  db_user = crud.get_user_by_name_by_password(db,name=name,password=password )
  if db_user is None:
    raise HTTPException(status_code=404,detail="User Not Found")
  return db_user

@app.post("/sales/",response_model=schemas.Sales)
def create_sales(sales:schemas.SalesCreate,db:Session=Depends(get_db)):
  db_sales = crud.get_sales_by_year_by_department(db,year=sales.year, department=sales.department)
  if db_sales:
    raise HTTPException(status_code=400,detail="Sales Info already registered")
  return crud.create_sales(db=db,sales=sales)

# 複数のsalesを取得する
@app.get("/sales/",response_model=list[schemas.Sales])
def read_sales(db:Session=Depends(get_db)):
  sales = crud.get_sales(db)
  return sales

# sales絞り込み
@app.get("/sales/{year}",response_model=list[schemas.Sales])
def read_sales_by_year(year:int, db:Session=Depends(get_db)):
  sales = crud.get_sales_by_year(db, year=year)
  return sales