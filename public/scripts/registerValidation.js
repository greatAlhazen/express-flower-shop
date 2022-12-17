
const username = document.querySelector('#username');
let validateName = false;
const email = document.querySelector('#email');
let validateEmail = false;
const password = document.querySelector('#password');
let validatePassword=false;
const againPassword = document.querySelector('#againPassword');
let validateAgain = false;
const submitButton = document.querySelector('#submitButton')

username.addEventListener('keyup',function(){
    let nameError = document.querySelector('#nameError');
    if (username.value.length == 0){
        nameError.innerHTML = 'username is required';
        nameError.style.color = 'var(--main-color)'
    }else if(!(username.value.match('^[A-Za-z0-9]{2,18}$'))){
        nameError.innerHTML = 'username character between 2 and 18';
        nameError.style.color = 'var(--main-color)'
    }else{
        nameError.innerHTML = 'valid';
        nameError.style.color = 'var(--secondary-color)';
        validateName = true;
    }

});

email.addEventListener('keyup',function(){
    let emailError = document.querySelector('#emailError');
    console.log(emailError)
    if(email.value.length == 0){
        emailError.innerHTML = 'email is required';
        emailError.style.color = 'var(--main-color)'
    }else if(!(email.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))){
        emailError.innerHTML = 'email is not valid';
        emailError.style.color = 'var(--main-color)'
    }else{
        emailError.innerHTML = 'valid';
        emailError.style.color = 'var(--secondary-color)';
        validateEmail = true;
    }

});


password.addEventListener('keyup',function(){
    let passwordError = document.querySelector('#passwordError');
    if (password.value.length == 0){
        passwordError.innerHTML = 'password is required';
        passwordError.style.color = 'var(--main-color)'
    }else if(!(password.value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$'))){
        passwordError.innerHTML = 'password should be 6-20 characters and include 1 letter,1 number and 1 special character';
        passwordError.style.color = 'var(--main-color)'
    }else{
        passwordError.innerHTML = 'valid';
        passwordError.style.color = 'var(--secondary-color)';
        validatePassword = true;
    }
});

againPassword.addEventListener('keyup',function(){
    let againError = document.querySelector('#againError');
    console.log(password.value);
    if (againPassword.value.length == 0){
        againError.innerHTML = 'password is required';
        againError.style.color = 'var(--main-color)'
    }else if(!(againPassword.value.match(password.value))){
        againError.innerHTML = 'password does not match';
        againError.style.color = 'var(--main-color)'
    }else{
        againError.innerHTML = 'valid';
        againError.style.color = 'var(--secondary-color)';
        validateAgain = true;
    }
});


const validateForm = () =>{
    if(!validateName || !validateEmail || !validatePassword || !validateAgain){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}
