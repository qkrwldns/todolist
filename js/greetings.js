const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDENNAME = "hidden"; //str만 포함된 변수는 대문자 표기하고 str저장하고 싶을때 사용
const USERNAME_KEY = "username";

function submitLoginForm(event) {
    event.preventDefault(); // 새로고침막음
    loginForm.classList.toggle(HIDDENNAME);
    localStorage.setItem(USERNAME_KEY,loginInput.value);
    paintGreething();
}

function paintGreething() {
    const username = savedUserName;
    greeting.innerText = `Hello ${username}`;
    greeting.classList.toggle(HIDDENNAME);
}

const savedUserName = localStorage.getItem(USERNAME_KEY);

if (savedUserName === null) {
    loginForm.classList.remove(HIDDENNAME);
    loginForm.addEventListener("submit", submitLoginForm);
} else {
    paintGreething();
}
