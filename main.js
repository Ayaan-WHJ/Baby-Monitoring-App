img = "";
status = "";
objects = [];
song  = "";
function preload(){
    song = loadSound("alarm.mp3");
}
function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    
}

function modelLoaded(){
    console.log("model is loaded");
    status = true;
    objectDetector.detect(video, gotResults);   
}
function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function draw(){
    objectDetector.detect(video, gotResults);
    image(video, 0, 0, 380, 380);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            fill(r,g,b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" +percent+ "%" , objects[i].x,objects[i].y );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
        if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Baby is Detected";
                song.stop();
        console.log("Stop");
        }
        else{
            document.getElementById("status").innerHTML = "Baby is not detected";
            song.play();
        }
    }
}
