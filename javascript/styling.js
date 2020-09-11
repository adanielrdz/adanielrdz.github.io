var mainContent = document.getElementById("main_content");
var footer = document.getElementById("footer");
var header = document.getElementById("header");


window.onload = function(){
    mainContent.style.minHeight = window.innerHeight - footer.offsetHeight - header.offsetHeight;
};
window.onresize = function(){
    mainContent.style.minHeight = window.innerHeight - footer.offsetHeight - header.offsetHeight;
};