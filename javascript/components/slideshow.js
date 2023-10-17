//Importation of the needed files
import ManageDom from "./ManageDom.js";

//Déclaration of Slideshow class
export default class Slideshow extends ManageDom {
  constructor(nb_images, width, height, speed) {
    super();
    this.nb_images = nb_images;
    this.images = [];
    this.width = width;
    this.height = height;
    this.speed = speed;
    //functions call
    this.feedSlideshow();
    this.render();
    this.animateSs();
  }
  //Déclaration of slideshow's method
  feedSlideshow() {
    //Loop to create the needed pictures
    for (let i = 0; i < this.nb_images; i++) {
      //stock the new random picture in constant
      const img = document.createElement("img");
      img.setAttribute(
        "src",
        `https://picsum.photos/${this.width}/${this.height}?id=${
          Math.random() * 1000
        }`
      );
      //push the current img in the images array
      this.images.push(img);
    }
  }
  //Déclaration of render's method
  render() {
    //Main body
    const main = this.createMarkup("main", "", document.body, [
      { style: "width:100%" },
    ]);
    const container = this.createMarkup("section", "", main, [
      {
        class: "container",
        style:
          "width:100%;height: 600px; display: flex; justify-content: center; ",
      },
    ]);
    const h1 = this.createMarkup("h1", "Mon beau slideShow", container, [
      { style: "color: white; font-size: 42px;" },
    ]);
    //Loop the array to put each img in the main container
    this.images.forEach((image, i) => {
      //Set id on current image
      //Put each image at the same place
      image.style.position = "absolute";
      image.style.marginTop = "100px";
      image.style.cursor = "pointer";
      image.style.borderRadius = "10px";
      image.style.boxShadow = "10px 10px 85px -9px #E074AF";
      //change style except for image 0
      if (i != 0) {
        image.style.marginLeft = "1000px";
        image.style.opacity = 0;
      }
      //Put image in the main as last child
      container.appendChild(image);
    });
  }
  animateSs() {
    let i = 0;
    let scroll = true;
    let interval;
    //Declaration of the start interval function
    const startInterval = () => {
      //Use a Timer method to switch picture
      interval = setInterval(() => {
        //Déclar the current and next picture
        let currentPicture = this.images[i];
        let nextPicture = this.images[i + 1];
        //If image isn't the last one
        if (i < this.nb_images - 1) {
          //swap picture with an imation
          currentPicture.style.transition = "opacity 0.5s";
          currentPicture.style.opacity = 0; //Hide current Picture
          nextPicture.style.transition = "opacity 0.5s";
          nextPicture.style.transition = `transform ${this.speed / 1000 / 2}s`;
          nextPicture.style.transform = "translateX(-500px)"; //Swipe next Picture
          nextPicture.style.opacity = 1; //Show next Picture
          //at the end of the loop, put back the picture at the right
          setTimeout(() => {
            currentPicture.style.transform = "translateX(0px)";
          }, this.speed);
          i++;
        } else {
          //swap picture
          nextPicture = this.images[0];
          currentPicture.style.transition = "opacity 0.5s";
          currentPicture.style.opacity = 0;
          nextPicture.style.transition = "opacity 0.5s";
          nextPicture.style.transition = `transform ${this.speed / 1000 / 2}s`;
          nextPicture.style.transform = "translateX(-500px)";
          nextPicture.style.opacity = 1;
          setTimeout(() => {
            currentPicture.style.transform = "translateX(0px)";
          }, this.speed);
          i = 0;
        }
      }, this.speed);
      //600ms after the first loop, put the marginLeft on the start image
      setTimeout(() => {
        this.images[0].style.marginLeft = "1000px";
      }, this.speed + 600);
    };
    //call the function
    startInterval();
    //Loop each image to add the stop
    this.images.forEach((image, i) => {
      //Add an  event listener
      image.addEventListener("click", () => {
        //if scroll true, stop interval, else start interval
        if (scroll === true) {
          clearInterval(interval);
        } else {
          startInterval();
        }
        scroll = !scroll;
      });
    });
  }
}
