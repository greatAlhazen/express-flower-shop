
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
