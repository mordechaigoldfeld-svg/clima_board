from fastapi import APIRouter,HTTPException
from service.country import countryExists,getCountry

router = APIRouter(prefix='/country',tags=['country'])


@router.get('/')
def getCountryByName(name):
    country = getCountry(name)
    if countryExists(country):
        return country

    raise HTTPException(404,"country not found")
