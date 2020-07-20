
//getting hero id from localstorage
var mySpace=window.localStorage;
var id=mySpace.getItem('displayHero');


var xhttp = new XMLHttpRequest();
var url='https://superheroapi.com/api.php/3234397013278924/'+id;

xhttp.onreadystatechange = function() {

  if (this.readyState == 4 && this.status == 200) {

    var data=JSON.parse(this.responseText);
    console.log(data);

    //setting inner text
    document.getElementById('intelligence').innerText=data.powerstats.intelligence;
    document.getElementById('speed').innerText=data.powerstats.speed;
    document.getElementById('power').innerText=data.powerstats.power;
    document.getElementById('strength').innerText=data.powerstats.strength;
    document.getElementById('combat').innerText=data.powerstats.combat;
    document.getElementById('superhero-image').setAttribute('src',data.image.url);
    document.getElementById('superhero-name').innerText=data.name;
    document.getElementById('real-name').innerText=data.biography["full-name"];

    //good or bad stamp depending upon the alignment of hero
    var alignment=document.getElementById('alignment');
    if(data.biography["alignment"]=='good'){
        alignment.setAttribute('src','good.jpg')
    }else{
        alignment.setAttribute('src','bad.jpg');
    }

    //setting gender innertext
    var sex=document.getElementById('sex');
    if(data.appearance.gender=='Male'){
        sex.innerText="M";
    }else if(data.appearance.gender=='Female'){
        sex.innerText="F";
    }else{
        sex.innerText="NA";

    }
    
    document.getElementById('height').innerText=data.appearance.height[0];
    document.getElementById('weight').innerText=data.appearance.weight[1];
    document.getElementById('hair-color').innerText=data.appearance['hair-color'];
    document.getElementById('eyes').innerText=data.appearance['eye-color'];  
  } 
}
xhttp.open("GET", url, true);
xhttp.send();
    
