const eyeIcons = document.querySelectorAll('.formContainerBox .fas');

//show password handle
eyeIcons.forEach((item) =>{
    item.addEventListener('click',function(){
        if(item.classList.contains('fa-eye')){
            let inputElement = item.previousElementSibling.previousElementSibling
            inputElement.type = 'password';
            item.style.display = 'none';
            item.previousElementSibling.style.display = 'block';
        }else{
            let inputElement = item.previousElementSibling;
            inputElement.type = 'text';
            item.style.display = 'none';
            item.nextElementSibling.style.display = 'block';
        }
    })
})