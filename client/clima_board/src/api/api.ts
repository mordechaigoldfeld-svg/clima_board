import { instance } from "../utils/axios-config.ts";
import { type favoriteType } from "../types/favorites.ts";
import { type ComparisionBody } from "../types/comparisionTypes.ts";

export async function getCities(name:string) {
    
    const cities = await instance.get('cities',{
        params:{name}
    })
    return cities.data
}


export async function getCurrentWeather(lat:number,long:number) {

    const weather = await instance.get('/weather/current',{
        params:{
           lat,
           long 
        }
    })
    return weather.data
}

// console.log(await getCurrentWeather(51.50853,-0.12574));

export async function getPrevision(lat:number,long:number,days:number) {

    const prevision = await instance.get('/weather/prevision',{
        params:{
            lat,
            long,
            days
        }
    })
    return prevision.data
    
}

// console.log(await getPrevision(51.50853,-0.12574,2));

export async function weatherCompare(body:ComparisionBody) {

    const compare = await instance.post('/weather/compare',body)
    return compare.data
    
}

// console.log(await weatherCompare({
//   "city_a": {
//     "name": "london",
//     "latitude": 51.50853,
//     "longitude": -0.12574
//   },
//   "city_b": {
//     "name": "brasil",
//     "latitude":15.23278,
//     "longitude": -92.49056
//   }
// }));



export async function getByName(explorer_name:string) {
        const favorites = await instance.get('/favorites/get',{
            params:{explorer_name}
        })
        return favorites.data;
        
}



export async function insertNewFavorite(body:favoriteType) {

    const newfav = await instance.post('/favorites/insert',body)
    return newfav.data
}



export async function deleteFavorite(id:string) {

    const remove = await instance.delete(`/favorites/delete/${id}`)
    return remove.data
    
}



// console.log(await deleteFavorite('02c7c81e055a4bc19584e3cab9c87cda'));

// console.log(await insertNewFavorite({
//   "explorer_name": "string",
//   "city_name": "str",
//   "country": "string",
//   "lat": 0,
//   "long": 0
// }));


// console.log(await getByName("momo"));
