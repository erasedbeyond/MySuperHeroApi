//getting serchInput and adding event listener
let searchInput= document.getElementById("search-hero");
searchInput.addEventListener('keyup',loadHeroes)

let mySpace = window.localStorage;
//creating local Storage
if(!mySpace.getItem('heroIDs')){
  let arr = [];
  mySpace.setItem('heroIDs',JSON.stringify(arr));
  console.log("Storage Created");
}

mySpace.setItem('displayHero','');


function loadHeroes() {
    
    var allHeroContainer= document.getElementById('getting-hero');
    allHeroContainer.innerHTML='<h1>Loading....</h1>';
    

    var xhttp = new XMLHttpRequest();
    var url='https://superheroapi.com/api.php/3234397013278924/search/'+searchInput.value;
   
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var data=JSON.parse(this.responseText);
        console.log(data);//data from superhero api


        //when search input is backspaced and there is no input value, return from function
        if(!searchInput.value){
          allHeroContainer.innerHTML='enter';
          return;
        }

        //making sure that data result and input search have same keywords
        if(searchInput.value!=data["results-for"]){
          return;
        }
     
        //resetting the block where heroes searched will be shown
        allHeroContainer.innerHTML='';
        
        //for every result, adding to document
        for(let hero of data.results){
            //creating div for ever hero
            let heroData=document.createElement('div');
            heroData.className='hero-data';
            heroData.onclick = function(){currentHero(hero.id)};

            //creating hero name
            let heroName=document.createElement('P');
            let heroText=document.createTextNode(hero.name);
            heroName.appendChild(heroText);

            //creating hero image
            let heroImage=document.createElement('img');
            heroImage.setAttribute('src',hero.image.url);

            
            
            //creating favourite button
            let button = document.createElement("BUTTON");
            button.className = 'fav-button';

            
            var arr = JSON.parse(mySpace.getItem('heroIDs'));

            //if hero is already added to favourite, then diferent style button
            if(arr.includes(hero.id)){
              button.style.color="red";
              button.innerHTML = '<span>Favourite</span><i class="fas fa-heart"></i>';
            }else{
              button.innerHTML = '<span>Add to Favourite</span><i class="far fa-heart"></i>';
            }

            //on click, it will remove or add accordingly
            button.onclick = function() { myFavourite(hero.id,button)};

        
            


            //adding hero-name and hero-iamge to hero div
            heroData.appendChild(heroName);
            heroData.appendChild(heroImage);
            heroData.appendChild(button);

            //appending hero-div to main hero block where all hero searched are to be added
            allHeroContainer.appendChild(heroData);
        
        }
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }


  //adding favourite heroes function

  function myFavourite(heroID,button){
    console.log('adding hero ID ' ,heroID, 'to local storage');
    var data=JSON.parse(mySpace.getItem('heroIDs'));

    //if already added, then deleting it and changing button style
    if(data.includes(heroID)){
      console.log("already added, so deleting");

      deleteHero(data,heroID);
      button.innerHTML = '<span>Add to Favourite</span><i class="far fa-heart"></i>';
          button.style.color="black";


    //else adding to favourite,and changing button style to red
    }else{
      button.innerHTML = '<span>Favourite</span><i class="fas fa-heart"></i>';
      button.style.color="red";
      data.push(heroID);
    }
    mySpace.setItem('heroIDs',JSON.stringify(data));
  }

  //delete function to delete hero from favourite
  function deleteHero(arr,id){
      for(let i in arr){
   
        if(arr[i]==id){
            var temp= arr[i];
            arr.splice(i,1);
            console.log(`deleted hero id`, temp);
            break;
        }
      }
    mySpace.setItem('heroIDs',JSON.stringify(arr));

  }
  

  //current hero function
  function currentHero(heroID){
      mySpace.setItem('displayHero',heroID);
      console.log("******curretn hero********")
      window.location.assign("hero.html");
  }
  

 