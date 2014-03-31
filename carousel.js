/**
 * @author Scott
 */
(function(){
	
	function get_image_data(thendo) {
		function readystatechange() {
			if (this.readyState == 4 && this.status == 200){
				console.log(this);
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
		for(var i = 0, len = images.length; i < len ; i++) {
			div = document.createElement("div");
			div.className = "thumb";
			div.style.backgroundImage = "url('images/"+images[i]+"')";
			gallery.appendChild(div);
		}
	};
	
	get_image_data(display_gallery);
	
})();
