import requests
from utils.country_validator import countryExists





def getCountry(countryName):
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params={"name":countryName}
    fetch = requests.get(url,params=params)
    return fetch.json()
    
# print(getCountry("as435536363")['results'])

# print(countryExists(getCountry('brazil')))