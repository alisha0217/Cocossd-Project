img = "";
Status = "";
object =[];

function preload(){
img = loadImage("Desk.jpg");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded");
    Status = true;

    objectDetector.detect(img, gotResult);
}

function draw(){
    image(img, 0, 0, 640, 420);
    if(Status!= ""){
        for(i = 0; i<object.length; i++){
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            fill("cornflowerblue");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "% ", object[i].x - 30, object[i].y - 20);
            noFill();
            stroke("cornflowerblue");
            rect(object[i].x - 50, object[i].y - 40, object[i].width, object[i].height);
        }
    }
   
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else
    {
        console.log(results);
        object = results;
    }
}