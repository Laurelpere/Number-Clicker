'use strict';

const overlay = document.querySelector('.overlay');
const user = document.querySelector('.user');
const help = document.querySelector('.help');
const guide = document.querySelector('.guide');
const closeButton = document.querySelector('.close-modal');

const openMode = function() {
    user.classList.remove('guide')
    overlay.classList.remove('guide')
    closeButton.classList.remove('guide')
}

const closeMode = function() {
    user.classList.add('guide')
    overlay.classList.add('guide')
    closeButton.classList.add('guide')
}

    //help.addEventListener('click', openMode);

    //closeButton.addEventListener('click', closeMode);

    //overlay.addEventListener('click', closeMode);