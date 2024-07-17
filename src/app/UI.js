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
      if(data != undefined){
      const info = data.currentConditions
      const date = new Date()
      
      document.querySelector("#temp").textContent = info.temp
      document.querySelector("#cond").textContent = info.conditions
      document.querySelector("#wind-speed").textContent = info.windspeed
      document.querySelector("#hum-per").textContent = info.humidity
      document.querySelector(".card-title").textContent = data.address
      document.querySelector("#date-today").textContent = date.getDate() + " " + UI.getMonthName(date.getMonth())
      
      UI.updateWeatherInfoCard(data)
      UI.generateWeatherForeCast(data)
      }

    }

    static updateWeatherInfoCard(data){

      const info = data.days[0]

      document.querySelector("#high").textContent = `${info.tempmax}°`
      document.querySelector("#low").textContent = `${info.tempmin}°`
      document.querySelector("#sunrise").textContent = info.sunrise.substring(0,info.sunrise.length - 3)
      document.querySelector("#sunset").textContent = info.sunset.substring(0,info.sunset.length - 3)
      document.querySelector("#feels").textContent = `${info.feelslike}°`
      document.querySelector("#uv").textContent = info.uvindex
      document.querySelector("#rain").textContent = `${info.precipprob}%`
      document.querySelector("#visibility").textContent = info.visibility
      document.querySelector(".weather-description").textContent = data.description


    }

    static getMonthName(month){

        const arr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        return arr[month-1];

    }

    static generateWeatherForeCast(data){
       
      const container = document.querySelector(".weather-forecast")

      data.days.forEach((day)=>{
         const dayCard = document.createElement("div")
         dayCard.classList.add("day-card")

         const svg = document.createElement("div")
                                                                                                                                                                                                                                                                                                                                          

         container.append(dayCard)
      })

    } 

    static getLocData(){

    }
}