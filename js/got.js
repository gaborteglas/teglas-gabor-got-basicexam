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
