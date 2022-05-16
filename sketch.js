let keypressed = false;
let ids = [], buttonsList = [];

function preload() {

}

function setup() {
    createCanvas(240*5, 180*5);
}

function draw() {
    background(0);
    textSize(50);
    fill("red");
    text("TODO", 240, 70);
    fill("yellow");
    text("DOING", 480, 70);
    fill("lime");
    text("DONE", 720, 70);

    if(keypressed === false) {
        fill("white");
        text("Press space for help!", 240, 180*2);
    }
}

function newbutton(text,ids) {
    //create button
    ids.push(ids.length);
    button = createButton(text + " (id: " + ids[ids.length-1] + ")");
    buttonsList.push(button);
    button.position(240, (buttonsList.indexOf(button)*100)+100);
    button.size(150, 100);
    button.class('button_todo');
    button.mousePressed(move);
    //change buttons color to random one
    let r = random(255);
    let g = random(255);
    let b = random(255);
    button.style('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
    //change buttons text color to random one
    let r2 = 255;
    let g2 = 255;
    let b2 = 255;
    button.style('color', 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')');
}

function move(selectedbutton) {
    let pos = prompt("What is the position you want to move the button? (1 - todo; 2 - doing; 3 - done");
    selectedbutton.position(pos*240, (buttonsList.indexOf(selectedbutton)*100)+100);
}

function keyPressed() {
    if (keyCode === 32) {
        keypressed = true;
        let help=window.open("help.html","_blank");
        if(help.closed) {
            alert("You need to allow pop-ups to continue. (i am not going to spam it)");
            alert("Press space again when you are done");
            keypressed = false;
        }

    }
    if (keyCode === ENTER) {
        newbutton(prompt("What will be your button text?","string"),ids);
    } else if(keyCode === DELETE) {
        let id = prompt("What is the id of the button you want to delete?");
        let selectedbutton = buttonsList[id];
        selectedbutton.remove();
        buttonsList.splice(id,1);
        updateIds(ids);
    } else if(keyCode === LEFT_ARROW) {
        let id = prompt("What is the id of the button you want to move?");
        let selectedbutton = buttonsList[id];
        move(selectedbutton);
    }
}

function updateIds(ids) {
    for(let i = 0; i < ids.length; i++) {
        buttonsList[i].position(100, i*100+100);
        //update text on buttons
        buttonsList[i].html(buttonsList[i].html().substring(0,buttonsList[i].html().length-7) + " (id: " + ids[i] + ")");
    }
}