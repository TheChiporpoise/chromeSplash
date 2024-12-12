function setup() {
    frameRate(60);
}

// for custom welcome message
function textList_format(text) {
    var trimText = text.substring(0,20);
    var raw = trimText.split("");
    var out = [""];
    
    for (i = 0; i < trimText.length; i++) {
        out.push(out[i].replace("_","")+raw[i]+"_");
    }
    out[out.length - 1] = out[out.length - 1].replace("_","");
    out.shift();

    return out;
}

var text;
var welcomeText, wText_Store;
function textSet() {
    if (localStorage.getItem("test_text")) {
        text = localStorage.getItem("test_text");
    } else {
        text = "up to 20 characters";
        localStorage.setItem("test_text", text);
    }
    welcomeText = "_", wText_Store = textList_format(text);
}
textSet();

function updateText() {
    welcomeText = wText_Store[welcomeText.length - 1];
    document.getElementById("test_output").innerHTML = welcomeText;
}

function reset() {
    document.getElementById("test_output").innerHTML = "_";
    document.getElementById("test_input").innerText = "";
}

function draw() {
    if (frameCount < 15) {
        reset();
        textSet();
    }
    if (frameCount < 15 + (wText_Store.length * 4)) {
        if (frameCount % 4 == 0 && frameCount > 15) {
            updateText();
        }
    }
}