var favourite= document.getElementById("favourite-heroes");

var mySpace=window.localStorage;

var arr=JSON.parse(mySpace.getItem("heroIDs"));

for(let id of arr){

    console.log(id);    

    var xhttp = new XMLHttpRequest();
    var url='https://superheroapi.com/api.php/3234397013278924/'+id;
   
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var data=JSON.parse(this.responseText);
        console.log(data);//data from superhero api


      
            //creating div for every hero
            let heroData=document.createElement('div');
            heroData.className='hero-data';
            heroData.id='hero-data'+id;

            //creating hero name
            let heroName=document.createElement('P');
            let heroText=document.createTextNode(data.name);
            heroName.appendChild(heroText);

            //creating hero image
            let heroImage=document.createElement('img');
            // console.log(data.url);
            heroImage.setAttribute('src',data.image.url);

            
            
            //creating delete button
            let button = document.createElement("BUTTON");
            button.className = 'delete-button';
            button.innerHTML = '<span>Delete</span>';
            button.onclick = function() { deleteHero(id,heroData.id)};

        
            


            //adding hero-name and hero-iamge to hero div
            heroData.appendChild(heroName);
            heroData.appendChild(heroImage);
            heroData.appendChild(button);

            //appending hero-div to main hero block where all hero searched are to be added
            favourite.appendChild(heroData);
        
        }
      }
      xhttp.open("GET", url, true);
      xhttp.send();
    }
  
//delete function to delete hero from favourite
function deleteHero(id,heroData){
    for(let i in arr){
 
      if(arr[i]==id){
          var temp= arr[i];
          arr.splice(i,1);
          console.log(`deleted hero id`, temp);
          break;
      }
    }
  mySpace.setItem('heroIDs',JSON.stringify(arr));
  var element = document.getElementById(heroData);
  element.remove();
}