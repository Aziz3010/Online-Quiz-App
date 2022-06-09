const loginForm = document.querySelector('.loginForm');
const messageBox = document.querySelector('.message');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let userData;
let tokens;

// check localStorage
if(localStorage.getItem('userData')) {
    userData = JSON.parse(localStorage.getItem('userData'))
} else {
    userData = [];
}

// check localStorage
if(localStorage.getItem('tokens')) {
    tokens = localStorage.getItem('tokens');
} else {
    tokens = '';
}

// submit registration form
loginForm.addEventListener('submit', function(e){
    e.preventDefault();

    let userExist = compareData();

    if(userExist) {
        messageBox.innerHTML = `<p class="alert alert-primary p-0 px-1 text-center text-capitalize">successful login</p>`;
        setTimeout(()=>{window.location.replace('./quiz.html')},500)
    } else {
        messageBox.innerHTML = `<p class="alert alert-danger p-0 px-1 text-center text-capitalize">Something Wrong</p>`;
        setTimeout(()=>{window.location.reload()},300)
    }
})

// compare form data with local storage data
function compareData() {
    for (let i = 0; i < userData.length; i++) {
        if(emailInput.value === userData[i].email && passwordInput.value === userData[i].password && userData[i].token === tokens ) {
            return true;
        }
    }
}