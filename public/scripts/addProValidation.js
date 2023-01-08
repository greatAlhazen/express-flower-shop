//form inputs
const title = document.querySelector('#title');
let validateTitle = false;
const desc = document.querySelector('#desc');
let validateDesc = false;
const price = document.querySelector('#price');
let validatePrice = false;

//product title client side validation
title.addEventListener('keyup',function(){
    let titleError = document.querySelector('#titleError');
    if (title.value.length == 0){
        titleError.innerHTML = 'Title is required';
        titleError.style.color = 'var(--main-color)'
    }else if(!(title.value.match('^[A-Za-z0-9]{4,16}$'))){
        titleError.innerHTML = 'Title character between 4 and 16';
        titleError.style.color = 'var(--main-color)'
    }else{
        titleError.innerHTML = 'valid';
        titleError.style.color = 'var(--secondary-color)';
        validateTitle = true;
    }

});

//product description client side validation
desc.addEventListener('keyup',function(){
    let descError = document.querySelector('#descError');
    console.log(descError);
    if(desc.value.length == 0){
        descError.innerHTML = 'Description is required';
        descError.style.color = 'var(--main-color)'
    }else if(!(desc.value.length > 10 && desc.value.length < 160)){
        descError.innerHTML = 'Description Character Between 10 and 300';
        descError.style.color = 'var(--main-color)'
    }else{
        descError.innerHTML = 'valid';
        descError.style.color = 'var(--secondary-color)';
        validateDesc = true;
    }

});

//product price client side validation
price.addEventListener('keyup',function(){
    let priceError = document.querySelector('#priceError');
    console.log(descError)
    if(price.value.length == 0){
        priceError.innerHTML = 'Price is required';
        descError.style.color = 'var(--main-color)'
    }else if(!(price.value.match('^[0-9]{1,8}$'))){
        priceError.innerHTML = 'Price Character Between 1 and 8';
        priceError.style.color = 'var(--main-color)'
    }else{
        priceError.innerHTML = 'valid';
        priceError.style.color = 'var(--secondary-color)';
        validatePrice = true;
    }

});

//before submit
const validateForm = () =>{
    if(!validateTitle || !validateDesc || !validatePrice ){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}
