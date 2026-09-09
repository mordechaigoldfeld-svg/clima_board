from fastapi import APIRouter,HTTPException
from service.WheaterService import get_Current_wheater, get_prevision_wheater,compare_two_cities
from utils.days_validator import isValidDays
from schema.comparationSchema import ComparisionBody







router = APIRouter(prefix='/weather',tags=['weather'])


@router.get('/current')
def getCurrent(lat:float,long:float):
    temperature = get_Current_wheater(lat,long)
    return  temperature
    


@router.get('/prevision')
def getPrevision(lat:float,long:float,days:int):
    if isValidDays(days):
        temperature = get_prevision_wheater(lat,long,days)
        return temperature
    raise HTTPException(422,"invalid days")



@router.post("/compare")
def compare_cities(body:ComparisionBody):
    result = compare_two_cities(body.city_a, body.city_b)
    return result



# example
# {
#   "city_a": {
#     "name": "london",
#     "latitude": 51.50853,
#     "longitude": -0.12574
#   },
#   "city_b": {
#     "name": "brasil",
#     "latitude": 15.23278,
#     "longitude":-92.49056
#   }
# }