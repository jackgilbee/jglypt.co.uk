document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.links a');
    const modeToggle = document.getElementById('mode-toggle');
    const shapesContainer = document.querySelector('.shapes-container');

    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.backgroundColor = '#ff3b30';
            link.style.color = 'black';
            link.style.boxShadow = '0 4px 15px rgba(255, 59, 48, 0.5)';
        });

        link.addEventListener('mouseout', () => {
            link.style.backgroundColor = '';
            link.style.color = document.body.classList.contains('light-mode') ? 'black' : 'white';
            link.style.boxShadow = '';
        });
    });

    modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        links.forEach(link => {
            link.style.color = document.body.classList.contains('light-mode') ? 'black' : 'white';
        });
        modeToggle.innerHTML = document.body.classList.contains('light-mode') ? '<img draggable="false" class="emoji" alt="🌑" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1f311.svg">' : '<img draggable="false" class="emoji" alt="🌞" src="https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/1f31e.svg">';
    });

    // Generate shapes
    const colors = [
        'rgba(255, 59, 48, 0.5)',
        'rgba(0, 0, 0, 0.5)',
        'rgba(128, 128, 128, 0.5)',
        'rgba(255, 99, 71, 0.5)',
        'rgba(169, 169, 169, 0.5)'
    ];

    const shapes = ['circle', 'square', 'triangle'];

    for (let i = 0; i < 20; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.classList.add('shape', shapeType);

        if (shapeType === 'triangle') {
            shape.style.borderBottomColor = colors[Math.floor(Math.random() * colors.length)];
        } else {
            shape.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        shape.style.width = `${20 + Math.random() * 30}px`;
        shape.style.height = shapeType === 'triangle' ? '0' : shape.style.width;
        shape.style.top = `${Math.random() * 100}vh`;
        shape.style.left = `${Math.random() * 100}vw`;
        shapesContainer.appendChild(shape);
    }

    document.addEventListener('mousemove', (event) => {
        const shapes = document.querySelectorAll('.shape');
        shapes.forEach(shape => {
            const moveX = (event.clientX / window.innerWidth) * 50 - 25;
            const moveY = (event.clientY / window.innerHeight) * 50 - 25;
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});
