var body = document.querySelector('body')
var menuTrigger = document.querySelector('#toggle-main-menu-mobile');
var menuContainer = document.querySelector('#main-menu-mobile');
var menuLinks = document.querySelectorAll('#main-menu-mobile a');


menuTrigger.onclick = function() {
    menuContainer.classList.toggle('open');
    menuTrigger.classList.toggle('is-active')
    body.classList.toggle('lock-scroll')
}

menuLinks.forEach(function(link) {
  link.onclick = function() {
    menuContainer.classList.remove('open');
    menuTrigger.classList.remove('is-active');
    body.classList.remove('lock-scroll');
  }
})
