//sidebar and navbar elements
const menu = document.querySelector('#adminNavbarMenu');
const sidebar = document.querySelector('.adminSidebar');
const navbar = document.querySelector('.adminNavbarActions');
const logout = document.querySelector('.adminNavbarLogout');

//sidebar animation
menu.onclick = () =>{
    sidebar.classList.toggle('active');
    menu.classList.toggle('fa-times');
}

//window scroll animation
window.addEventListener('scroll',function(){
    if(this.window.scrollY >= 20){
        navbar.classList.add('active')
        logout.classList.add('active');
    }else{
        navbar.classList.remove('active');
        logout.classList.remove('active');
    }
})