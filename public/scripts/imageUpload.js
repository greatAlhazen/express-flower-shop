
const button = document.querySelector('.imageBtn');
const file = document.querySelector('#file');
const imageArea = document.querySelector('.imageUpload');


button.addEventListener('click',function(){
    file.click();
});

file.addEventListener('change',function(){
    const image = this.files[0];
    const reader = new FileReader();

    reader.onload = () =>{
        const allImage = imageArea.querySelectorAll('img');
        allImage.forEach((item) => item.remove())
        const imageUrl = reader.result;
        const img = document.createElement('img');
        img.src = imageUrl;
        imageArea.appendChild(img);
        imageArea.dataset.img = image.name 
    }
    reader.readAsDataURL(image);
});
