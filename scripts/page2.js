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
if (localStorage.getItem("test_text")) {
    text = localStorage.getItem("test_text");
} else {
    text = "Placeholder";
    localStorage.setItem("test_text", text);
}

var welcomeText = "_", wText_Store = textList_format(text);

function updateText() {
    welcomeText = wText_Store[welcomeText.length - 1];
    document.getElementById("test_output").innerHTML = welcomeText;
}

console.log(wText_Store);
// console.log(wText_Store.length * 4);
function draw() {
    if (frameCount < 15 + (wText_Store.length * 4)) {
        if (frameCount % 4 == 0 && frameCount > 15) {
            updateText();
        }
    }
}