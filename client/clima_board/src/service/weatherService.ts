import { getCities, getCurrentWeather,getPrevision } from "../api/api.ts";
import type { baseCityType } from "../types/cityType.ts";





export async function getCityService(name:string) {

    const res = await getCities(name)
    
    
    if(!res?.results.length){
        throw new Error(`city ${name} not found`);     
    }
    return res.results.map((c:any)=>({
        name:c.name,
        country:c.country,
        latitude:c.latitude,
        longitude:c.longitude
    }))
    
}





export async function getWeatherForCityService(city:baseCityType){

    const res = await getCurrentWeather(city.latitude,city.longitude) 
     return {
        city,
        current:res.current
     }

}

// console.log(await getWeatherForCityService( {
//     name: 'London',
//     country: 'South Africa',
//     latitude: -24.76667,
//     longitude: -24.76667
//   }));


export async function getPrevisionService(city:baseCityType,days:number) {

    const res  = await getPrevision(city.latitude,city.longitude,days)
    return{

        name:city.name,
        country:city.country,
        prevision:res.daily
    }

}

// console.log(await getPrevisionService({
//     name: 'London',
//     country: 'South Africa',
//     latitude: -24.76667,
//     longitude: -24.76667
//   },2));
