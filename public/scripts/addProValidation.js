const title = document.querySelector('#title');
let validateTitle = false;
const desc = document.querySelector('#desc');
let validateDesc = false;


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

desc.addEventListener('keyup',function(){
    let descError = document.querySelector('#descError');
    console.log(descError)
    if(desc.value.length == 0){
        descError.innerHTML = 'Description is required';
        descError.style.color = 'var(--main-color)'
    }else if(!(desc.value.match('^[A-Za-z0-9]{10,160}$'))){
        descError.innerHTML = 'Description Character Between 10 and 160';
        descError.style.color = 'var(--main-color)'
    }else{
        descError.innerHTML = 'valid';
        descError.style.color = 'var(--secondary-color)';
        validateDesc = true;
    }

});


const validateForm = () =>{
    if(!validateTitle || !validateDesc ){
        let commonError = document.querySelector('#commonError');
        commonError.innerHTML = 'please fix all error and fill blank areas before submit';
        setTimeout(function(){commonError.style.display = 'none'},3000)
        return false
    }

    return true
}
