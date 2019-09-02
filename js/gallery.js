'use strict';

import galleryItems from './gallery-items.js';
console.log(galleryItems);


const refs = {
    gallery: document.querySelector(".gallery"),
    lightboxOpen: document.querySelector(".lightbox"),
    lightboxContent: document.querySelector(".lightbox__content"),
    lightboxImage: document.querySelector(".lightbox___image"),
    lightboxButtonClose: document.querySelector(".lightbox__button"),    
}

// *********** Добаление img в HTML  ***************************//

const resultHtmlGalery = galleryItems
.map(({preview, original, description}) => 
` <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image" src="${preview}" data-lazy="${preview}" data-source="${original}" width="340" alt="${description}" />
        <span class="gallery__icon"><i class="material-icons">zoom_out_map</i></span>
      </a>
    </li>
  `
).join(""); 

refs.gallery.insertAdjacentHTML("beforeend", resultHtmlGalery);


// ******************************* is-open **********************//

function isOpen() {
  refs.lightboxOpen.classList.add('is-open');
  window.addEventListener('keydown', handlKeyPress);
}
 
//*******************************close ***************************//

function isClose() {

  refs.lightboxOpen.classList.remove('is-open');
  window.removeEventListener('keydown', handlKeyPress);
  refs.lightboxImage.setAttribute('src', '');
  refs.lightboxImage.setAttribute('alt', '');
}


function handlKeyPress() {
  if(event.code !== 'Escape') {
    return;
  };
  isClose();
};

function isCloseBoxContent(e) {
  if( e.target !== e.currentTarget ) return;
  
  isClose();

  refs.lightboxContent.removeEventListener('click', isCloseBoxContent);
}; 


//******************* открытие окна ************//

function lightboxIsOpen (elemForLightbox) {
  // console.log(event.target.dataset.source);
  const source = elemForLightbox.dataset.source;
  const alt = elemForLightbox.getAttribute('alt');
  
  refs.lightboxImage.setAttribute('alt', alt);

  refs.lightboxImage.setAttribute('src', source);

  refs.lightboxContent.addEventListener('click', isCloseBoxContent);

  refs.lightboxButtonClose.addEventListener('click', isClose);

  isOpen();
}
   
  

const handleClickImg = (event) => {
  event.preventDefault();
  const target = event.target;
  if (target.nodeName !== 'IMG') return;
  lightboxIsOpen(target);
};



refs.gallery.addEventListener('click', handleClickImg);