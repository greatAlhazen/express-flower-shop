//form inputs
const username = document.querySelector('#username');
let validateName = false;
const email = document.querySelector('#email');
let validateEmail = false;
const submitButton = document.querySelector('#submitButton')


//username client side validation
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

//email client side validation
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

//before submit
const validateForm = () =>{
    if(!validateName || !validateEmail || !validatePassword || !validateAgain){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}

