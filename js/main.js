//menu responsive

const iconoMenu = document.querySelector(".menuHome");
const menu = document.querySelector("#menu");

iconoMenu.onclick = (e) => {
    menu.classList.toggle("active");
    document.body.classList.toggle("opacity");
};
