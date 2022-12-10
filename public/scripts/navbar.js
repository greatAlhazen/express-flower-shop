const menu = document.querySelector('#menu');
const allLinks = document.querySelectorAll('#links');
const navLinks = document.querySelector('.navList');

menu.addEventListener('click',function(){
    menu.classList.toggle('fa-times');
    navLinks.classList.toggle('active');
});

const activateLink = (value) =>{
    allLinks.forEach((item) =>{
        item.classList.remove('active');
        value.classList.add('active');
    })
}

allLinks.forEach((item) =>{
    item.addEventListener('click',function(){
        activateLink(item)
    })
});


const userProfile = document.querySelector('#userImage');
const userInfo = document.querySelector('.userInfo');

userProfile.addEventListener('click',() =>{
    userInfo.classList.toggle('active');
})