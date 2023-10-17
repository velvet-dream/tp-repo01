//Importation of the needed files
import ManageDom from "./ManageDom.js";
import FetchGeoApi from "./../services/fetchGeoApi.js";
//Declaration of the formTerrritory class
export default class cityInfos extends ManageDom {
  constructor(cityInfos, container) {
    super();
    this.cityInfos = cityInfos;
    this.container = container;
    this.dom_element = this.render();
  }

  //Render method
  render() {
    //Create the department selector
    const cityInfosArea = this.createMarkup("div", "", this.container, [
      {
        style:
          "width: 80%; height:400px; border-radius: 20px; margin-bottom: 20px; padding-left : 20px; box-sizing : padding-box; background-color: #FFF",
        id: "selectCitiesInfos",
      },
    ]);
    const cityName = this.createMarkup(
      "p",
      `${this.cityInfos.nom}`,
      cityInfosArea,
      [{ style: "font-size: 40px; font-weigth: bold" }]
    );
    const cityPopulation = this.createMarkup(
      "p",
      `Population : ${this.cityInfos.population}`,
      cityInfosArea,
      [{ style: "font-size: 40px; font-weigth: bold" }]
    );
    const cityZip = this.createMarkup(
      "p",
      `Code postal : ${this.cityInfos.code}`,
      cityInfosArea,
      [{ style: "font-size: 30px; font-weigth: default" }]
    );
  }
}
