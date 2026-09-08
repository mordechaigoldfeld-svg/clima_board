from fastapi import APIRouter,HTTPException
from service.WheaterService import get_Current_wheater, get_prevision_wheater
from utils.days_validator import isValidDays

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
