(function () {
	const buttons = document.querySelectorAll('.buttons div');

		function toggleClassChannels() {
		this.classList.add('channels');
	}

	function toggleClassActive() {
			document.querySelector('.active').classList.remove('active');
			if (document.querySelector('.channels')) {
				document.querySelector('.channels').classList.remove('channels');
			}
			this.classList.add('active');
	}



	buttons.forEach(button => button.addEventListener('click', toggleClassActive, false));
	buttons.forEach(button => button.addEventListener('transitionend', toggleClassChannels, false));


})();