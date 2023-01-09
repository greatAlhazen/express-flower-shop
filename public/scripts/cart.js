//if input click will hidden button click
const inputs = document.querySelectorAll('#quantity');


inputs.forEach(item =>{
    console.log(item)
    item.addEventListener('change',function(){
        item.nextElementSibling.nextElementSibling.click();
    })
});

//custom link activate
const homeLink = document.querySelector("[href='/home/']");
homeLink.classList.remove('active');