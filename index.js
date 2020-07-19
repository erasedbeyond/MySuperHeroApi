let searchInput= document.getElementById("search-hero");
searchInput.addEventListener('keyup',loadHeroes)

function loadHeroes() {
    var xhttp = new XMLHttpRequest();
    var url='https://superheroapi.com/api.php/3234397013278924/search/'+searchInput.value;
        console.log(url);

    xhttp.onreadystatechange = function() {

        
      if (this.readyState == 4 && this.status == 200) {
        var data=JSON.parse(this.responseText);
        console.log(data);//data from superhero api

        
        let allHero=document.getElementById("getting-hero");
        console.log(data.results);
        for(let hero of data.results){

            var text=hero.name;
        console.log(text);

            let heroData=document.createElement('div');
            heroData.className='hero-data';
            let heroName=document.createElement('P');
            let heroText=document.createTextNode(hero.name);
            heroName.appendChild(heroText);
            let heroImage=document.createElement('img');
            heroImage.setAttribute('src',hero.image.url);
            heroData.appendChild(heroName);
            heroData.appendChild(heroImage);
            allHero.appendChild(heroData);
        
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }