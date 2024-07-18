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
      
      document.querySelector("#temp").textContent = `${info.temp}°`
      document.querySelector("#cond").textContent = info.conditions
      document.querySelector("#wind-speed").textContent = info.windspeed
      document.querySelector("#today-icon").innerHTML = UI.getSvg(info.icon).replaceAll("24px","40px")
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
       
      const container = document.querySelector("#weather-forecast")
      container.innerHTML = ""
      const date = new Date()

      data.days.forEach((day,i)=>{
         const dayCard = document.createElement("div")
         dayCard.setAttribute("id","day-card")
         dayCard.setAttribute("class","d-flex flex-column col-2 align-items-center px-4")

         const dayNum = document.createElement("div")
         dayNum.classList.add("forecast-day")
         dayNum.textContent = i == 0 ? "Today" : day.datetime.substring(day.datetime.length - 2) + " " + UI.getMonthName(parseInt(day.datetime.split("-")[1]))

         const svg = document.createElement("div")
         svg.classList.add("svg")
         svg.innerHTML = UI.getSvg(day.icon)

         const temp = document.createElement("div")
         temp.classList.add("temp-forecast")
         temp.textContent =`${day.temp}°`
         
         dayCard.append(dayNum)
         dayCard.append(svg)    
         dayCard.append(temp)
                                                                                                                                                                                                                                                                                                                           
         container.append(dayCard)
      })

    } 



    static getSvg(condition){
         
          if(condition.includes("cloud")){
            return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>`
          }else if(condition.includes("rain")){
             return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>`
          }else{
            return `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>`           
          }

    }

    static getLocData(){

    }
}