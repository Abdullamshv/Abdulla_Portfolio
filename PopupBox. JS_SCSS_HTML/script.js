let popup = document.querySelector(".popup")
let submitBtn = document.querySelector(".submit-btn")
let okBtn = document.querySelector(".ok-btn")

function openpop() {
    popup.classList.add("open-popup")
    submitBtn.style.display = "none"
}

function closepop() {
    popup.classList.remove("open-popup")
    submitBtn.style.display = "block"
}