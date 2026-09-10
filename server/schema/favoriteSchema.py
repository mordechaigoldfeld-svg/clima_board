from pydantic import BaseModel,Field




class favoriteBody(BaseModel):
    explorer_name:str =Field(min_length=2, max_length=50)
    city_name:str =Field(min_length=2, max_length=50)
    country:str =Field(min_length=2, max_length=50)
    lat:float = Field(ge=-90.0, le=90.0)
    long:float =Field(ge=-180.0, le=180.0)
    
    
    
