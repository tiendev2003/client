// src/util/scrollHandler.js

export const handleScroll = (navbarRef) => {
    if (navbarRef.current) {
        if (window.scrollY > 50) {
            navbarRef.current.classList.add('fixed-top');
        } else {
            navbarRef.current.classList.remove('fixed-top');
        }
    }
};
