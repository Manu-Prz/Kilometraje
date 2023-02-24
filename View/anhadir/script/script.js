/*function menuHandler(e) {
    if (!e.matches) {
        $("#formularioRegistro")[0].classList.add("w-100");
        $("#formularioRegistro")[0].classList.remove("w-50");
        
    } else {
        $("#formularioRegistro")[0].classList.add("w-50");
        $("#formularioRegistro")[0].classList.remove("w-100");
    }
    
}

mqLarge = window.matchMedia( '(min-width: 768px)' );
menuHandler(mqLarge);

mqLarge.addEventListener('change', menuHandler);
*/
menuHandler(window.matchMedia('(min-width: 768px)'));