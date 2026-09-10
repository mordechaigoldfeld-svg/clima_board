from fastapi import APIRouter,HTTPException,Query
from service.WheaterService import get_Current_wheater, get_prevision_wheater,compare_two_cities
from utils.days_validator import isValidDays
from schema.comparationSchema import ComparisionBody
from schema.weatherSchema import weatherCurrentSchema,weatherPrevisionSchema






router = APIRouter(prefix='/weather',tags=['weather'])


@router.get('/current')
def getCurrent(params:weatherCurrentSchema=Query()):
    temperature = get_Current_wheater(params.lat,params.long)
    return  temperature
    


@router.get('/prevision')
def getPrevision(params:weatherPrevisionSchema=Query()):
        temperature = get_prevision_wheater(params.lat,params.long,params.days)
        return temperature
    



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