//Importation of the needed files
import ManageDom from "./ManageDom.js";
import FetchGeoApi from "./../services/fetchGeoApi.js";

export default class Selector extends ManageDom {
  constructor(selectorThematic, code) {
    super();
    this.selectorThematic = selectorThematic;
    this.code = code;
    this.init();
  }
  // Initialisazion of the class
  async init() {
    //Wait the fetch resolve
    const data_loaded = await this.fetchListSelector();
    //stock data
    this.dataList = data_loaded;
    if (this.dataList) {
      //Call the render method
      this.render();
    }
  }
  render() {
    const main = document.querySelector("main");
    let container;
    //Create the main body and container
    if (!main) {
      const main = this.createMarkup("main", "", document.body, [
        { style: "width:100%" },
      ]);
      container = this.createMarkup("section", "", main, [
        { class: "container" },
        {
          style:
            "width:100%;height: 600px; display: flex; justify-content: center;flex-direction: column; align-items:center",
        },
      ]);
    } else {
      //If it already exist, attribute main container to container
      container = main.firstChild;
    }
    //Create the selector
    const selector = this.createMarkup("select", "", container, [
      {
        style:
          "width: 60%; height:40px; opacity: 0.9; border-radius: 20px; margin-bottom: 20px; text-indent: 10px;",
      },
    ]);
    this.optionListCreator(selector);
    this.handleEvent(selector, container);
  }
  fetchFunction() {
    // List of the fetch functions
    return {
      regions: () => FetchGeoApi.loadRegions(),
      departments: () => FetchGeoApi.loadDepartments(this.code),
      cities: () => FetchGeoApi.loadCities(this.code),
    };
  }
  //Modulable fetch function
  async fetchListSelector() {
    const loaded_regions = await this.fetchFunction()[this.selectorThematic]();
    return loaded_regions;
  }
  //Method to create option list
  optionListCreator(selector) {
    // Create the default empty option
    const defaultOption = this.createMarkup(
      "option",
      "Sélectionnez un élément de la liste",
      selector,
      [{ value: "" }]
    );
    defaultOption.selected = true;
    if (this.dataList) {
      //Loop on each element
      this.dataList.forEach((element) => {
        //Create option
        this.createMarkup("option", element.nom, selector, [
          { value: element.code },
        ]);
      });
    }
  }
  // Method to Create citiesInfos
  citiesInfosRender(selector, container) {
    //While selector isn't lastchild
    while (selector !== container.lastChild) {
      //remove last child
      container.lastChild.remove();
    }
    //Create textArea div
    const textArea = this.createMarkup("div", "", container, [
      {
        style:
          "width: 60%; height: 300px; opacity: 0.9; background-color: white; border-radius: 20px; margin-bottom: 20px; text-indent: 10px;",
      },
    ]);
  }
  // Method to listen event
  handleEvent(selector, container) {
    const thematicList = ["regions", "departments", "cities", "citiesInfos"];
    let newSelectorThem = "";
    //Loop on thematicList array
    for (let i = 0; i < thematicList.length - 1; i++) {
      //Look for the index of the curentThematic
      if (thematicList[i] === this.selectorThematic) {
        //Stock the next one
        newSelectorThem = thematicList[i + 1];
        break;
      }
    }
    //On change listener
    selector.onchange = (e) => {
      //Selected code
      const code = e.target.value;
      //If new thematic isn't citiesInfos
      if (newSelectorThem !== "citiesInfos") {
        //Check if this selector is the last child
        while (selector !== container.lastChild) {
          //If not, remove the lastChild before create a new instance
          container.lastChild.remove();
        }
        //Call a new instance of selector
        new Selector(newSelectorThem, code);
      } else {
        //if nextThematic is citiesInfos
        //Call the fetch method
        FetchGeoApi.loadCitiesInfos(code)
          .then((result) => {
            this.citiesInfosRender(selector, container);
            //Name of the city
            const cityName = this.createMarkup(
              "p",
              result.nom,
              container.lastChild,
              [{ style: "font-size:40px; font-weight:bold;" }]
            );
            //Population of the city
            const cityPopulation = this.createMarkup(
              "p",
              `Population : ${result.population}`,
              container.lastChild,
              [{ style: "font-size:40px; font-weight:bold;" }]
            );
            //Zipcode of the city
            const cityZipcode = this.createMarkup(
              "p",
              `Code postale : ${result.code}`,
              container.lastChild,
              [{ style: "font-size:32px;" }]
            );
          })
          .catch((error) => {
            console.error(
              "Erreur lors de la résolution de la promesse :",
              error
            );
          });
      }
    };
  }
}
