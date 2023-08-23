import aboutStyle from "../style/SCSS/about.scss";
import mainHeadingStyle from "../style/SCSS/main-heading.scss";
import trendingMusicStyle from "../style/SCSS/trending-music.scss";
import "../style/SCSS/main/main.scss";
import "../scripts/process-header-footer.js";

import "../views/landing-page-views/main-heading.js";
import  "../views/landing-page-views/about.js";
import "../views/landing-page-views/trending-music.js";

const processMainHeading = () => {
    let mainHeading = document.querySelector("main-heading");
    mainHeading.currentStyle = mainHeadingStyle;
    mainHeading.render();
}

const processAboutWebsite = () => {
    let aboutWebsite = document.querySelector("about-website");
    aboutWebsite.currentStyle = aboutStyle;
    aboutWebsite.render();
}

const processTrendingMusic = () => {
    let trendingMusic = document.querySelector("trending-music");
    trendingMusic.currentStyle = trendingMusicStyle;
    trendingMusic.startProcessData();
}

processMainHeading();
processAboutWebsite();
processTrendingMusic();