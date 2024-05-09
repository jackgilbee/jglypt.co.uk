// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.social-links a');
    const profilePhoto = document.querySelector('.profile-photo img');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    profilePhoto.addEventListener('mouseover', () => {
        profilePhoto.style.transform = 'scale(1.05)';
    });

    profilePhoto.addEventListener('mouseout', () => {
        profilePhoto.style.transform = 'scale(1)';
    });
});
