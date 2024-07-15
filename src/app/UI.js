import {API} from "../app/WeatherApi"

export class UI{

    static async loadHomePage(){
       API.getCurrentLocationData().then((data)=>UI.updateWeatherCard(data))
       UI.handleEventListeners()
    }

    static  handleEventListeners(){
        document.querySelector("#loc-submit").addEventListener("click",()=>{
            const value = document.querySelector("#loc-input").value
            const data = API.getData(value).then((data)=>
            UI.updateWeatherCard(data))
        })
    }

    static updateWeatherCard(data){
      const info = data.currentConditions
      const date = new Date()
      
      document.querySelector("#temp").textContent = info.temp
      document.querySelector("#cond").textContent = info.conditions
      document.querySelector("#wind-speed").textContent = info.windspeed
      document.querySelector("#hum-per").textContent = info.humidity
      document.querySelector(".card-title").textContent = data.address
      document.querySelector("#date-today").textContent = date.getDate() + " " + UI.getMonthName(date.getMonth())
      

    }

    static getMonthName(month){

        const arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        return arr[month-1];

    }

    static getLocData(){

    }
}