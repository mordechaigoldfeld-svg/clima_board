from pydantic import BaseModel,Field




class CityBody(BaseModel):
    name:str= Field(min_length=2, max_length=50)
    latitude:float=Field(ge=-90.0, le=90.0)
    longitude:float=Field(ge=-180.0, le=180.0)



class ComparisionBody(BaseModel):
    city_a:CityBody
    city_b:CityBody


  