import requests
# from utils.days_validator import days_validator
from service.country import getCountry

def get_Current_wheater(lat:float,long:float):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude":lat,
        "longitude":long,
        "current":"temperature_2m,wind_speed_10m,apparent_temperature,weather_code"
        }
    fetch = requests.get(url,params=params)
    return fetch.json()

# print(get_Currrent_wheater(-23.5475,46.63611))




def get_prevision_wheater(lat:float,long:float,days:int):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude":lat,
        "longitude":long,
        "forecast_days":days,
        "daily":"temperature_2m_mean,wind_speed_10m_mean,apparent_temperature_mean,weather_code"
        }
    fetch = requests.get(url,params=params)
    return fetch.json()



print(get_prevision_wheater(-23.5475,46.63611,2))




# def get_prevision_by_name(counrtyName,days):
#     country = get
#     return



# def get_current_by_name():
#     return