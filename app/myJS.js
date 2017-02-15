(function () {
	const users = [	"ESL_SC2",
					"OgamingSC2",
					"cretetion",
					"freecodecamp",
					"storbeck",
					"comster404",
					"brunofin",
					"habathcx",
					"RobotCaleb",
					"noobs2ninjas"];

	const buttons = document.querySelectorAll('.buttons div');
	let ul = document.querySelector('main ul');

	// this function creates userLi
	function createdUserLiNode(user, data, requestType) {
		let userStatus = requestType === 'channels' ? 'offline' : 'online' ;
		let userLi = document.createElement('li');
		let a = '';
		data.status = requestType === 'channels' ? 'offline' : data.status ;
		if (data.error) {data.status = 'Channel does not exist'};
		a += '<a target="_blank" href="' + data.url + '">';
		a += '<div class="logoUser"><img src="' + (data.logo || "img/unknow-user.jpg")+ '" alt="logo ' + user + '"></div>';
		a += '<span class="name">' + (data.display_name || user) + '</span>';
		a += '<span>' + (data.status || '') + '</span>';;
		a += '</a>';
		userLi.className = userStatus + " shadow";
		userLi.style.background = 'rgb(70, 104, 145) url(' + (data.profile_banner || "#")+ ') center no-repeat';
		userLi.style.backgroundSize = 'cover';
		userLi.innerHTML = a;
		ul.appendChild(userLi);
		// console.log(data);
	}

	function requestUsers(user, requestType) {
		const urlAPI = "https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/";
		let url = urlAPI + requestType + '/' + user + "?callback=?";

		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			  	let dataRespons = request.responseText;
			  	// console.log(typeof dataRespons);
			  	dataRespons = dataRespons.substring(32, dataRespons.length - 2);
			  	// console.log(dataRespons);
				let data = JSON.parse(dataRespons);
				if (requestType === 'channels') {
					createdUserLiNode(user, data, requestType);
					 // console.log(data);
				} else if (requestType === 'streams'){
				    if(data.stream !== null) {
				    	createdUserLiNode(user, data.stream.channel, requestType);
				    } else if(data.stream === null){
				    	requestUsers(user, 'channels');
					}
				}
			  } else {
			  	var data = JSON.parse(request.responseText);
			  	console.log(user + ": isn't here");
			  	// console.log(data);
			  }
			};
		request.onerror = function() {
		  // There was a connection error of some sort
		};
		request.send();
	} //end of requestUser

	//call request for each user in userList
	function createUsersDOMList(users) {
		users.forEach(user => requestUsers(user, 'streams'));
	}

	//fade in function for li(channels)
	function fadeIn(className) {
	var items = document.querySelectorAll(className),
		opacity = 0;
	items.forEach(item => item.style.opacity = 0);
	items.forEach(item => item.style.display = 'block');
	var fadeOutHandler = setInterval(function() {
		opacity += 0.2;
		if (opacity > 1) {
			clearInterval(fadeOutHandler);
			// items.forEach(item => item.style.opacity = 1);
		} else	items.forEach(item => item.style.opacity = opacity);

	}, 50);
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
			// console.log(document.querySelectorAll('.online'));
	}

	function displayUsers() {
		const inputText = new RegExp(this.value, 'gi');
		const lists = document.querySelectorAll('main ul li a');
		// console.log(lists);
		fadeOut('.online, .offline');
		lists.forEach(list => {
			list.parentNode.classList.remove('match');
			if(list.childNodes[1].innerText.match(inputText)) {
				list.parentNode.classList.add('match');
			}
		});
		fadeIn('.match');
	}

	createUsersDOMList(users);
	buttons.forEach(button => button.addEventListener('click', toggleClassActive, false));
	buttons.forEach(button => button.addEventListener('transitionend', toggleClassChannels, false));


	document.querySelector('.search input').addEventListener('keyup', displayUsers, false);

})();