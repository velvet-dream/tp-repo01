//Importation of the needed files
import Selector from "./selector.js";
import Slideshow from "./slideshow.js";
import ManageDom from "./ManageDom.js";
let numExo = 1;

export default class Header extends ManageDom {
  constructor() {
    super();
    this.dom_element = this.render();
    this.swapExercice();
  }
  render() {
    const header = this.createMarkup("header", "", document.body, [
      {
        style:
          "width:100%; height: 60px; margin-bottom: 150px;display:flex; align-items:center; justify-content: space-between",
      },
    ]);
    const logoArea = this.createMarkup("div", "", header, [
      { style: "margin-left:20px" },
    ]);
    const logo = this.createMarkup("img", "", logoArea, [
      { src: "./../assets/logo.png" },
    ]);
    const navHeader = this.createMarkup("nav", "", header, [
      { style: "margin-right:20px" },
    ]);
    const aNavHeader = this.createMarkup("a", "", navHeader, [
      { href: "#" },
      { style: "text-decoration:none; color : 'initial'" },
    ]);
    const ulNavHeader = this.createMarkup("ul", "", aNavHeader);
    const liNavHeader = this.createMarkup("li", `Exercice 1`, ulNavHeader, [
      { style: "color: white; font-size:30px; list-style:none" },
      {
        onmouseover:
          "this.style.color = '#FFF'; this.style.textShadow = '#FFF 0px 0px 5px, #FFF 0px 0px 10px, #FFF 0px 0px 15px, #FF2D95 0px 0px 20px, #FF2D95 0px 0px 30px, #FF2D95 0px 0px 40px, #FF2D95 0px 0px 50px, #FF2D95 0px 0px 75px'",
        onmouseout: "this.style.color = '#FFF'; this.style.textShadow = 'none'",
      },
    ]);
    return liNavHeader;
  }
  swapExercice() {
    this.dom_element.addEventListener("click", () => {
      const container = document.querySelector("main");
      container.remove();
      if (numExo === 1) {
        this.dom_element.innerHTML = "Exercice 2";
        numExo--;
        new Selector("regions");
      } else {
        this.dom_element.innerHTML = "Exercice 1";
        numExo++;
        new Slideshow(5, 400, 400, 2000);
      }
    });
  }
}
