ac_img = ""
status = ""
object = []

function preload() {
    img = loadImage('AC.jpg')
}

function createCanvas() {
    canvas = createCanvas(640 , 420)
    canvas.center()
    objectDector = ml5.objectDector('cocossd' , modelLoaded)
    document.getElementById("status").innerHTML = "status : detecting object"
}

function draw() {
    img(ac_img , 0 , 0 , 640 ,350)
    
    if (status != "") {
        for(i = 0 ; i < object.length ; i++){
            document.getElementById("status").innerHTML = "status : object dected"

            fill("#000000")
            percent = floor(object[i].confidence*100)
            text(object[i].label + "" + percent + "%" + object[i].x - 800 , object[i].y - 520)
            noFill()
            stroke("#000000")
            Rect(object[i].x - 800 , object[i].y - 520 , object[i].width - 910 , object[i].length - 2640)
        }
    }
}

function modelLoaded() {
    console.log("model is loaded");
    status = true
    objectDector.decting(img , gotResult)
}
function gotResult() {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results
    }
}