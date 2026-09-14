from fastapi import APIRouter
from service.atbash import atbash

router  = APIRouter(prefix='/atbash',tags=['atbash'])



@router.get('/:text')
def getAtbash(text:str):
    textEncripted = atbash(text)
    return textEncripted