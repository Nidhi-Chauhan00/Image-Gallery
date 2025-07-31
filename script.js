const gallery = document.querySelector('.image-gallery');
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const filterButtons = document.querySelectorAll('.filter-button');

const images = [
    { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2148&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'nature' },
    { src: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'nature' },
    { src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'nature' },
    { src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'nature' },
    { src: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'people' },
    { src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'architecture' },
    { src: 'https://images.unsplash.com/photo-1616418534243-ab757ff8ce3a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'architecture' },
    { src: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1980&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'architecture' },
    { src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', category: 'architecture' },
];

let currentIndex = 0;

function displayImages(filter) {
    gallery.innerHTML = '';
    const filteredImages = images.filter(image => filter === 'all' || image.category === filter);
    filteredImages.forEach((image, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.dataset.index = index;
        imageContainer.dataset.category = image.category;

        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.category;

        imageContainer.appendChild(img);
        gallery.appendChild(imageContainer);

        imageContainer.addEventListener('click', () => {
            openLightbox(index, filter);
        });
    });
}

function openLightbox(index, filter) {
    const filteredImages = images.filter(image => filter === 'all' || image.category === filter);
    currentIndex = index;
    lightbox.classList.add('active');
    lightboxContent.src = filteredImages[currentIndex].src;
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function showPrevImage() {
    const filter = document.querySelector('.filter-button.active').dataset.filter;
    const filteredImages = images.filter(image => filter === 'all' || image.category === filter);
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    lightboxContent.src = filteredImages[currentIndex].src;
}

function showNextImage() {
    const filter = document.querySelector('.filter-button.active').dataset.filter;
    const filteredImages = images.filter(image => filter === 'all' || image.category === filter);
    currentIndex = (currentIndex + 1) % filteredImages.length;
    lightboxContent.src = filteredImages[currentIndex].src;
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayImages(button.dataset.filter);
    });
});

closeButton.addEventListener('click', closeLightbox);
prevButton.addEventListener('click', showPrevImage);
nextButton.addEventListener('click', showNextImage);

document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
});

displayImages('all');
