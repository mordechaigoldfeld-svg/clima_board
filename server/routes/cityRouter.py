from fastapi import APIRouter,HTTPException
from service.citiesService import getCities
from utils.city_validator import cityExists



router = APIRouter(prefix='/cities',tags=['cities'])


@router.get('/')
def getCityyByName(name):
    city = getCities(name)
    if cityExists(city):
        return city

    raise HTTPException(404,"city not found")
