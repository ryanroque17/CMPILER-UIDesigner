function drag() {
    $(".element").draggable({cancel:false});
    
  };


$(document).on("click", ".element", function(){

  	var prop = document.getElementById("properties");
   	prop.style.display = 'block';
    prop.innerHTML=
    "Properties: <label>Height=</label> <input id='heightprop' style='width:45px' type='text' value='" + $(this).height() +"px' </input> "+
    "<label>Width=</label> <input id='widthprop' style='width:45px' type='text' value='" + $(this).width() +"px'> </input>" +
    "<label>Placeholder =</label> <input id='placeholderprop' style='width:75px' type='text' >"+
    "<button id='changeprop' style='width:105px'> Save Changes </button>";

    eval(changeprop($(this)));
});

$(document).on("click", ".label", function(){

  	var prop = document.getElementById("properties");
   	prop.style.display = 'block';
    prop.innerHTML=
    "Properties: <label>Font size =</label> <input id='fontsizeprop' style='width:45px' type='text' value='" + $(this).css('font-size') +"' </input> "+
    "<label>Text =</label> <input id='textprop' style='width:75px' type='text' value='"+ $(this).text() + "'> </input>" +
    "<button id='changeprop' style='width:105px'> Save Changes </button>";

    eval(changeprop($(this)));
});

function changeprop(element) {
	document.getElementById("changeprop").addEventListener("click", function(e) { 
		if(element.attr('class').indexOf("label") >= 0){
			element.css({'font-size': document.getElementById("fontsizeprop").value})
			element.text(document.getElementById("textprop").value);
		}else{
			element.height(document.getElementById("heightprop").value) ;
			element.width(document.getElementById("widthprop").value);
			if(element.attr('class').indexOf("input") >= 0)
				element.attr("placeholder", document.getElementById("placeholderprop").value);
			else
				element.val(document.getElementById("placeholderprop").value);

		}
	})
}
document.getElementById("addlabel").addEventListener("click", function(e) { 
	
	e.preventDefault();
    console.log(e.pageX);
    console.log(e.pageY);

	var html = document.getElementById("canvas").innerHTML+="<label class='element label' style='position:absolute; top: "+ e.pageY + ";left: "+ e.pageX+"'>Label</label>";

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

	var html = document.getElementById("canvas").innerHTML+="<input type='text' class='element input' style='position:absolute; top: "+ e.pageY + ";left: "+ e.pageX+"'></input>";

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

	var html = document.getElementById("canvas").innerHTML+="<input type='submit' class='element button' style='position:absolute; top: "+ e.pageY + ";left: "+ e.pageX+"'></input>";

/*	var ihtml = document.getElementById("canvas").innerHTML;
	var ohtml = document.getElementById("canvas").outerHTML;*/

	

	eval(drag());
/*    console.log(ihtml);
	console.log(ohtml);*/
})
document.getElementById("generatejson").addEventListener("click", function() {  
	var html = document.getElementById("canvas").outerHTML;
    var json = window.himalaya.parse(html)

    var data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
	var downloadElement = document.getElementById('downloadJsonFile');
	downloadElement.setAttribute("href",     data     );
	downloadElement.setAttribute("download", "ui_design.json");
	downloadElement.click();

    console.log('👉', json)

    /*fs.writeFile("./object.json", JSON.stringify(json), (err) => {
        if (err) {
            console.error(err);
            return;
        };
        console.log("File has been created");
    });*/
})

