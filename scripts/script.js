function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0,0,0);
    frameRate(60);
}

var center = {
    "x" : Math.round(window.innerWidth / 2),
    "y" : Math.round(window.innerHeight / 2)
}

function parsedItem(id=String) {
    return JSON.parse(localStorage.getItem(id));
}

// rgb values
var r = 255, g = 0, b = 0;


// settings initialization
if (parsedItem("sideCount") == null) {
    localStorage.setItem("sideCount",3)
}
if (parsedItem("rotationDirection") == null) {
    localStorage.setItem("rotationDirection",1)
}
if (parsedItem("paused") == null) {
    localStorage.setItem("paused",false)
}
if (parsedItem("mode") == null) {
    localStorage.setItem("mode",0)
}

// polygon variables
var ns = parsedItem("sideCount"), nsStore;
var rot = 0, rotDir = parsedItem("rotationDirection"), dirStore;
var paused = parsedItem("paused"), pausedStore;
var mode = parsedItem("mode"), modeStore;

// removes screen ghosts
function refresh() {
    background(0,0,0,500)
}

// intAng = 144 for star
var A = 60, intAng = 120, circR = Math.round(Math.min(window.innerHeight,window.innerWidth) / 3), inR = Math.round(circR / 2);
function nS() {
    refresh()
    document.getElementById("ns").innerHTML = ns;

    intAng = 360 / ns;
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
    pausedStore = paused;
}

// Makes text type out and shortcuts appear sequentially when page is opened/realoaded. Looks metal as freak
var welcomeText = "_", wText_Store = ["W_","We_","Wel_","Welc_","Welco_","Welcom_","Welcome"] // 7
// var welcomeText = "_", wText_Store = ["K_","Kn_","Kno_","Knoc_","Knock_","Knock,_","Knock, _","Knock, K_","Knock, Kn_","Knock, Kno_","Knock, Knoc_","Knock, Knock"]; // 12
var searchText = "_", sText_Store = ["S_","Se_","Sea_","Sear_","Searc_","Search_","Search _","Search G_","Search Go_","Search Goo_","Search Goog_","Search Googl_","Search Google"]; // 13
var mailText = "_", mText_Store = ["G_","Gm_","Gma_","Gmai_","Gmail"]; // 5
var docsText = "_", dText_Store = ["D_","Do_","Doc_","Docs"]; // 4
var imagesText = "_", iText_Store = ["I_","Im_","Ima_","Imag_","Image_","Images"]; // 6
var shortNum = 1;
function updateText() {
    if (welcomeText[welcomeText.length - 1] == "_") {
        welcomeText = wText_Store[welcomeText.length - 1];
        document.getElementById("welcomeText").innerHTML = welcomeText;
    } else if (searchText[searchText.length - 1] == "_") {
        searchText = sText_Store[searchText.length - 1];
        document.getElementById("searchBox").placeholder = searchText;
    } else if (mailText[mailText.length - 1] == "_") {
        mailText = mText_Store[mailText.length - 1];
        document.getElementById("mailText").innerHTML = mailText;
    } else if (docsText[docsText.length - 1] == "_") {
        docsText = dText_Store[docsText.length - 1];
        document.getElementById("docsText").innerHTML = docsText;
    }  else /*if (imagesText[imagesText.length - 1] == "_")*/ {
        imagesText = iText_Store[imagesText.length - 1];
        document.getElementById("imagesText").innerHTML = imagesText;
    }

    if (shortNum < 6 && frameCount % 8 == 0) {
        document.getElementById("short" + shortNum).style.opacity = "1";
        document.getElementById("short" + (5 + shortNum)).style.opacity = "1";
        shortNum++;
    }
}

function draw() {
    // initial "if" being separated makes the check faster once the function has finished running... I think
    if (frameCount < 160) {
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

    if (r > 0 && b == 0) {
        (g < 255) ? g += 5 : r -= 5;
    } else if (g > 0 && r == 0) {
        (b < 255) ? b += 5 : g -= 5;
    } else if (b > 0 && g == 0) {
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
        modeStore = mode;
    }
    
    if (paused) {
    } else {
        if (rot < intAng) {
            (0 < rotDir) ? rot += 0.5 : rot -= 0.5;
        } else {
            rot = 0;
        }
    }
    // document.getElementById("test").innerHTML = localStorage.getItem("sideCount");
    
    stroke(r,g,b);

    // point(center.x,center.y) // screen center test

    // shapeNum = 0;
    for (var shapeNum = 0; shapeNum <= ns; shapeNum++) {
        for (var s = 0; s < ns; s++) {
            if (mode) {
                point(
                    circR * cos(radians(rot + (intAng * (shapeNum + s)))) + center.x,
                    circR * sin(radians(rot + (intAng * s))) + center.y);
            } else {
                // add 6 or 11 to "s + shapeNum" in the first point for interesting results
                // multiply the same part (outside the parenthesis) by -1 for even neater results
                line(
                    circR * cos(radians(rot + (intAng * (shapeNum + s)))) + center.x,
                    circR * sin(radians(rot + (intAng * (s)))) + center.y,
                    circR * cos(radians(rot + (intAng * (shapeNum + s + 1)))) + center.x,
                    circR * sin(radians(rot + (intAng * (s + 1)))) + center.y,
                );
            }
        }
    }
    // comment out outer for loop, "rot" if statement, background if statement, and uncomment the next 2 lines and the "s = 0" to use
    // circR -= 1;
    // rot += 0.1;
    
    // background(0,0,0,0);
    // rot += 0.1;
    // point(40 * cos(rot / 10) + 100 * cos(rot * 7 / 10) + 30 * cos(rot / 10) + center.x,40 * sin(rot / 10) + 100 * sin(rot * 7 / 10) + 30 * sin(rot / 10) + center.y);
}

function windowResized() {
    if (window.innerWidth > 1023) {
        resizeCanvas(windowWidth, windowHeight);
        center = {
            "x" : Math.round(window.innerWidth / 2),
            "y" : Math.round(window.innerHeight / 2)
        }
        circR = Math.round(Math.min(window.innerHeight,window.innerWidth) / 3);
        inR = Math.round(circR / 2);
    }
}