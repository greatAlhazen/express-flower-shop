const category = document.querySelectorAll('.category');

//category animation mouseover
category.forEach((item) =>{
    item.addEventListener('mouseover',function(){
        if(item.classList.contains('category-1')){
            item.firstElementChild.src = '/images/annuals/marigoldCat.jpg';
        }else if(item.classList.contains('category-2')){
            item.firstElementChild.src = '/images/biennials/hollyhockCat.jpg';
        }else{
            item.firstElementChild.src = '/images/perennials/lavenderCat.jpg';
        }
    })
});

//category animation mouseout
category.forEach((item) =>{
    item.addEventListener('mouseout',function(){
        if(item.classList.contains('category-1')){
            item.firstElementChild.src = '/images/annuals/dahliaCat.jpg';
        }else if(item.classList.contains('category-2')){
            item.firstElementChild.src = '/images/biennials/foxglovCat.jpg';
        }else{
            item.firstElementChild.src = '/images/perennials/asterCat.jpg';
        }
    })
})