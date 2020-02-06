'use strict';

let nav = document.querySelector('.main-nav');
let toggle = document.querySelector('.menu-toggle');

nav.classList.remove('main-nav--no-js');

toggle.addEventListener('click', function() {
  nav.classList.toggle('main-nav--on');
  this.classList.toggle('menu-toggle--on');
})
