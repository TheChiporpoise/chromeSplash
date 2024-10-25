function updateItem(inputId=String,key=String) {
    var input = document.getElementById(inputId).value;
    localStorage.setItem(key,input)
}


// document.getElementById("settings_ns").innerHTML = ns;