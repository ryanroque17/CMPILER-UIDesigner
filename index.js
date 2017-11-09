function drag() {
    $(".element").draggable({ containment:"#canvas", cancel:false});
 };

 var global_selected; 

$(document).on("click", ".element", function(){

  	var prop = document.getElementById("properties");
   	prop.style.display = 'block';
    prop.innerHTML=
    "<button id='deleteelement' style='width:105px'>Delete Element</button> Properties: <label>Height =</label> <input id='heightprop' style='width:45px' type='text' value='" + $(this).height() +"px' </input> "+
    "<label>Width =</label> <input id='widthprop' style='width:45px' type='text' value='" + $(this).width() +"px'> </input>" +
    "<label>Placeholder =</label> <input id='placeholderprop' style='width:75px' type='text' >"+
    "<button id='changeprop' style='width:105px'> Save Changes </button>";

    global_selected = $(this);
    eval(changeprop($(this)));
});

$(document).on("click", ".label", function(){

  	var prop = document.getElementById("properties");
   	prop.style.display = 'block';
    prop.innerHTML=
    "<button id='deleteelement' style='width:105px'>Delete Element</button> Properties: <label>Font size =</label> <input id='fontsizeprop' style='width:45px' type='text' value='" + $(this).css('font-size') +"' </input> "+
    "<label>Text =</label> <input id='textprop' style='width:75px' type='text' value='"+ $(this).text() + "'> </input>" +
    "<button id='changeprop' style='width:105px'> Save Changes </button>";

    global_selected = $(this);
    eval(changeprop($(this)));
});


function changeprop(element) {
	document.getElementById("changeprop").addEventListener("click", function(e) { 
		if(element.attr('class').indexOf("label") >= 0){
			element.css({'font-size': document.getElementById("fontsizeprop").value})
			element.text(document.getElementById("textprop").value);
		}else{
			element.height(document.getElementById('heightprop').value);
			if(element.attr('type') == 'submit') {
				$(element).css("border", "none");
			}
			element.width(document.getElementById("widthprop").value);
			if(element.attr('class').indexOf("input") >= 0)
				element.attr("placeholder", document.getElementById("placeholderprop").value);
			else
				element.val(document.getElementById("placeholderprop").value);
		}

	})

	document.getElementById("deleteelement").addEventListener("click", function(e) { 
		$(global_selected).remove();
	})
}

document.getElementById("addlabel").addEventListener("click", function(e) { 
	
	e.preventDefault();
    console.log(e.pageX);
    console.log(e.pageY);

	var html = document.getElementById("canvas").innerHTML+="<label class='draggable element label' style='position:absolute; top: "+ e.pageY + "px;left: "+ e.pageX+"px'>Label</label>";

/*	var ihtml = document.getElementById("canvas").innerHTML;
	var ohtml = document.getElementById("canvas").outerHTML;*/

	

	eval(drag());
	console.log(html);
/*    console.log(ihtml);
	console.log(ohtml);*/
})
document.getElementById("addtextbox").addEventListener("click", function(e) { 
	
	e.preventDefault();
    console.log(e.pageX);
    console.log(e.pageY);

	var html = document.getElementById("canvas").innerHTML+="<input type='text' class='draggable element input' style='position:absolute; top: "+ e.pageY + "px;left: "+ e.pageX+"px'></input>";

/*	var ihtml = document.getElementById("canvas").innerHTML;
	var ohtml = document.getElementById("canvas").outerHTML;*/

	

	eval(drag());
/*    console.log(ihtml);
	console.log(ohtml);*/
})
document.getElementById("addbutton").addEventListener("click", function(e) { 
	
	e.preventDefault();
    console.log(e.pageX);
    console.log(e.pageY);

	var html = document.getElementById("canvas").innerHTML+="<input type='submit' class='draggable element button' style='position:absolute; top: "+ e.pageY + "px;left: "+ e.pageX+"px'></input>";

/*	var ihtml = document.getElementById("canvas").innerHTML;
	var ohtml = document.getElementById("canvas").outerHTML;*/

	

	eval(drag());
/*    console.log(ihtml);
	console.log(ohtml);*/
})

