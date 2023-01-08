const close = document.querySelector('#close');
const messages = document.querySelector('.messageContainer');

//close messages if user click close button
close?.addEventListener('click',function(){
    messages.style.display = 'none';
})
