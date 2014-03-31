/**
 * @author Scott
 */
(function() {

	function get_image_data(thendo) {
		function readystatechange() {
			if (this.readyState == 4 && this.status == 200) {
				//console.log(this);
				thendo(this.responseText);
			}

		};

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = readystatechange;

		//@TODO To extend this functionality, create the json server side
		xhr.open("get", "images.json", true);
		xhr.send();

	};

	function display_gallery(data) {
		var div, img, gallery = document.getElementById("gallery");
		var images = JSON.parse(data)['data'];
		for (var i = 0, len = images.length; i < len; i++) {
			div = document.createElement("div");
			div.className = "thumb";
			div.setAttribute('data-index', i);
			div.style.backgroundImage = "url('images/" + images[i] + "')";

			gallery.appendChild(div);
		}
		init();
	};

	get_image_data(display_gallery);

	function init() {

		var current = 0;
		var images = gallery.getElementsByTagName("div");
		var total = images.length;
		var timeout = false;

		var open_carousel = function() {
			document.getElementById("gallery_box").className = "carousel";
			var gallery = document.getElementById("gallery");

			for (var i = 0; i < total; i++) {
				images[i].className = "thumb" + (i == current ? " open" : "");
			};

			play();
		};
		
		var play = function() {
			if(timeout) { clearTimeout(timeout); }
			timeout = setTimeout(next, 5000);
			document.getElementById("carousel_pause").style.display = "block";
			document.getElementById("carousel_play").style.display = "none";
		};
		
		var pause = function() {
			if(timeout) { clearTimeout(timeout); }
			document.getElementById("carousel_play").style.display = "block";
			document.getElementById("carousel_pause").style.display = "none";
		};
		
		document.getElementById("carousel_open").onclick = open_carousel;
		document.getElementById("carousel_pause").onclick = pause;
		
		document.getElementById("carousel_play").onclick = play;
		document.getElementById("carousel_close").onclick = function() {
			document.getElementById("gallery_box").removeAttribute('class');
			pause();
			document.getElementById("carousel_play").style.display = "none";
			
		};
		document.getElementById("previous").onclick = function() {
			current = (current - 1 >= 0) ? current - 1 : total - 1;
			//console.log(current);
			open_carousel();
		};

		function next() {
			current = (current + 1 < total) ? current + 1 : 0;
			//console.log(current);
			open_carousel();
		};
		
		document.getElementById("next").onclick = next;

		for (var i = 0; i < total; i++) {
			images[i].onclick = function() {
				current = parseInt(this.getAttribute('data-index'));
				//console.log(this, current);
				open_carousel();
			};
		}

	};

})();
