from pydantic import BaseModel




class CityBody(BaseModel):
    name:str
    latitude:float
    longitude:float



class ComparisionBody(BaseModel):
    city_a:CityBody
    city_b:CityBody


  