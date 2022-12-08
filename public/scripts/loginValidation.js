
const username = document.querySelector('#username');
let validateName;
const password = document.querySelector('#password');
let validatePassword;
const submitButton = document.querySelector('#submitButton')

username.addEventListener('keyup',function(){
    let nameError = document.querySelector('#nameError');
    if (username.value.length == 0){
        nameError.innerHTML = 'username is required';
        validateName = false;
        nameError.style.color = 'var(--main-color)'
    }else if(!(username.value.match('^[A-Za-z0-9]{2,18}$'))){
        nameError.innerHTML = 'username character between 2 and 18';
        validateName = false;
        nameError.style.color = 'var(--main-color)'
    }else{
        nameError.innerHTML = 'valid';
        nameError.style.color = 'var(--secondary-color)';
        validateName = true;
    }

});



password.addEventListener('keyup',function(){
    let passwordError = document.querySelector('#passwordError');
    if (password.value.length == 0){
        passwordError.innerHTML = 'password is required';
        validatePassword = false;
        passwordError.style.color = 'var(--main-color)'
    }else if(!(password.value.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@[-`{-~]).{6,64}$'))){
        passwordError.innerHTML = 'password should be 6-20 characters and include 1 letter,1 number and 1 special character';
        validatePassword = false;
        passwordError.style.color = 'var(--main-color)'
    }else{
        passwordError.innerHTML = 'valid';
        passwordError.style.color = 'var(--secondary-color)';
        validatePassword = true;
    }
});



const validateForm = () =>{
    if(!validateName || !validatePassword ){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}
