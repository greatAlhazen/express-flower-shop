const body = document.querySelector('#body');
let validateBody = false;


//review body client side validation
body?.addEventListener('keyup',function(){
    let bodyError = document.querySelector('#bodyError');
    if(body.value.length == 0){
        bodyError.innerHTML = 'Body is required';
        bodyError.style.color = 'var(--main-color)'
    }else if(!(body.value.length > 10 && body.value.length < 160)){
        bodyError.innerHTML = 'Body Character Between 10 and 300';
        bodyError.style.color = 'var(--main-color)'
    }else{
        bodyError.innerHTML = 'valid';
        bodyError.style.color = 'var(--secondary-color)';
        validateBody = true;
    }

});



//before submit
const validateForm = () =>{
    if(!validateBody ){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}
