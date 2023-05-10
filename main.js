prediction_1=""
prediction_2=""

Webcam.set({
width:350,
height:300,
image_format:'.png',
png_quality:90,
})

camera=document.getElementById("camera");

Webcam.attach('#camera')

function take_snapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">'
})
}

console.log('ml5 version',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/EMihWiKr8/model.json',modelloaded);
function modelloaded(){
console.log("model is loaded");
}

function speak(){
var synth=window.speechSynthesis;
var speak_data_1="the first prediction is"+prediction_1;
var speak_data_2="the second prediction is"+prediction_2;
var utterthis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
synth.speak(utterthis)
}

function check(){
var img=document.getElementById("capture_image");
classifier.classify(img,gotresults)
}

function gotresults(error,results){
if(error){
console.error(error);
}
else{
console.log(results);
document.getElementById("result_emotion_name").innerHTML=results[0].label;
document.getElementById("result_emotion_name2").innerHTML=results[1].label;
speak();
prediction_1=results[0].label;
prediction_2=results[1].label;
if(results[0].label=="happy")
{
document.getElementById("update_emoji").innerHTML="&#128522;"
}
if(results[0].label=="sad")
{
document.getElementById("update_emoji").innerHTML="&#128546;"
}
if(results[0].label=="angry")
{
document.getElementById("update_emoji").innerHTML="&#128545;"
}
if(results[1].label=="happy")
{
document.getElementById("update_emoji2").innerHTML="&#128522;"
}
if(results[1].label=="sad")
{
document.getElementById("update_emoji2").innerHTML="&#128546;"
}
if(results[1].label=="angry")
{
document.getElementById("update_emoji2").innerHTML="&#128545;"
}
}
}