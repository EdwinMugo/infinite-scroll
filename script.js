const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

let ready = false;
let imagesLoaded = 0;
let totalImages= 0;

// unsplash API
let count= 5;
const apiKey= 'Nwx0FYur1vY3tzVobyiNxbcxiIen7C7S-Hrbbb3EUBs';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

// Check if all images are loaded
function imageLoaded (){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count= 30;
        console.log('ready =', ready);
    }
}

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// create elements for links and photos and add to DOM
function displayPhotos (){
    imagesLoaded= 0;
    totalImages = photosArray.length;
    

    // run function for each object in the photoarray
    photosArray.forEach((photo) => {

        // create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank"
        });


      

        // create <img> for photo
        const img= document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

    //    event listener, check when each is finished
        img.addEventListener('load', imageLoaded);


        // put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    
    });
}



// get photos from unsplash API

async function getPhotos(){
try{
    const response = await fetch (apiUrl);
    photosArray = await response.json();
    displayPhotos();
}catch (e){

}
}
// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
   if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    ready = false;
    getPhotos();
   }
});


// on load
getPhotos();