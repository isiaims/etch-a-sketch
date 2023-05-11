// Variables
const container = document.querySelector('div.container');
const area = document.querySelector('div.sketch-area');
const select = document.querySelector('select');
const colorPicker = document.querySelector('input[type="color"]');
const clearBtn = document.querySelector('button.clear');
const buttons = document.querySelectorAll('button.ncolor');
const sketch = [];
let isRandom = false;
let isDown = false;
let bgColor = 'black';


// Functions
function populateGrid (size) {
    size = parseFloat(select.value);
    for (let i = 0; i < (size * size); i++) {
        const div = document.createElement('div');
        div.style.width = `${area.offsetWidth / size}px`;
        div.style.height = `${area.offsetWidth / size}px`;
        area.appendChild(div)
        sketch.push(div);
    }
}
populateGrid();

function removeDivs (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function handleGridSize (size) {
    size = this.value;
    removeDivs(area);
    sketch.splice(0, sketch.length);
    populateGrid(size);
    bgColor = 'black';
    isDown = false;
    isRandom = false;
    sketch.forEach(box => box.addEventListener('mouseover', color));
    sketch.forEach(box => box.addEventListener('mousedown', () => {
        isDown = true;
        color();
    }));
    sketch.forEach(box => box.addEventListener('mouseup', () => {
        isDown = false;
    }));

}

function randomClr () {
    return `rgba(${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 256)}, 
    ${Math.floor(Math.random() * 256)},
    ${Math.floor(Math.random() * 100)})`;
}
buttons.forEach(btn => btn.addEventListener('click', function () {
    if (btn.hasAttribute('data-color')) {
        isRandom = false;
        bgColor = btn.dataset.color;
    } else isRandom = true;
}));
function color (e) {
    if (!isDown) return;
    if (isRandom) {
        e.target.style.backgroundColor = randomClr();
    } else e.target.style.backgroundColor = bgColor;
}


// Event Listeners
select.addEventListener('change', handleGridSize);
sketch.forEach(box => box.addEventListener('mouseover', color));
sketch.forEach(box => box.addEventListener('mousedown', () => {
    isDown = true;
    color();
}));
sketch.forEach(box => box.addEventListener('mouseup', () => {
    isDown = false;
}));
colorPicker.addEventListener('change', () => {
    isRandom = false;
    bgColor = colorPicker.value;
});
clearBtn.addEventListener('click', () => {
    sketch.forEach(box => box.style.backgroundColor = 'white')
})