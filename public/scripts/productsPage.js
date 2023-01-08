const category = document.querySelector('#category');
const categoryButton = document.querySelector('#categoryButton');
const sort = document.querySelectorAll('.sort');
const sortButton = document.querySelector('#sortButton');
const categoryForm = document.querySelector('.productCategories');
const sortForm = document.querySelector('.sortCategory');

//custom query value
let params = (new URL(document.location)).searchParams;
const queryCat = params.get('category');
const querySort = params.get('sort');
const selectedValue = category.querySelector(`#${queryCat}`);
if(selectedValue){
    selectedValue.selected = true;
}

const selectedRadio = document.querySelector(`#${querySort}`);


if(selectedRadio){
   selectedRadio.checked = true;
}


//send backend if category value changed
category.addEventListener('change',function(){
    categoryButton.click();
});

//send backend if sort value changed
sort.forEach(element => {
    element.addEventListener('change',function(){
        sortButton.click();    
    })
});