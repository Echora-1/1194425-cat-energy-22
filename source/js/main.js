'use strict'
/* global noUiSlider:readonly */
const START_WIDTH =  50;
const headerContainer= document.querySelector('.page-header__container');
const menu = document.querySelector('.main-nav');
const menuOpenButton = document.querySelector('.menu-opener');
const menuWrapper = document.querySelector('.main-nav__wrapper');
const buttonBefore = document.querySelector('#before');
const buttonAfter = document.querySelector('#after');
const sliderImage = document.querySelector('.example__image-wrapper');
const slider = document.querySelector('#slider');
let currentWidth = START_WIDTH;

// Menu

const jsWork = () => {
  menuOpenButton.classList.remove('menu-opener--no-js');
  menuWrapper.classList.remove('main-nav__wrapper--no-js');
  menu.classList.remove('main-nav--no-js');
  menuWrapper.classList.add('main-nav__wrapper--hidden');
  menu.classList.add('main-nav--hidden');
  headerContainer.classList.add('page-header__container--hidden');
}

jsWork();

setTimeout(() => {
  if(menuWrapper.classList.contains('main-nav__wrapper--hidden')) {
    menuWrapper.classList.remove('main-nav__wrapper--hidden');
  }
  if(menu.classList.contains('main-nav--hidden')) {
    menu.classList.remove('main-nav--hidden');
  }
  if(headerContainer.classList.contains('page-header__container--hidden')) {
    headerContainer.classList.remove('page-header__container--hidden');
  }
}, 0)

const handleMenuOpening = () => {
  menuOpenButton.classList.toggle('menu-opener--active');
  menuWrapper.classList.toggle('main-nav__wrapper--open');
  menu.classList.toggle('main-nav--open');
  headerContainer.classList.toggle('page-header__container--open')
};

if(menuOpenButton) {
  menuOpenButton.addEventListener('click', handleMenuOpening)
}

// Map

function initMap() {
  const map = new google.maps.Map(document.querySelector('#map'), {
    center: new google.maps.LatLng(59.9387165, 30.3208587),
    zoom: window.matchMedia('(max-width: 1439px)').matches ? 15 : 16,
    disableDefaultUI: true,
  });

  const marker = new google.maps.Marker({
    position: new google.maps.LatLng(59.9384319, 30.3227009),
    map: map,
    icon: {
      url: `${window.matchMedia('(max-width: 767px)').matches ? './img/map-pin' : './img/map-pin_tablet' }${window.devicePixelRatio > 1 ? '@2x.png' : '.png'}`,
      scaledSize: window.matchMedia('(max-width: 767px)').matches ? new google.maps.Size(57, 53) : new google.maps.Size(113, 106)
    }
  });
}


// Slider
if(sliderImage) {
  sliderImage.style.widt = START_WIDTH;


const handleAfterPressed = () => {
  if(currentWidth > 0) {
    currentWidth -= 1;
    slider.noUiSlider.set(currentWidth.toFixed(2));
    sliderImage.style.width = `${currentWidth}%`;
  }
}

const handleBeforePressed = () => {
  if(currentWidth < 100) {
    currentWidth += 1;
    slider.noUiSlider.set(currentWidth.toFixed(2));
    sliderImage.style.width = `${currentWidth}%`;
  }
}

buttonAfter.addEventListener('click', handleAfterPressed)
buttonBefore.addEventListener('click', handleBeforePressed)

noUiSlider.create(slider, {
  range: {
      min: 0,
      max: 100,
  },
  start: 50,
  step: 1,
  connect: 'lower',
});

slider.noUiSlider.on('update', (_, handle, unencoded) => {
  currentWidth = unencoded[handle];
  sliderImage.style.width =`${currentWidth}%`;
});

}
