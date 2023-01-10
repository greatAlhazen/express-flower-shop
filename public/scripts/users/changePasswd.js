//form inputs
const oldPassword = document.querySelector('#oldPassword');
let validateOld = false;
const password = document.querySelector('#password');
let validatePassword = false;
const submitButton = document.querySelector('#submitButton')

//old password client side validation
oldPassword.addEventListener('keyup',function(){
    let oldError = document.querySelector('#oldError');
    if (oldPassword.value.length == 0){
        oldError.innerHTML = 'username is required';
        oldError.style.color = 'var(--main-color)'
    }else{
        oldError.innerHTML = 'valid';
        oldError.style.color = 'var(--secondary-color)';
        validateOld = true;
    }

});

//new password client side validation
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



//before submit
const validateForm = () =>{
    if(!validateOld || !validatePassword ){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}