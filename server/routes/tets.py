from fastapi import APIRouter,HTTPException


router = APIRouter(prefix="/test",tags=["test"])



def testName(name,lastName):
    fullName = name +" "+ lastName
    return fullName



@router.get('/{name}/{lastName}')
def test(name,lastName):
    if name != "momo":
        return testName(name,lastName)
    raise HTTPException(404,"not not found")