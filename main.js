import { generate_image } from './canvas.js';

const input = document.getElementById('input');

input.addEventListener('input', () => {
  generate_image(input.value.trim());
});

generate_image(input.value.trim());
