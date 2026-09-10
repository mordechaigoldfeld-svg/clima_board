import uuid
import os
import json
from pathlib import Path

CURRENT_FILE_DIR = Path(__file__).resolve().parent
FILE_PATH= CURRENT_FILE_DIR.parent/'data/favorites.json'

# print(new_id)    





def insertBody(body):
   
    favorites = getBody()

    new_id = uuid.uuid4().hex
    print(body)
    new_favorite = {**body, "id":new_id}

    favorites.append(new_favorite)

    with open(FILE_PATH, "w", encoding="utf-8") as file:
        json.dump(favorites, file,indent=2)

    return new_favorite


def getBody():
    if not os.path.exists(FILE_PATH):
        return []
    try:
        with open(FILE_PATH,"r") as file:
            return json.load(file)
    except json.JSONDecodeError:
            return "error"
   
        

def deleteFavorite(favorite_id: str):
    
  favorites = getBody()
  
  initial_len =len(favorites)

  updated_favorites = [fav for fav in favorites
                       if not ( fav.get("id") == favorite_id)]
    
 
  with open(FILE_PATH, "w", encoding="utf-8") as file:
    json.dump(updated_favorites, file, indent=2)
    
  if initial_len == len(updated_favorites):
      return False
  
  return True  
  
    

  return updated_favorites
    
    
    
def getbyExplorerName(explorerName):
    favorites = getBody()
    
    explorerFavorites = [fav for fav in favorites if fav.get('explorer_name')==explorerName]
    
    return explorerFavorites    
  
  
  
  
  

  
  
  
  
    
# print(insertBody({"name":"test"}))    
# print(getBody())    

# print(deleteFavorite('acbf16656d004c21a4ee87156e6f9596'))

# print(getbyExplorerName("test"))