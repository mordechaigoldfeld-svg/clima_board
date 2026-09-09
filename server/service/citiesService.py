import requests






def getCities(cityName):
    url = "https://geocoding-api.open-meteo.com/v1/search"
    params={"name":cityName}
    fetch = requests.get(url,params=params)
    return fetch.json()
    
# print(getCountry("as435536363")['results'])

# print(countryExists(getCountry('brazil')))