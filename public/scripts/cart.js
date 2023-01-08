//if input click will hidden button click
const inputs = document.querySelectorAll('#quantity');


inputs.forEach(item =>{
    console.log(item)
    item.addEventListener('change',function(){
        item.nextElementSibling.nextElementSibling.click();
    })
})