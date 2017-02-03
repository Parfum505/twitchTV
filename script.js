(function () {
	const buttons = document.querySelectorAll('.buttons div');

	//fade in function for li(channels)
	function fadeIn(className) {
	var items = document.querySelectorAll(className),
		opacity = 0;
	items.forEach(item => item.style.opacity = 0);
	items.forEach(item => item.style.display = 'block');
	var fadeOutHandler = setInterval(function() {
		opacity += 0.1;
		if (opacity > 1) {
			clearInterval(fadeOutHandler);
			// items.forEach(item => item.style.opacity = 1);
		} else	items.forEach(item => item.style.opacity = opacity);

	}, 100);
}
	//fade out function for li(channels)
function fadeOut(className) {
	var items = document.querySelectorAll(className);
	items.forEach(item => item.style.display = 'none');
	items.forEach(item => item.style.opacity = 0);
}

		function toggleClassChannels() {
		this.classList.add('channels');
	}

	function toggleClassActive() {
		const list = document.querySelectorAll('ul li');

			document.querySelector('.active').classList.remove('active');
			if (document.querySelector('.channels')) {
				document.querySelector('.channels').classList.remove('channels');
			}
			this.classList.add('active');

			if (this.dataset.filter === "all") {
				fadeIn('.online, .offline');
			} else if (this.dataset.filter === "online") {
				fadeOut('.offline');
				fadeIn('.online');
			} else if (this.dataset.filter === "offline") {
				fadeOut('.online');
				fadeIn('.offline');
			}
			console.log(document.querySelectorAll('.online'));
	}

	buttons.forEach(button => button.addEventListener('click', toggleClassActive, false));
	buttons.forEach(button => button.addEventListener('transitionend', toggleClassChannels, false));


})();