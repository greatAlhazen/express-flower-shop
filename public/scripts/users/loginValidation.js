//form inputs
const username = document.querySelector('#username');
let validateName = false;
const password = document.querySelector('#password');
let validatePassword = false;
const submitButton = document.querySelector('#submitButton')

//username client side validation
username.addEventListener('keyup',function(){
    let nameError = document.querySelector('#nameError');
    if (username.value.length == 0){
        nameError.innerHTML = 'username is required';
        nameError.style.color = 'var(--main-color)'
    }else{
        nameError.innerHTML = 'valid';
        nameError.style.color = 'var(--secondary-color)';
        validateName = true;
    }

});


//password client side validation
password.addEventListener('keyup',function(){
    let passwordError = document.querySelector('#passwordError');
    if (password.value.length == 0){
        passwordError.innerHTML = 'password is required';
        passwordError.style.color = 'var(--main-color)'
    }else{
        passwordError.innerHTML = 'valid';
        passwordError.style.color = 'var(--secondary-color)';
        validatePassword = true;
    }
});


//before submit
const validateForm = () =>{
    if(!validateName || !validatePassword ){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}
