export class API {
  static async getData(location, longitude, latitude) {
    let request;
    if (location == undefined) {
      request = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?unitGroup=metric&key=DBGPCC34U7KPLBQNLVVWS4YBZ`
      );
    } else {
      request = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=DBGPCC34U7KPLBQNLVVWS4YBZ`
      );
    }
    const data = await request.json();
    console.log(data);
    return data;
  }

  static getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (success) => {
            const longitude = success.coords.longitude;
            const latitude = success.coords.latitude;
            resolve({ longitude, latitude });
          },
          (error) => {
            reject(-1);
          }
        );
      } else {
        reject(-1);
      }
    });
  }

  static async getCurrentLocationData() {
    try {
      const loc = await API.getCurrentLocation();
      const city = await API.getCity(loc.longitude, loc.latitude);
      const data = await API.getData(city.address.city);
      return data;
    } catch (e) {
      alert("Error Occured");
    }
  }

  static getCity(long, lat) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;

    return fetch(url)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        if (data && data.address) {
          return data;
        }
      })
      .catch(function (e) {
        console.error("Error fetching data:", e);
      });
  }
}
