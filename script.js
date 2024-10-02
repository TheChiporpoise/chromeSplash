function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0,0,0);
    frameRate(60);
}

var center = {
    "x" : Math.round(window.innerWidth / 2),
    "y" : Math.round(window.innerHeight / 2)
}

// rgb values
var r = 255, g = 0, b = 0;

// polygon variables
var ns = 3, nsStore, rot = 0, rotDir = 1, dirStore, paused = false, pausedStore, mode = 0, modeStore;

// removes screen ghosts
function refresh() {
    background(0,0,0,500)
}

var A = 60, circR = Math.round(Math.min(window.innerHeight,window.innerWidth) / 3), inR = Math.round(circR / 2);
function nS() {
    refresh()
    document.getElementById("ns").innerHTML = ns;
    A = (180 * (ns - 2)) / ns;
    inR = (circR * sin(A / 2));
    nsStore = ns;
}

function dir() {
    document.getElementById("rotDir").innerHTML = ((0 < rotDir) ? "\u21ba" : "\u21bb");
    dirStore = rotDir;
}

function pause() {
    document.getElementById("pause").innerHTML = ((paused) ? "\u25b6" : "❚❚");
}

// Not such a great idea if there's a search bar we need to be able to type in lol
// function keyPressed() {
//     document.getElementById("rgb").innerHTML = key;
//     if (key === '=') {
//         ns += ((ns < 30) ? 1 : 0)
//     }
//     if (key === '-') {
//         ns -= ((ns > 2) ? 1 : 0)
//     }

//     if (key === ' ') {
//         paused = !paused;
//     }

//     if (key === "Backspace") {
//         background(0,0,0,500);
//     }
// }

var splashText = "_"

function updateText() {
    if (splashText[0] == "_") {
        splashText = "W_"
    } else if (splashText.length == 2) {
        splashText = "We_"
    } else if (splashText.length == 3) {
        splashText = "Wel_"
    } else if (splashText.length == 4) {
        splashText = "Welc_"
    } else if (splashText.length == 5) {
        splashText = "Welco_"
    } else if (splashText.length == 6) {
        splashText = "Welcom_"
    } else {
        splashText = "Welcome"
    }
    document.getElementById("welcomeText").innerHTML = splashText;
}

function draw() {
    if (frameCount < 56) {
        if (frameCount % 5 == 0 && frameCount > 20) {
            updateText();
        }
    }

    if (mode) {
        background(0,0,0,10); // more trail
        strokeWeight(2)
    } else {
        background(0,0,0,25); // increase to reduce screen burn
        strokeWeight(1)
    }

    if (r > 0 && r <= 255 && b == 0) {
        (g < 255) ? g += 5 : r -= 5;
    } else if (g > 0 && g <= 255) {
        (b < 255) ? b += 5 : g -= 5;
    } else if (b > 0 && b <= 255) {
        (r < 255) ? r += 5 : b -= 5;
    }
    // document.getElementById("rgb").innerHTML = splashText.length - 1;

    if (ns != nsStore) {
        nS();
    }

    if (rotDir != dirStore) {
        dir();
    }

    if (paused != pausedStore) {
        pause();
    }
    
    if (mode != modeStore) {
        refresh();
        // document.getElementById("mode").innerHTML = mode;
        modeStore = mode;
    }

    if (paused) {
    } else if (rot < 180 - A) {
        (0 < rotDir) ? rot += 0.5 : rot -= 0.5;
    } else {
        rot = 0;
    }

    stroke(r,g,b);

    // point(center.x,center.y) // screen center test

    const intAng = 360 / ns;

    for (var shapeNum = 0; shapeNum <= ns; shapeNum++) {
        for (var s = 0; s < ns; s++) {
            if (mode) {
                point(
                    circR * cos(radians(rot + (intAng * (s + shapeNum)))) + center.x,
                    circR * sin(radians(rot + (intAng * shapeNum))) + center.y);
                point(
                    circR * cos(radians(rot + (intAng * (s + shapeNum + 1)))) + center.x,
                    circR * sin(radians(rot + (intAng * (shapeNum + 1)))) + center.y
                );
            } else {
                line(
                    circR * cos(radians(rot + (intAng * (s + shapeNum)))) + center.x,
                    circR * sin(radians(rot + (intAng * shapeNum))) + center.y,
                    circR * cos(radians(rot + (intAng * (s + shapeNum + 1)))) + center.x,
                    circR * sin(radians(rot + (intAng * (shapeNum + 1)))) + center.y,
                );
            }
        }
    }
}