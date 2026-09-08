from fastapi import FastAPI
from routes.tets import router as testRouter
from routes.countryRouter import router as countryRouter
from routes.weatherRouter import router as weatherRouter
import requests



app = FastAPI()

app.include_router(testRouter)
app.include_router(countryRouter)
app.include_router(weatherRouter)


@app.get('/health')
def checkHealth():
    return {"status":"ok"}




# url = "https://geocoding-api.open-meteo.com/v1/search"
# params={"name":" vfkjv vs "}

# fetch = requests.get(url,params=params)

# print(fetch.json())
# print(fetch.status_code)

if __name__== "__main__":
    print("run...")