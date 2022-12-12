const close = document.querySelector('#close');
const messages = document.querySelector('.messageContainer');

close.addEventListener('click',function(){
    messages.style.display = 'none';
})
