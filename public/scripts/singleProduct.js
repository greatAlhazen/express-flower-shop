const stars = document.querySelectorAll('.reviewRating i');
const inputValue = document.querySelector('.reviewRating input');

stars.forEach((item,index) =>{
    item.addEventListener('click',function(){

        inputValue.value = index +1;

        console.log(inputValue.value);

        stars.forEach(i =>{
            i.classList.replace('fa-solid','fa-regular');
        })
        for(let i=0; i< stars.length; i++){
            if(i <= index){
                stars[i].classList.replace('fa-regular','fa-solid');
            }
        }
    })
});

const open = document.querySelector('#open');
const close = document.querySelector('#close');
const reviewForm = document.querySelector('.reviewContainer');

open.onclick = () =>{
    reviewForm.classList.add('open');
}

close.onclick = () =>{
    reviewForm.classList.remove('open');
}