document.getElementById("generatejson").addEventListener("click", function() {  
	var html = document.getElementById("canvas").innerHTML;

    var json = window.himalaya.parse(html)

    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
	var downloadElement = document.getElementById('downloadJsonFile');
	downloadElement.setAttribute("href",     data     );
	downloadElement.setAttribute("download", "ui_design.json");
	downloadElement.click();


    /*fs.writeFile("./object.json", JSON.stringify(json), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });*/
})

function readSingleFile(evt) {
	var file = evt.target.files[0];

	if(file) {
		var fr = new FileReader();
		fr.onload = function(e) {
			var contents = e.target.result;
			
			console.log(contents);
			parse(contents);
		}
		fr.readAsText(file);
	} else {
		alert("Failed to load file!");
	}
}

$('#my-button').click(function(){
    $('#loadjson').click();
});

function checkIfCompatible() {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		document.getElementById('loadjson').addEventListener('change', readSingleFile, false);
	} else {
		alert("File reading is not supported!");
	}
}

function parse(contents) {
	document.getElementById("canvas").innerHTML = "";
	var obj = $.parseJSON(contents);
	$.each(obj, function() {
		console.log(this);

		var hasHeight = false;
		var hasWidth = false;
		if(this['type'] != "Text") {
		if(this['attributes']['style']['height'] == null) {

		}
		 else {
		 	var height = this['attributes']['style']['height'];
		 	hasHeight = true;
		 }

		 if(this['attributes']['style']['width'] == null) {

		 } else {
			var width = this['attributes']['style']['width'];
			hasWidth = true;
		}
		}

		if(this['tagName'] == 'label') {

			var element = "<label class='draggable element label' style='position:absolute; top: "+ this['attributes']['style']['top'] + ";left: "+ this['attributes']['style']['left'];

			if(hasHeight) {
				element += "; height: " + height; 
			}
			if(hasWidth) {
				element += "; width: " + width;
			}

			element += "'>" + this['children'][0]['content'] + "</label>";

			document.getElementById("canvas").innerHTML += element
		} else if(this['tagName'] == 'input') {
			if(this['attributes']['type'] == 'text') {
				if(this['attributes']['placeholder'] == null) {

					var element = "<input type='text' class='draggable element input' style='position:absolute; top: "+ this['attributes']['style']['top'] + ";left: "+ this['attributes']['style']['left'];

					if(hasHeight) {
						element += "; height: " + height; 
					}
					if(hasWidth) {
						element += "; width: " + width;
					}

					element +=  "'></input>";
					document.getElementById("canvas").innerHTML += element;
				} else {

					var element = "<input type='text' placeholder='"+this['attributes']['placeholder'] + "' class='draggable element input' style='position:absolute; top: "+ this['attributes']['style']['top'] + ";left: "+ this['attributes']['style']['left'];

					if(hasHeight) {
						element += "; height: " + height; 
					}
					if(hasWidth) {
						element += "; width: " + width;
					}
					
					element += "'></input>";
					document.getElementById("canvas").innerHTML += element;
				}
			} else if(this['attributes']['type'] == 'submit') {
				if(this['attributes']['value'] == null) {
					var element = "<input type='submit' class='draggable element button' style='border: none; position:absolute; top: "+ this['attributes']['style']['top'] + ";left: "+ this['attributes']['style']['left'];
					if(hasHeight) {
						element += "; height: " + height; 
					}
					if(hasWidth) {
						element += "; width: " + width;
					}
					
					element += "'></input>";
					document.getElementById("canvas").innerHTML += element
				} else {
					var element = "<input type='submit' value='" + this['attributes']['value'] + "'class='draggable element button draggable' style='border: none; position:absolute; top: "+ this['attributes']['style']['top'] + ";left: "+ this['attributes']['style']['left'];

					if(hasHeight) {
						element += "; height: " + height; 
					}
					if(hasWidth) {
						element += "; width: " + width;
					}
					
					element += "'></input>";
					document.getElementById("canvas").innerHTML += element
				}
			}
		}
	})
}

document.getElementById("loadjson").addEventListener("click", function() {  
	checkIfCompatible();
	eval(drag());
})

$("#clearbutton").on('click', function() {
	document.getElementById("canvas").innerHTML = "";
});