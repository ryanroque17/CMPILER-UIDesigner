function drag() {
    $(".draggable").draggable({cancel:false});
    
  };

document.getElementById("addlabel").addEventListener("click", function(e) { 
	
	e.preventDefault();
    console.log(e.pageX);
    console.log(e.pageY);

	var html = document.getElementById("canvas").innerHTML+="<label class='resizable draggable label' style='position:absolute; top: "+ e.pageX + ";left: "+ e.pageY+"'>hi</label>";

/*	var ihtml = document.getElementById("canvas").innerHTML;
	var ohtml = document.getElementById("canvas").outerHTML;*/

	

	eval(drag());
/*    console.log(ihtml);
	console.log(ohtml);*/
})
document.getElementById("addtextbox").addEventListener("click", function(e) { 
	
	e.preventDefault();
    console.log(e.pageX);
    console.log(e.pageY);

	var html = document.getElementById("canvas").innerHTML+="<input type='text' class='resizable draggable label' style='position:absolute; top: "+ e.pageX + ";left: "+ e.pageY+"'></input>";

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

	var html = document.getElementById("canvas").innerHTML+="<button class='resizable draggable label' style='position:absolute; top: "+ e.pageX + ";left: "+ e.pageY+"'>Button</button>";

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
	downloadElement.setAttribute("href",     dataStr     );
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

