from pydantic import BaseModel




class favoriteBody(BaseModel):
    explorer_name:str
    city_name:str
    country:str
    lat:float
    long:float
    
    
    
