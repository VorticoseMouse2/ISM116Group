//load the xml file from the system
function loadGameXML(toLoad, storeEntry, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      if(storeEntry == true){
        callback(this);
      } else {
        fillData(this);
      }
    }
  }

  xmlhttp.open("GET", "xml/" + String(toLoad) + ".xml", true);
  xmlhttp.send();
}

//fill game page with loaded xml
function fillData(xml) {
  //get the xml data
  var xmlDoc = xml.responseXML;
  var title = xmlDoc.getElementsByTagName("title")[0];
  var desc = xmlDoc.getElementsByTagName("description")[0];
  var cover = xmlDoc.getElementsByTagName("cover")[0].childNodes[0].nodeValue;
  var genre = xmlDoc.getElementsByTagName("genre")[0];
  var rating = xmlDoc.getElementsByTagName("rating")[0];
  var release = xmlDoc.getElementsByTagName("release")[0];
  var price = xmlDoc.getElementsByTagName("price")[0];

  //get the elements to fill on the page
  var gameTitle = document.getElementById("gameName");
  var gameInfo = document.getElementById("gameInfo");
  var gameCover = document.getElementById("gameCover");
  var gameGenre = document.getElementById("gameGenre");
  var gameRating = document.getElementById("gameRating");
  var gameRelease = document.getElementById("gameRelease");
  var gamePrice = document.getElementById("gamePrice");

  //clear elements in the event something went wrong
  gameTitle.innerHTML = "";
  gameInfo.innerHTML = "";
  gameCover.innerHTML = "";

  var img = document.createElement("img");
  img.src = cover;
  img.setAttribute('height', '256px')

  //fill the data
  gameTitle.appendChild(title);
  gameInfo.appendChild(desc);
  gameCover.appendChild(img);
  gameGenre.appendChild(genre);
  gameRating.appendChild(rating);
  gameRelease.appendChild(release);
  gamePrice.appendChild(price);
}

//retrieve infromation from game xml to create a banner
function loadGameBanner(gameToLoad) {
  var gameBody = document.getElementById("pageBody");

  var clickableDiv = document.createElement("a");
  var gameDiv = document.createElement("div");
  var gameTitle = document.createElement("p");
  var gameImg = document.createElement("img");
  var gameDescription = document.createElement("p")

  clickableDiv.setAttribute('href', 'test.html?id=' + gameToLoad);
  clickableDiv.setAttribute('id', 'banner');
  gameDiv.setAttribute('id', 'bannerDiv');
  gameImg.setAttribute('height', '64');
  gameImg.setAttribute('id', 'bannerImg');
  gameTitle.setAttribute('id', 'bannerTitle');
  gameDescription.setAttribute('id', 'bannerDesc');

  //assign element data
  var currGameXML = loadGameXML(gameToLoad, true, function(xml){
    var loadedXML = xml.responseXML;
    gameImg.src = loadedXML.getElementsByTagName("cover")[0].childNodes[0].nodeValue;
    gameTitle.innerHTML = loadedXML.getElementsByTagName("title")[0].childNodes[0].nodeValue;

    var descPart = loadedXML.getElementsByTagName("description")[0].childNodes[0].nodeValue;
    gameDescription.innerHTML = descPart.split(".")[0] + "...";
  });

  gameDiv.appendChild(gameImg);
  gameDiv.appendChild(gameTitle);
  gameDiv.appendChild(gameDescription);
  clickableDiv.appendChild(gameDiv);
  gameBody.appendChild(clickableDiv);
}
