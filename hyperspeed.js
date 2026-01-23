
const canvas = document.createElement('canvas'); // Create canvas dynamically
canvas.id = 'hyperspeed-canvas';
const homeSection = document.getElementById('home');

if (homeSection) {
    homeSection.appendChild(canvas);
} else {
    // If running before DOM loads
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('home').appendChild(canvas);
    });
}

// Styling to make sure it fits the container
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0'; // Behind text
canvas.style.pointerEvents = 'none'; // Don't block interactions

const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

// Configuration
const config = {
    starCount: 600,
    speed: 0.2, // Movement speed from center
    rotationSpeed: 0.002, // Slight rotation
    colors: ['#ffffff', '#3b82f6', '#a855f7'], // White, Blue, Purple
    maxDepth: 1000, // Z-depth spawn range
};

class Star {
    constructor() {
        this.reset(true);
    }

    reset(initial = false) {
        this.x = (Math.random() - 0.5) * width * 2; // Spread wider than screen
        this.y = (Math.random() - 0.5) * height * 2;
        this.z = initial ? Math.random() * config.maxDepth : config.maxDepth;
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
        this.size = Math.random() * 2;
    }

    update() {
        // Move towards viewer (decrease Z)
        this.z -= config.speed * 40; // 40 is a speed multiplier

        // Reset if passed viewer
        if (this.z <= 0) {
            this.reset();
            this.z = config.maxDepth;
        }
    }

    draw() {
        // Perspective projection
        // x_2d = x / z * constant
        const k = 128.0 / this.z;
        const px = this.x * k + width / 2;
        const py = this.y * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
            const size = (1 - this.z / config.maxDepth) * 3 * this.size;
            const opacity = 1 - this.z / config.maxDepth;

            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.globalAlpha = opacity;
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();

            // Optional: Draw trails for high speed feel?
            // For now simple dots moving fast
        }
    }
}

function init() {
    resize();
    stars = [];
    for (let i = 0; i < config.starCount; i++) {
        stars.push(new Star());
    }
    animate();
}

function resize() {
    width = homeSection ? homeSection.offsetWidth : window.innerWidth;
    height = homeSection ? homeSection.offsetHeight : window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    // Optional: Add a slight trail effect by fading out instead of clearing
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    // ctx.fillRect(0, 0, width, height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
init();

// Integration note: Ensure this script runs after DOM is ready
