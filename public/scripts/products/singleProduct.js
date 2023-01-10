const open = document.querySelector('#open');
const closeReview = document.querySelector('#closeReview');
const reviewForm = document.querySelector('.reviewContainer');

//custom review popup
open?.addEventListener('click',function(){
    reviewForm.classList.add('open');
})

closeReview?.addEventListener('click',function(){
    reviewForm.classList.remove('open');
})


// handle review star
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

