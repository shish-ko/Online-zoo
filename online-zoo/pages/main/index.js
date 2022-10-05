import animals from "../../assets/data/animals.js";
import testimonials from "../../assets/data/testimonials.js";
let trackWidth;
const startSliderItems = [];
const nextSliderItems = [];

window.addEventListener('resize', restart);
window.addEventListener('resize', setTestimInputProp);

// pets slider

function fillSliderArr(arr) {
    const i = animals[Math.floor(Math.random() * animals.length)];
    if (startSliderItems.includes(i) || nextSliderItems.includes(i)) {
        fillSliderArr(arr);
    } else {
        arr.push(i);
    }
    if (arr.length < 6) {
        fillSliderArr(arr);
    }
}
function itemsPerSlide() {
    const vpWidth = window.getComputedStyle(document.getElementById('body')).width;
    if (parseInt(vpWidth) >= 1000) {
        return 6;
    } else {
        return 4;
    }
}

fillSliderArr(startSliderItems);
fillSliderArr(nextSliderItems);

const petsTrack = document.querySelector('.pets_track')
function fillPetsSlide(arr) {
    const slide = document.createElement("div");
    slide.classList.add('pets');
    for (let i=0; i<itemsPerSlide(); i++) {
        const petsItem = document.createElement("div");
        petsItem.classList.add('petsItem');
        petsItem.innerHTML = `<div class="petsItemPhotoWrapper">
                    <img src="${arr[i].image}" alt="${arr[i].name}" class="petsItemPhoto">
                </div>                 
                
                <div class="description">
                    <div class="tooltip"> 
                        <div>
                            <p class="name">${arr[i].name}</p>
                            <p class="location">${arr[i].location}</p>
                        </div>
                    </div>
                    <div>
                        <div class="name">${arr[i].name}</div>
                        <div class="location">${arr[i].location}</div>
                    </div>
                    <img src="${arr[i].meal}" alt="diet">
                </div>`;
        slide.append(petsItem);
    }
    petsTrack.append(slide);
}
function restart() {
    while (petsTrack.firstChild) {
        petsTrack.removeChild(petsTrack.firstChild)
    }
    fillPetsSlide(nextSliderItems);
    fillPetsSlide(startSliderItems);
    fillPetsSlide(nextSliderItems);
    trackWidth = document.querySelector('.pets_track').clientWidth;
    petsTrack.style.transform = `translateX(-${trackWidth}px)`;
}
restart();
const petsSlideRight = document.querySelector('.right');
const petsSlideLeft = document.querySelector('.left');
petsSlideRight.addEventListener('click', showRightSlide);
petsSlideLeft.addEventListener('click', showLeftSlide);

function showRightSlide(){
    petsTrack.classList.add('pets_track-move')
    petsTrack.style.transform = `translateX(-${2 * trackWidth}px)`;
    startSliderItems.length = 0;
    startSliderItems.push(...nextSliderItems);
    nextSliderItems.length = 0;
    fillSliderArr(nextSliderItems);
    petsSlideLeft.removeEventListener('click', showLeftSlide);
    petsSlideRight.removeEventListener('click', showRightSlide);
}
function showLeftSlide(){
    petsTrack.classList.add('pets_track-move')
    petsTrack.style.transform = `translateX(0px)`;
    startSliderItems.length = 0;
    startSliderItems.push(...nextSliderItems);
    nextSliderItems.length = 0;
    fillSliderArr(nextSliderItems);
    petsSlideLeft.removeEventListener('click', showLeftSlide);
    petsSlideRight.removeEventListener('click', showRightSlide);
}
petsTrack.addEventListener('transitionend', () => {
    petsTrack.classList.remove('pets_track-move');
    restart();
    petsSlideRight.addEventListener('click', showRightSlide);
    petsSlideLeft.addEventListener('click', showLeftSlide);
})

// testimonials slider
const testimonialsTrack = document.querySelector('.track')
const testinomialsInput = document.querySelector('.styled-slider');
for (let item in testimonials) {
    const sliderItem = document.createElement('div');
    sliderItem.classList.add('sliderItem');
    sliderItem.id = `quote_${item}`;
    sliderItem.innerHTML = ` <div class="SI_head">
    <img src="${testimonials[item].logo}" alt="${testimonials[item].name}">
    <div>
        <div class="SI_name">${testimonials[item].name}</div>
        <span class="SI_location">${testimonials[item].location}</span>
        <span class="SI_lastVisit">${testimonials[item].lastVisit}</span>
    </div>
    
    </div>
    <q>${testimonials[item].quote}</q>`;
    testimonialsTrack.append(sliderItem)
}

testinomialsInput.addEventListener('input', () => {
    if (document.getElementById('body').clientWidth >= 1600) {
        testimonialsTrack.style.transform = `translateX(${-testinomialsInput.value * 297}px)`
    } else {
        testimonialsTrack.style.transform = `translateX(${-testinomialsInput.value * 323}px)`
    }
})

function setTestimInputProp() {
    if (document.getElementById('body').clientWidth < 1600) {
        testinomialsInput.setAttribute('max', 8);
    } else {
        testinomialsInput.setAttribute('max', 7);
    }
}


// testimonials popUp
const testimolialsPopUp=document.querySelector('.testimonials-popUp');
document.querySelectorAll('.sliderItem').forEach(item => item.addEventListener('click', (e) => {
    const i = Number(e.currentTarget.id.replace(/\D/g, ''))
    document.querySelector('.testimonials-popUp__content').innerHTML = `
    <div class="testimonials-popUp__item">
        <div class="SI_head">
            <img src="${testimonials[i].logo}" alt="${testimonials[i].name}">
            <div>
                <div class="SI_name">${testimonials[i].name}</div>
                    <span class="SI_location">${testimonials[i].location}</span>
                    <span class="SI_lastVisit">${testimonials[i].lastVisit}</span>
                </div>
                            
        </div>
        <q class="testimonials-popUp__quote">${testimonials[i].quote}</q>
    </div>`;
    testimolialsPopUp.classList.add('display-block');
    closeLayer.classList.add('burger-menu_active');
}))
testimolialsPopUp.addEventListener('click', ()=>{
    testimolialsPopUp.classList.remove('display-block')
    closeLayer.classList.remove('burger-menu_active');
})

// burger
const burger = document.querySelector('.burger-container');
const closeLayer = document.querySelector('.grey-BG');

burger.addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.add('burger-menu_active');
    closeLayer.classList.add('burger-menu_active')
})

document.querySelector('.burger-menu').addEventListener('click', (e) => {
    if (e.target.id !== 'burger-menu') {
        document.querySelector('.burger-menu').classList.remove('burger-menu_active');
        closeLayer.classList.remove('burger-menu_active');
    }
})
closeLayer.addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.remove('burger-menu_active');
    document.querySelector('.testimonials-popUp').classList.remove('display-block');
    closeLayer.classList.remove('burger-menu_active');
})

// document.getElementById('body').addEventListener('click', (e) => console.log(e))