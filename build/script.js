/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "comster404", "brunofin", "habathcx", "RobotCaleb", "noobs2ninjas"];

	var buttons = document.querySelectorAll('.buttons div');
	var ul = document.querySelector('main ul');

	// this function creates userLi
	function createdUserLiNode(user, data, requestType) {
		var userStatus = requestType === 'channels' ? 'offline' : 'online';
		var userLi = document.createElement('li');
		var a = '';
		data.status = requestType === 'channels' ? 'offline' : data.status;
		if (data.error) {
			data.status = 'Channel does not exist';
		};
		a += '<a target="_blank" href="' + data.url + '">';
		a += '<div class="logoUser"><img src="' + (data.logo || "img/unknow-user.jpg") + '" alt="logo ' + user + '"></div>';
		a += '<span class="name">' + (data.display_name || user) + '</span>';
		a += '<span>' + (data.status || '') + '</span>';;
		a += '</a>';
		userLi.className = userStatus + " shadow";
		userLi.style.background = 'rgb(70, 104, 145) url(' + (data.profile_banner || "#") + ') center no-repeat';
		userLi.style.backgroundSize = 'cover';
		userLi.innerHTML = a;
		ul.appendChild(userLi);
		// console.log(data);
	}

	function requestUsers(user, requestType) {
		var urlAPI = "https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/";
		var url = urlAPI + requestType + '/' + user + "?callback=?";

		var request = new XMLHttpRequest();
		request.open('GET', url, true);

		request.onload = function () {
			if (request.status >= 200 && request.status < 400) {
				var dataRespons = request.responseText;
				// console.log(typeof dataRespons);
				dataRespons = dataRespons.substring(32, dataRespons.length - 2);
				// console.log(dataRespons);
				var _data = JSON.parse(dataRespons);
				if (requestType === 'channels') {
					createdUserLiNode(user, _data, requestType);
					// console.log(data);
				} else if (requestType === 'streams') {
					if (_data.stream !== null) {
						createdUserLiNode(user, _data.stream.channel, requestType);
					} else if (_data.stream === null) {
						requestUsers(user, 'channels');
					}
				}
			} else {
				var data = JSON.parse(request.responseText);
				console.log(user + ": isn't here");
				// console.log(data);
			}
		};
		request.onerror = function () {
			// There was a connection error of some sort
		};
		request.send();
	} //end of requestUser

	//call request for each user in userList
	function createUsersDOMList(users) {
		users.forEach(function (user) {
			return requestUsers(user, 'streams');
		});
	}

	//fade in function for li(channels)
	function fadeIn(className) {
		var items = document.querySelectorAll(className),
		    opacity = 0;
		items.forEach(function (item) {
			return item.style.opacity = 0;
		});
		items.forEach(function (item) {
			return item.style.display = 'block';
		});
		var fadeOutHandler = setInterval(function () {
			opacity += 0.2;
			if (opacity > 1) {
				clearInterval(fadeOutHandler);
				// items.forEach(item => item.style.opacity = 1);
			} else items.forEach(function (item) {
				return item.style.opacity = opacity;
			});
		}, 50);
	}

	//fade out function for li(channels)
	function fadeOut(className) {
		var items = document.querySelectorAll(className);
		items.forEach(function (item) {
			return item.style.display = 'none';
		});
		items.forEach(function (item) {
			return item.style.opacity = 0;
		});
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
		var inputText = new RegExp(this.value, 'gi');
		var lists = document.querySelectorAll('main ul li a');
		// console.log(lists);
		fadeOut('.online, .offline');
		lists.forEach(function (list) {
			list.parentNode.classList.remove('match');
			if (list.childNodes[1].innerText.match(inputText)) {
				list.parentNode.classList.add('match');
			}
		});
		fadeIn('.match');
	}

	createUsersDOMList(users);
	buttons.forEach(function (button) {
		return button.addEventListener('click', toggleClassActive, false);
	});
	buttons.forEach(function (button) {
		return button.addEventListener('transitionend', toggleClassChannels, false);
	});
	document.querySelector('.search input').addEventListener('keyup', displayUsers, false);
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);