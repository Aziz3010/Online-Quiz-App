const registrationForm = document.querySelector('.registrationForm');
const messageBox = document.querySelector('.message');
const inputs = document.querySelectorAll('.form-control');
let userData;
let tokens;
let errors = [];

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
registrationForm.addEventListener('submit', function(e){
    e.preventDefault();
    let user = { f_name : '', l_name : '', email : '', phone : '', password : '', repeat_password : '', token: '' };

    // get inputs value and validate it then create user obj
    inputs.forEach((input) => {
        inputsValidation(input);
        if(errors.length == 0) {
            user = { ...user , [input.name]: input.value }
        } else {
            if(errors[input.name]) {
                messageBox.innerHTML += `<p class="alert alert-danger p-0 px-1 text-center text-capitalize">${errors[input.name]}</p>`;
            }
        }
    });

    if(errors.length == 0) {
        user = { ...user, token: randomToken() }
        userData.push(user);
        localStorage.setItem('tokens',JSON.stringify(user.token));
        localStorage.setItem('userData', JSON.stringify(userData));
        messageBox.innerHTML = `<p class="alert alert-primary p-0 px-1 text-center text-capitalize">successful register</p>`;
        setTimeout(()=>{window.location.replace('./index.html')},2000)
    } else {
        setTimeout(()=>{window.location.reload()},5000)
    }
})

// generate token
function randomToken() {
    let randomNumber = Math.floor( Math.random() * 100000 );
    const letter = ['a','b','c','d','e','f','g','i','j','k','h','m','l','n','o','p','q','r','s','t','w','u','x','y','z'];
    let randomLetter1 = letter[Math.floor( Math.random() * (letter.length-1) )];
    let randomLetter2 = letter[Math.floor( Math.random() * (letter.length-1) )];
    let randomLetter3 = letter[Math.floor( Math.random() * (letter.length-1) )];
    let theToken = randomNumber+5341*randomNumber+65413/2+2150*8+randomLetter1+randomLetter2+randomLetter3+randomLetter2
    return theToken;
}

// validation
function inputsValidation(input) {
    if(input.name == 'f_name') {
        if (input.value.length < 3) {
            errors = {...errors, [input.name]: 'First Name should be more than 3 letters.'};
        }
    }
    else if (input.name == 'l_name') {
        if (input.value.length < 3) {
            errors = {...errors, [input.name]: 'Last Name should be more than 3 letters.'};
        }
    }
    else if (input.name == 'email') {
        if (!input.value.includes('@')) {
            errors = {...errors, [input.name]: 'Please use correct Email.'};
        }
    }
    else if (input.name == 'phone') {
        if (input.value.length !== 11) {
            errors = {...errors, [input.name]: 'Please use correct phone number.'};
        }
    }
    else if (input.name == 'password') {
        if (input.value.length < 4) {
            errors = {...errors, [input.name]: 'Password should be more than 4 letters'};
        }
    }
    else if (input.name == 'repeat_password') {
        let pass = document.getElementsByName('repeat_password');
        if (input.value !==  pass[0].value) {
            errors = {...errors, [input.name]: "Password didn't match"};
        }
    }
}