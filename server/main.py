from fastapi import FastAPI
from routes.cityRouter import router as countryRouter
from routes.weatherRouter import router as weatherRouter
from routes.favoritesRouter import router as favoritesRouter
from fastapi.middleware.cors import CORSMiddleware
import requests



app = FastAPI()



origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],         
)

app.include_router(countryRouter)
app.include_router(weatherRouter)
app.include_router(favoritesRouter)


@app.get('/health')
def checkHealth():
    return {"status":"ok"}




if __name__== "__main__":
    print("run...")