from fastapi import APIRouter,HTTPException
from schema.favoriteSchema import favoriteBody
from service.favoriteService import getbyExplorerName,deleteFavorite,insertBody


router =APIRouter(prefix='/favorites',tags=['favorites'])


@router.get('/get')
def getFavorites(explorer_name:str):
    favorites = getbyExplorerName(explorer_name)
    if len(favorites)==0:
        raise HTTPException(404,f'user: {explorer_name} not found')
    return favorites



@router.post('/insert')
def insert(body:favoriteBody):
    try:
        newfav= insertBody(body.model_dump())
        return {'success':"created"}
    
    except:
        raise HTTPException(422,'something wrong')
    


@router.delete('/delete/{id}')
def remove(id:str):
    removed = deleteFavorite(id)
    if removed:
        return {"success":"deleted"}
    raise HTTPException(404,"not found")
    