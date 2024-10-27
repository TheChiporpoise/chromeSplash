function updateItem(inputId=String,key=String) {
    var input = document.getElementById(inputId).value;
    localStorage.setItem(key,input)
}

function update() {
    document.getElementById("settings_ns").innerHTML = localStorage.getItem("sideCount");
    document.getElementById("settings_dir").innerHTML = localStorage.getItem("rotationDirection");
    document.getElementById("settings_paused").innerHTML = localStorage.getItem("paused") == 1 ? true : false;
    document.getElementById("settings_mode").innerHTML = localStorage.getItem("mode");
    document.getElementById("settings_welcome").innerHTML = localStorage.getItem("welcomeText");



}