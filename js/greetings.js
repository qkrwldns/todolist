const loginForm = document.getElementById("login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDENNAME = "hidden"; // str만 포함된 변수는 대문자 표기하고 str 저장하고 싶을때 사용
const USERNAME_KEY = "username";

// Declare and retrieve the value from localStorage
const savedUserName = localStorage.getItem(USERNAME_KEY);

function submitLoginForm(event) {
    event.preventDefault(); // 새로고침 막음
    loginForm.classList.add(HIDDENNAME);
    
    // Update localStorage with the new value
    localStorage.setItem(USERNAME_KEY, loginInput.value);

    // Call paintGreething with the updated value
    paintGreething();
}

function paintGreething() {
    // Access the updated value from localStorage
    const savedUserName = localStorage.getItem(USERNAME_KEY);
    greeting.innerText = `Hello ${savedUserName}`;
    greeting.classList.remove(HIDDENNAME);
}

if (savedUserName === null) {
    loginForm.classList.remove(HIDDENNAME);
    loginForm.addEventListener("submit", submitLoginForm);
} else {
    // Call paintGreething with the retrieved value
    paintGreething();
}
