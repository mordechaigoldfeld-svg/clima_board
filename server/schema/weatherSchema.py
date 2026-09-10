from pydantic import BaseModel,Field




class weatherCurrentSchema(BaseModel):
    lat:float=Field(ge=-90.0, le=90.0)
    long:float=Field(ge=-180.0, le=180.0)
    
    
class weatherPrevisionSchema(BaseModel):
    lat:float=Field(ge=-90.0, le=90.0)
    long:float=Field(ge=-180.0, le=180.0)
    days:int = Field(ge=1,le=16)   