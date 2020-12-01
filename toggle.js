const toggleSwitch = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');

function darkMode() {
	toggleIcon.children[0].textContent = 'Dark Mode';
	toggleIcon.children[1].classList.remove('fa-sun');
	toggleIcon.children[1].classList.remove('ink')
	toggleIcon.children[1].classList.add('fa-moon');
}
function lightMode() {
	toggleIcon.children[0].textContent = 'Light Mode'
	toggleIcon.children[1].classList.remove('fa-moon')
	toggleIcon.children[1].classList.add('fa-sun');
	toggleIcon.children[1].classList.add('ink');
	}

	// toggle theme dynamically 
function switchTheme(event) {
	if(event.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem('theme', 'dark');
		darkMode();
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light')
		lightMode();
	}
}
// check localstorage for theme
const currentTheme = localStorage.getItem('theme');
if(currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme)
	if(currentTheme === 'dark') {
		toggleSwitch.checked = true;
		darkMode();
	}
}

toggleSwitch.addEventListener('change', switchTheme);