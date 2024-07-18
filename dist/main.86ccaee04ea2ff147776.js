(()=>{"use strict";class t{static async getData(t,e,n){let o;o=null==t?await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${n},${e}?unitGroup=metric&key=DBGPCC34U7KPLBQNLVVWS4YBZ`):await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${t}?unitGroup=metric&key=DBGPCC34U7KPLBQNLVVWS4YBZ`);const r=await o.json();return console.log(r),r}static getCurrentLocation(){return new Promise(((t,e)=>{navigator.geolocation?navigator.geolocation.getCurrentPosition((e=>{const n=e.coords.longitude,o=e.coords.latitude;t({longitude:n,latitude:o})}),(t=>{e(-1)})):e(-1)}))}static async getCurrentLocationData(){try{const e=await t.getCurrentLocation(),n=await t.getCity(e.longitude,e.latitude);return await t.getData(n.address.city)}catch(t){alert("Error Occured")}}static getCity(t,e){return fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e}&lon=${t}`).then((function(t){if(!t.ok)throw new Error("Network response was not ok");return t.json()})).then((function(t){if(t&&t.address)return t})).catch((function(t){console.error("Error fetching data:",t)}))}}class e{static async loadHomePage(){t.getCurrentLocationData().then((t=>e.updateWeatherCard(t))),e.handleEventListeners()}static handleEventListeners(){document.querySelector("#loc-submit").addEventListener("click",(()=>{const n=document.querySelector("#loc-input").value;t.getData(n).then((t=>e.updateWeatherCard(t)))}))}static updateWeatherCard(t){if(null!=t){const n=t.currentConditions,o=new Date;document.querySelector("#temp").textContent=`${n.temp}°`,document.querySelector("#cond").textContent=n.conditions,document.querySelector("#wind-speed").textContent=n.windspeed,document.querySelector("#today-icon").innerHTML=e.getSvg(n.icon).replaceAll("24px","40px"),document.querySelector("#hum-per").textContent=n.humidity,document.querySelector(".card-title").textContent=t.address,document.querySelector("#date-today").textContent=o.getDate()+" "+e.getMonthName(o.getMonth()),e.updateWeatherInfoCard(t),e.generateWeatherForeCast(t)}}static updateWeatherInfoCard(t){const e=t.days[0];document.querySelector("#high").textContent=`${e.tempmax}°`,document.querySelector("#low").textContent=`${e.tempmin}°`,document.querySelector("#sunrise").textContent=e.sunrise.substring(0,e.sunrise.length-3),document.querySelector("#sunset").textContent=e.sunset.substring(0,e.sunset.length-3),document.querySelector("#feels").textContent=`${e.feelslike}°`,document.querySelector("#uv").textContent=e.uvindex,document.querySelector("#rain").textContent=`${e.precipprob}%`,document.querySelector("#visibility").textContent=e.visibility,document.querySelector(".weather-description").textContent=t.description}static getMonthName(t){return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][t-1]}static generateWeatherForeCast(t){const n=document.querySelector("#weather-forecast");n.innerHTML="",new Date,t.days.forEach(((t,o)=>{const r=document.createElement("div");r.setAttribute("id","day-card"),r.setAttribute("class","d-flex flex-column col-2 align-items-center px-4");const a=document.createElement("div");a.classList.add("forecast-day"),a.textContent=0==o?"Today":t.datetime.substring(t.datetime.length-2)+" "+e.getMonthName(parseInt(t.datetime.split("-")[1]));const s=document.createElement("div");s.classList.add("svg"),s.innerHTML=e.getSvg(t.icon);const i=document.createElement("div");i.classList.add("temp-forecast"),i.textContent=`${t.temp}°`,r.append(a),r.append(s),r.append(i),n.append(r)}))}static getSvg(t){return t.includes("cloud")?'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"/></svg>':t.includes("rain")?'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#0000F5"><path d="M558-84q-15 8-30.5 2.5T504-102l-60-120q-8-15-2.5-30.5T462-276q15-8 30.5-2.5T516-258l60 120q8 15 2.5 30.5T558-84Zm240 0q-15 8-30.5 2.5T744-102l-60-120q-8-15-2.5-30.5T702-276q15-8 30.5-2.5T756-258l60 120q8 15 2.5 30.5T798-84Zm-480 0q-15 8-30.5 2.5T264-102l-60-120q-8-15-2.5-30.5T222-276q15-8 30.5-2.5T276-258l60 120q8 15 2.5 30.5T318-84Zm-18-236q-91 0-155.5-64.5T80-540q0-83 55-145t136-73q32-57 87.5-89.5T480-880q90 0 156.5 57.5T717-679q69 6 116 57t47 122q0 75-52.5 127.5T700-320H300Zm0-80h400q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-40q0-66-47-113t-113-47q-48 0-87.5 26T333-704l-10 24h-25q-57 2-97.5 42.5T160-540q0 58 41 99t99 41Zm180-200Z"/></svg>':'<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#F19E39"><path d="M440-760v-160h80v160h-80Zm266 110-55-55 112-115 56 57-113 113Zm54 210v-80h160v80H760ZM440-40v-160h80v160h-80ZM254-652 140-763l57-56 113 113-56 54Zm508 512L651-255l54-54 114 110-57 59ZM40-440v-80h160v80H40Zm157 300-56-57 112-112 29 27 29 28-114 114Zm283-100q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q66 0 113-47t47-113q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47Zm0-160Z"/></svg>'}static getLocData(){}}document.addEventListener("DOMContentLoaded",e.loadHomePage())})();