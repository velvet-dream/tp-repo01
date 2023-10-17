export default class FetchGeoApi {
  static url_server = "https://geo.api.gouv.fr";
  static loadRegions() {
    return fetch(FetchGeoApi.url_server + "/regions")
      .then((response) => {
        return response.json();
      })
      .then((Regions) => {
        return Regions;
      })
      .catch((error) => {
        console.error("Erreur attrapé dans loadRegions", error);
      });
  }

  static loadDepartments(codeValue) {
    return fetch(FetchGeoApi.url_server + `/regions/${codeValue}/departements`)
      .then((response) => {
        return response.json();
      })
      .then((departments) => {
        return departments;
      })
      .catch((error) => {
        console.error("Erreur attrapé dans loadDepartments", error);
      });
  }

  static loadCities(zipCode) {
    return fetch(FetchGeoApi.url_server + `/departements/${zipCode}/communes`)
      .then((response) => {
        return response.json();
      })
      .then((cities) => {
        return cities;
      })
      .catch((error) => {
        console.error("Erreur attrapé dans loadCities", error);
      });
  }

  static loadCitiesInfos(citiesInfos) {
    return fetch(FetchGeoApi.url_server + `/communes/${citiesInfos}`)
      .then((response) => {
        return response.json();
      })
      .then((citiesInfos) => {
        return citiesInfos;
      })
      .catch((error) => {
        console.error("Erreur attrapé dans loadCities", error);
      });
  }
}
