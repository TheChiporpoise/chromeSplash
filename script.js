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

// Makes text type out when page is opened. Looks metal as freak, definitely need to try to condense/speed this up later
var welcomeText = "_";
var searchText = "_"
var mailText = "_";
var imagesText = "_";
function updateText() {
    if (welcomeText[0] == "_") {
        welcomeText = "W_";
    } else if (welcomeText.length < 3) {
        welcomeText = "We_";
    } else if (welcomeText.length < 4) {
        welcomeText = "Wel_";
    } else if (welcomeText.length < 5) {
        welcomeText = "Welc_";
    } else if (welcomeText.length < 6) {
        welcomeText = "Welco_";
    } else if (welcomeText.length < 7) {
        welcomeText = "Welcom_";
    } else if (welcomeText[6] == "_"){
        welcomeText = "Welcome";
    } else {
        if (searchText[0] == "_") {
            searchText = "S_"
        } else if (searchText.length < 3) {
            searchText = "Se_"
        } else if (searchText.length < 4) {
            searchText = "Sea_"
        } else if (searchText.length < 5) {
            searchText = "Sear_"
        } else if (searchText.length < 6) {
            searchText = "Searc_"
        } else if (searchText.length < 7) {
            searchText = "Search_"
        } else if (searchText.length < 8) {
            searchText = "Search _"
        } else if (searchText.length < 9) {
            searchText = "Search G_"
        } else if (searchText.length < 10) {
            searchText = "Search Go_"
        } else if (searchText.length < 11) {
            searchText = "Search Goo_"
        } else if (searchText.length < 12) {
            searchText = "Search Goog_"
        } else if (searchText.length < 13) {
            searchText = "Search Googl_"
        } else if (searchText[12] == "_") {
            searchText = "Search Google"
        } else {
            if (mailText[0] == "_") {
                mailText = "G_";
            } else if (mailText.length < 3) {
                mailText = "Gm_";
            } else if (mailText.length < 4) {
                mailText = "Gma_";
            } else if (mailText.length < 5) {
                mailText = "Gmai_";
            } else if (mailText[4] == "_") {
                mailText = "Gmail";
            } else {
                if (imagesText[0] == "_") {
                    imagesText = "I_";
                } else if (imagesText.length < 3) {
                    imagesText = "Im_";
                } else if (imagesText.length < 4) {
                    imagesText = "Ima_";
                } else if (imagesText.length < 5) {
                    imagesText = "Imag_";
                } else if (imagesText.length < 6) {
                    imagesText = "Image_";
                } else {
                    imagesText = "Images";
                }
            }
        }
    }
    document.getElementById("welcomeText").innerHTML = welcomeText;
    document.getElementById("searchBox").placeholder = searchText;
    document.getElementById("mailText").innerHTML = mailText;
    document.getElementById("imagesText").innerHTML = imagesText;
}

function draw() {
    // initial if makes the check faster... I think
    if (frameCount < 200) {
        if (frameCount % 4 == 0 && frameCount > 15) {
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
                // add 6 or 11 to "s + shapeNum" in the first point for interesting results
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