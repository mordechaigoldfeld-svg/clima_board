from fastapi import FastAPI
from routes.cityRouter import router as countryRouter
from routes.weatherRouter import router as weatherRouter
from routes.favoritesRouter import router as favoritesRouter
import requests



app = FastAPI()

app.include_router(countryRouter)
app.include_router(weatherRouter)
app.include_router(favoritesRouter)


@app.get('/health')
def checkHealth():
    return {"status":"ok"}




if __name__== "__main__":
    print("run...")