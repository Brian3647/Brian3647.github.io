// Hello! :)
// This is the web's code. Have fun!
// (and remember it's open source)

import Translator from './translator';
import locales from './locales';

console.time('load time');

document.addEventListener('DOMContentLoaded', () => {
	new Translator('en', locales).translateDocument();

	document.querySelectorAll('.fade-in').forEach((element) => {
		element.classList.add('active');
	});

	console.timeEnd('load time');
});
