/* 
* Etch-A-Sketch application
*
* Written by Aadam Ali on 31.12.2020
*/


const container = document.querySelector('#container');
const sizeBtn = document.querySelector('#gridsize');
const colorfulBtn = document.querySelector('#colorful');
const blackBtn = document.querySelector('#black');
const darkenBtn = document.querySelector('#darken');
const resetBtn = document.querySelector('#reset');
let type = null

// Initial Loading Size
initialise(16, 'startup')


sizeBtn.addEventListener("click", () => {initialise()});
colorfulBtn.addEventListener("click", () => {type = 'colorful'});
blackBtn.addEventListener("click", () => {type = 'black'});
darkenBtn.addEventListener("click", () => {type = 'darken'});
resetBtn.addEventListener("click", () => {initialise(16, 'startup')});


function initialise(size, status) {
    if (status != 'startup') {
        size = prompt("Enter Grid Size:");
    };
    while (size > 64) {
        size = prompt("Size Exceeds 64, Try Again:")
    };
    container.style.setProperty("--grid-cols", size);
    container.style.setProperty("--grid-rows", size);
    createDivs(size);
    changeColor()
    type = 'colorful';
}


function createDivs(size) {
    container.innerHTML = "";
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement('div');
        div.classList.add('gridDiv');
        container.appendChild(div);
    };
};


function random() {
    let num = Math.floor(Math.random() * 255);
    return num;
};


function randomColor() {
    return 'rgb(' + random() + ',' + random() + ',' + random() + ');';
};

function changeColor() {
    let gridDivs = document.querySelectorAll('.gridDiv');
    gridDivs.forEach(gridDiv => {
        gridDiv.addEventListener("mouseover", function(){
            if (type == "colorful") {
                gridDiv.style.cssText = 'background-color:' + randomColor();
                console.log('colorful')
            } else if (type == "black") {
                gridDiv.style.cssText = 'background-color: black;'
                console.log('black')
            } else if (type == "darken") {
                let style = window.getComputedStyle(gridDiv, "");
                let bgColor = style.getPropertyValue("background-color");
                let colorInts = bgColor.replace(/[^0-9,]/g, '');
                let splitColors = colorInts.split(',');
                for (let i = 0; i < splitColors.length; i++) {
                    splitColors[i] -= 25.5;
                };
                gridDiv.style.cssText = `background-color: rgb(${splitColors.join(',')});`;
                console.log('darken')
            };
        });
    });
}

