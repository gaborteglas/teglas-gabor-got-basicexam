function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function jslintFun() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // itt a json content, benne a data változóban
  var userDatas = JSON.parse(xhttp.responseText)[2].data;
  userDatas = sortDead(userDatas);
  userDatas = orderedCharacters(userDatas);
  showCharacterList(userDatas);
  /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG!

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
function sortDead(characters) {
  var living = [];
  for (var i = 0; i < characters.length; i++) {
    if (characters[i].dead !== 'true') {
      living.push(characters[i]);
    }
  }
  return living;
}

function orderedCharacters(characters) {
  for (var i = 0; i < characters.length - 1; i++) {
    for (var j = i + 1; j < characters.length; j++) {
      if (characters[i].name.localeCompare(characters[j].name) > 0) {
        var temp = [characters[i], characters[j]];
        characters[i] = temp[1];
        characters[j] = temp[0];
      }
    }
  }
  return characters;
}

function showCharacterList(userDatas) {
  var container = document.querySelector('.map-div');
  var listDiv = createListDiv(container);
  listDiv.innerHTML = '';
  for (var i = 0; i < userDatas.length; i++) {
    createCharacter(listDiv, userDatas[i]);
  }
}

function createListDiv(container) {
  var listDiv = container.querySelector('.list-div');
  if (!listDiv) {
    listDiv = document.createElement('div');
    listDiv.className = 'list-div';
    container.appendChild(listDiv);
  }
  return listDiv;
}

function createCharacter(list, character) {
  var itemDiv = document.createElement('div');
  itemDiv.className = 'character-item';
  itemDiv.character = character;
  itemDiv.onclick = function addOnclick() {
    createOneCharacter(this.character);
  };

  var img = document.createElement('img');
  img.src = '/' + character.portrait;
  img.alt = 'No picture found';

  var span = document.createElement('div');
  span.innerHTML = character.name;

  itemDiv.appendChild(img);
  itemDiv.appendChild(span);

  list.appendChild(itemDiv);
}

function createOneCharacter(character) {
  var container = document.querySelector('.search-div');
  var listDiv = createListDiv(container);
  listDiv.innerHTML = '';

  var img = document.createElement('img');
  img.src = '/' + character.picture;
  img.alt = 'No picture';
  img.className = 'search-pic';

  var title = document.createElement('div');
  title.className = 'house-div';
  title.innerHTML = character.name;

  var charDescription = document.createElement('div');
  charDescription.className = 'char-bio';
  charDescription.innerHTML = character.bio;

  var imgHouse = document.createElement('img');
  imgHouse.src = '/assets/houses/' + character.house + '.png';
  imgHouse.className = 'house-pic';
  imgHouse.alt = 'No picture!';

  listDiv.appendChild(img);
  listDiv.appendChild(title);
  listDiv.appendChild(imgHouse);
  listDiv.appendChild(charDescription);
}
