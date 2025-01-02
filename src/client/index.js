import { performAction } from './js/app.js';
import './styles/style.scss';

const generateButton = document.getElementById('generate');
if (generateButton) {
  generateButton.addEventListener('click', performAction);
} else {
  console.error('Button with ID "generate" not found in the DOM!');
}
