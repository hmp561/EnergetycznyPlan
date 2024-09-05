// fukcja generująca tabelę na stronie
function loaderTABLE(data, ID, day){
  var container = document.getElementById("holder-plan");
  currentDAY = day;
  // wczytanie aktualnej tabeli dla skrócenia późniejszego zapisu
  var data2 = data[ID];
  // console.log(ID);
  IDplanu = ID;
  let licznikCELL = 0;
  // tworzenie nowej tabeli i ustawienie jej id
  var table = document.createElement('table');
  table.className = "plan-lekcji";
  table.id = "plan";
  // tworzenie następnego klucza rzędu "row"+następna liczba
  var cz1ROW = 'row';
  let licznikROW = 1;
  var ROW = cz1ROW+licznikROW;
  // tablica z kluczmi zawartymi w rzędach
  var dniTygodnia = ['nr','godz','pn','wt','sr','cz','pt'];
  // warunek generowania małej lub całości
  if (day !== 0) {
    daysHolder.style.display = "block";
    var dniTygodnia = ['nr','godz', day];
  }
  var licznikSKIP = 0;
  // dopuki są rzędy
  while (data2[ROW]){
    // if (dniTygodnia[4] !== undefined || (data2[ROW][dniTygodnia[2]][0][0] !== '')){
    // dopisanie rzędu do tabeli i na danie ID
    let rowDODAWANIE = table.insertRow(licznikROW - 1 - licznikSKIP);
    rowDODAWANIE.id = ROW;
    licznikCELL=0;
    let x = dniTygodnia.length;
    // let dniTygodnia = ['nr','godz','pn','wt','sr','cz','pt'];
    // przejście po następnych komórkach oraz dodanie ich zawartoścci do komórek na stronie
    // stworzenie odnośników do innych planów oraz naprawienie błędów odnoście polskich znaków powstałych przy pobieraniu tabeli ze strony szkoły
    for (let index = 0; index < x; index++) {
      let cellDOWADANIE = rowDODAWANIE.insertCell(licznikCELL);
      let SPANlicznik = 0;
      cellDOWADANIE.classList.add(dniTygodnia[licznikCELL]);
      let licznikELEMENT = 0;
      data2[ROW][dniTygodnia[licznikCELL]].forEach(element => {
      let markers = {"n" : "<i class=\"fa-solid fa-user-large\"></i>", "o" : "<i class=\"fa-solid fa-user-group\"></i>", "s": "<i class=\"fa-solid fa-location-dot\"></i>"}
        if (element[1]) {
          podzELEMENT = element[1].split('.');
          if (fails[element[0]] !== undefined) {
            cellDOWADANIE.innerHTML += '<span class="przycisk-zmiany" name=\"'+podzELEMENT[0]+'\">'+markers[podzELEMENT[0][0]]+" "+fails[element[0]]+' </span>';
          } else {
            cellDOWADANIE.innerHTML += '<span class="przycisk-zmiany" name=\"'+podzELEMENT[0]+'\">'+markers[podzELEMENT[0][0]]+" "+element[0]+' </span>';
          }
          let marker = cellDOWADANIE.querySelectorAll("i");
          let dl = marker.length;
          // console.log(dl);
          // console.log(marker);
          marker[dl - 1].setAttribute("name", podzELEMENT[0]);
        } else {
          if (fails[element[0]] !== undefined) {
            // cellDOWADANIE.innerHTML += fails[element[0]];
            cellDOWADANIE.innerHTML += '<span>'+fails[element[0]]+'</span>';
          } else {
            // cellDOWADANIE.innerHTML += element[0];
            cellDOWADANIE.innerHTML += '<span>'+element[0]+'</span>';
          }
        
        //<i class="fa-solid fa-user-large"></i>    znacznik osoby
        //<i class="fa-solid fa-user-group"></i>    znacznik oddział
        //<i class="fa-solid fa-location-dot"></i>  znacznik sala


        }
        licznikELEMENT++;
        if (licznikELEMENT % 3 == 1 && licznikCELL > 1){
          cellDOWADANIE.appendChild(document.createElement('br'));
        }
        
        if (SPANlicznik > 1 && element[1] !== undefined) {
          console.log();
          if (dniTygodnia[licznikCELL] !== "godz" || dniTygodnia[licznikCELL] !== "nr"){
            cellDOWADANIE.innerHTML+="<br>";
            SPANlicznik = -1;
          }
        }
        SPANlicznik++;
      });
      licznikCELL++;
    }
  licznikROW++;
  var ROW = cz1ROW+licznikROW;
}
  // dodanie tabeli na co elementu #holder-plan
  // var holder = document.createElement("div");
  // holder.id = "holder-plan";
  // holder.appendChild(table);
  container.appendChild(table);

  //wykrywanie naciśnięcią dla przycisków z klasy .przycisk-zmiany
  var buttons = document.querySelectorAll('.przycisk-zmiany');
  buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  })
  // var buttonDAYS = document.querySelectorAll('.day')
  //   buttonDAYS.forEach((button)=>{
  //     var idDay = button.id
  //     button.addEventListener('click', function () {
  //       changeday(idDay, ID);
  //     })
  // })
  shortCHECK();
  findCURRENT();
  if (dniTygodnia.length == 3) {
    removeEMPTYstart(day);
  }
};

function removeEMPTYstart(day) {
  let columnDAY = document.querySelectorAll("."+day);
  let plan = document.getElementById("plan");
  let pattern = "<span></span><br>";
  // console.log('yy');
  for (let i=1; i<columnDAY.length; i++) {
    // console.log(columnDAY[i].innerHTML == pattern);
    if (columnDAY[i].innerHTML == pattern) {
      plan.deleteRow(1);
      // console.log('xx');
    } else{
    // console.log("przd break");
      break;
    }
  }
  // console.log("po break");
  columnDAY = document.querySelectorAll("."+day);
  plan = document.getElementById("plan");
  for (let i = columnDAY.length - 1; i > 0; i--) {
    if (columnDAY[i].innerHTML == pattern) {
      plan.deleteRow(i);
      // console.log('xx');
    } else{
      break;
    }
  }
}

function buttonsDAYS(data) {
    var container = document.getElementById("holder-plan");
    var dniTygodnia = ['nr','godz','pn','wt','sr','cz','pt'];
    //stworzenie diva na przyciski do dni
    daysHolder = document.createElement('div');
    daysHolder.id = "days-holder";
    daysHolder.style.display = "none";
    //stworzenie przycisków do dni
    dniTygodnia.forEach(element => {
      if (element == 'nr' || element == 'godz') {
        let x;
      }
      else{
        let button = document.createElement('button');
        button.classList.add('day');
        button.id = element;
        // console.log(fails[data2["row1"][element]]);
        // console.log(data2["row1"][element][0]);

        // sprawdzenie poprawności znaków języka polskiego
        if (fails[data["o1"]["row1"][element][0][0]]) {
            button.innerHTML = fails[data["o1"]["row1"][element][0][0]];
        } 
        else {
          button.innerHTML = data["o1"]["row1"][element][0][0];
        }
        // dodanie przycisków do diva przeznaczonego na nie
        daysHolder.appendChild(button);
      }
    });
    // dodanie przycisków na stronę
    container.appendChild(daysHolder);
    var buttonDAYS = document.querySelectorAll('.day')
    buttonDAYS.forEach((button)=>{
      var idDay = button.id
      button.addEventListener('click', function () {
      changeday(idDay, IDplanu);
    })
  })
}

function loaderLIST(data){
    var list = data["links"];
    var container = document.getElementById('nav');
    var listsID = ["Oddzialy", "Nauczyciele", "Sale"]
    var listsIDlicznik = 0;
    for (const title in list) {
      var lists = document.createElement('div');
      container.appendChild(lists);
      // container.insertBefore(list, mojDiv.children[-2]);
      // Dodajemy nowy element przed ostatnim dzieckiem
      // var ostatnieDziecko = ;
      // container.insertBefore(lists, listsIDlicznik+3);

      lists.className = "side-link";
      var buttonLIST = document.createElement('button');
      buttonLIST.className = "title-list-nav";
      buttonLIST.setAttribute('name', title);
      buttonLIST.id = listsID[listsIDlicznik];
      lists.id = "side-link-"+listsID[listsIDlicznik];
      listsIDlicznik++;
      if (fails[title+""] !== undefined){
        buttonLIST.innerHTML = fails[title];
      }
      else{
        buttonLIST.innerHTML = title;
      }
      
      lists.appendChild(buttonLIST);
      lists.innerHTML += '<br>';
      for (let index = 0; index < list[title].length; index++) {
        const buttonINSIDE = list[title][index];
        var buttonLIST = document.createElement('button');
        buttonLIST.classList.add('przycisk-zmiany');
        buttonLIST.classList.add('element-side-link');
        podzELEMENT = buttonINSIDE[1].split('.');
        buttonLIST.setAttribute('name', podzELEMENT[0]);
        if (fails[buttonINSIDE[0]] !== undefined){
          buttonLIST.innerHTML = fails[buttonINSIDE[0]];
        } else{
          buttonLIST.innerHTML = buttonINSIDE[0];
        }
        lists.appendChild(buttonLIST);
        lists.innerHTML+= '<br>';
      }
      lists.innerHTML += '<br>';
    }
    var support = document.createElement('div');
    support.id = "support";
    support.innerHTML = "Support: <a href=\"mailto:energetycznyplan@gmail.com\">energetycznyplan@gmail.com</a>";
    container.appendChild(support);
    // container.innerHTML += "<div id=\"support\">Support:<a href=\"mailto:energetycznyplan@gmail.com\">energetycznyplan@gmail.com</a></div>";

    var oddzialy = document.getElementById('Oddzialy')

    oddzialy.addEventListener('click', function() {
        openLIST(oddzialy.id);
    });
    var nauczyciele = document.getElementById('Nauczyciele')

    nauczyciele.addEventListener('click', function() {
        openLIST(nauczyciele.id);
    });
    var sale = document.getElementById('Sale')

    sale.addEventListener('click', function() {
        openLIST(sale.id);
    });
}
function loaderTITLE(data, ID){
  var titles = data["links"];
  var planHeader = document.getElementById("h2-tytol")
  var printPLAN = document.getElementById("print-plan")
  planHeader.innerHTML = "";
  printPLAN.setAttribute('href', "http://www.energetyk.ires.pl/planlekcji/plany/"+ID+".html")
  for (const title in titles) {
    
    for(let i = 0; i < titles[title].length; i++) {
      if(titles[title][i][1] === ID+".html") {
        
        if (fails[title] !== undefined || fails[titles[title][i][0]] !== undefined){
          if (fails[title] !== undefined){
            planHeader.innerHTML += fails[title];
          } else {
            planHeader.innerHTML += title;
          }
          planHeader.innerHTML += " / ";
          if (fails[titles[title][i][0]] !== undefined){
            planHeader.innerHTML += fails[titles[title][i][0]];
          }else {
            planHeader.innerHTML += titles[title][i][0];
          }
        } else{
          planHeader.innerHTML = title+" / "+titles[title][i][0];
        }
        
        
      }
    }
  }
}

function load(data) {
  dane1 = data;
  buttonsDAYS(data);
  loaderLIST(data);
  loaderTITLE(data, IDplanu);
  loaderTABLE(data, IDplanu, 0);
  resize();
}

function loadfails(data) {
  fails = data[0];
  shorty = data[1];
}

function handleButtonClick() {
  var child = document.getElementById('plan');
  var container = document.getElementById("holder-plan");
  container.removeChild(child);
  var buttonName = event.target.getAttribute('name');
  // console.log(buttonName);
  loaderTITLE(dane1, buttonName);
  loaderTABLE(dane1, buttonName, currentDAY);
  
}
function changeday(IDday, IDplan) {
  // console.log(IDday);
  // console.log(IDplan);
  var child = document.getElementById('plan');
  var container = document.getElementById("holder-plan");
  container.removeChild(child);
  loaderTABLE(dane1, IDplan, IDday);
}

function openLIST(id) {

  var container = document.getElementById('side-link-'+id);
  var akctiveBUTTON = document.getElementById(id);
  var siedeLINK = container.querySelectorAll(".element-side-link");
  var support = document.getElementById('support');
  var nuberOFlinks = container.childElementCount;
  // console.log(nuberOFlinks);
  var height = nuberOFlinks * 35 /2;
  if (container.style.height === "45px" || container.style.height === "") {
    
    container.style.height = height+"px";
    akctiveBUTTON.style.borderBottomLeftRadius = "0px";
    akctiveBUTTON.style.borderBottomRightRadius = "0px";
    // akctiveBUTTON.style.marginBottom = "0px";
    for (let i = 0; i < siedeLINK.length; i++) {
      siedeLINK[i].classList.add('bg-color-for-link');
      if (i == siedeLINK.length - 1) {
        siedeLINK[i].classList.add("round-border");
      }  
    }
    support.style.position = "static";

  } else {
    container.style.height = "";
    akctiveBUTTON.style.borderBottomLeftRadius = "";
    akctiveBUTTON.style.borderBottomRightRadius = "";
    // akctiveBUTTON.style.marginBottom = "10px";
    let lists = document.querySelectorAll(".side-link");
    let licznik = 0;
    for (let i = 0;  i < lists.length; i++) {
      if (container.offsetHeight > 50) {
        licznik++;
        console.log(container.offsetHeight );
      } 
    }
    console.log(licznik);
    if (licznik == 3){
      support.style.position = "absolute";
    }
  }
}
function changeLenght(current, next, normal, short) {
  var timeCELL = document.querySelectorAll(".godz");
  var nrCELL = document.querySelectorAll(".nr");
  console.log(shorty);
  for (let i = 0; i < timeCELL.length - 1; i++) {
    console.log(timeCELL[i+1].querySelector("span").innerHTML);
    var currentCELL = timeCELL[i+1].querySelector("span");
    var currentTIME = shorty[nrCELL[i+1].querySelector("span").innerHTML];
    console.log(currentTIME[0]);
    console.log(currentCELL.innerHTML);
    console.log(currentCELL.innerHTML == currentTIME[0]);
    if (currentTIME[0] !== undefined) {
      if (currentCELL.innerHTML == currentTIME[current]) {
        currentCELL.innerHTML = currentTIME[next];
      }
    }
  }
  var NORMAL = document.getElementById(normal);
  var SHORT = document.getElementById(short);
  if (current == 0) {
    NORMAL.classList.remove("selected-button");
    SHORT.classList.add("selected-button");
  } else {
    SHORT.classList.remove("selected-button");
    NORMAL.classList.add("selected-button");
  }
}

function changeVIEW(type, data) {

  var child = document.getElementById('plan');
  var container = document.getElementById("holder-plan");
  container.removeChild(child);
  if (type == "table") {
    loaderTABLE(dane1, IDplanu, 0);
    daysHolder.style.display = "none";
  } else {
    daysHolder.style.display = "block";
    // console.log(today);
    loaderTABLE(data, IDplanu, today());
  }
}

function today() {
  let week = ['pn','wt','sr','cz','pt','sb','nd']
  let  d = new Date().getDate();
  if (new Date().getHours() > 20){
    d++;
  };
  let today = week[d];
  if (today == 'sb' || today == 'nd') {
    today = 'pn';
  };
  return today
}


function findCURRENT() {
  var time =  [new Date().getHours(), new Date().getMinutes()];
  // var time = [12, 20];
  let timeNUMBER = Number(time[0])  * 60 + Number(time[1]);
  let columnTIME = document.querySelectorAll(".godz");

  let last;

  for (let i = 1; i<columnTIME.length; i++) {
    //pobranie godziny z komórki
    let rowTIME = columnTIME[i].children[0].innerHTML;
    //podzielenie godziny na godzinę początkową i końcową
    let splitROW = rowTIME.split("-");
    let TIMEstart = Number(splitROW[0].split(":")[0]) * 60 + Number(splitROW[0].split(":")[1])
    let TIMEend = Number(splitROW[1].split(":")[0]) * 60 + Number(splitROW[1].split(":")[1])

    let currentROW = document.getElementById("row"+(i+1));

    if (TIMEstart <= timeNUMBER &&  timeNUMBER < TIMEend) {
      currentROW.classList.add('current-lesson');
    }
    if (last <= timeNUMBER &&  timeNUMBER < TIMEstart){
      currentROW.classList.add('next-lesson');
    }
    last = TIMEend;
  }
}

function shortCHECK() {
  let normalLESSON = document.getElementById("normal-lenght");
  let shortLESSON = document.getElementById("short-lenght");
  if (short){
    changeLenght(0, 1, normalLESSON.id, shortLESSON.id);
  }
}

function closeNAVI() {
  var nav2 = document.getElementById('test');
  // var holderPLAN = document.getElementById('holder-plan');
  var buttonOPENnav = document.getElementById('button-open-nav');
  // var headerIMG = document.getElementById("header-img")
  var headerH1 = document.getElementById("header-h1");
  // var header = document.getElementById("header");
  var left = document.getElementById("left");
  var right = document.getElementById("right");
  var nav = document.getElementById('nav');
  // var support = document.getElementById('support');

  buttonOPENnav.style.width = "80px";
  buttonOPENnav.style.display = "flex";
  left.style.width = "80px";
  right.style.width = "calc(100vw - 80px)";
  // nav.style.width = "80px";
  // header.style.width = "80px";
  headerH1.style.display = "none";
  buttonOPENnav.style.height = "100%";
  left.style.overflow = "hidden";
  nav2.style.overflow = "hidden";
  nav.style.height =  "0px";
  nav.style.width =  "0px";
  // support.style.overflow = "hidden";
  // support.style.height =  "0px";
  // support.style.width =  "0px";
}

function openNAWI(){
  var nav2 = document.getElementById('test');
  // var holderPLAN = document.getElementById('holder-plan');
  var buttonOPENnav = document.getElementById('button-open-nav');
  var headerH1 = document.getElementById("header-h1");
  // var header = document.getElementById("header");
  var left = document.getElementById("left");
  var nav = document.getElementById('nav');
  var right = document.getElementById("right");
  
  
  buttonOPENnav.style.width = "0";
  buttonOPENnav.style.display = "none";
  left.style.width = "300px";
  right.style.width = "calc(100vw - 300px)";
  // nav.style.width = "350px";
  // nav.style.minWidth = "350px";
  // holderPLAN.style.width = "calc(100vw - 350px)";
  // header.style.width = "350px";

  headerH1.style.display = "block";
  // left.style.overflow = "hidden";
  // nav2.style.overflow = "scroll";
  nav.style.height =  "calc(100vh - 70px)";
  nav.style.width =  "100%";
}

function resize() {
  let view = document.getElementById("select-view");
  if (window.innerWidth <= 1200){
    changeVIEW("list", dane1);
    view.style.display = "none";
    if (window.innerWidth < 600){
      closeNAVI();
    } else{
      openNAWI();
    }
  } else{
    changeVIEW("table", dane1);
    view.style.display = "block";

  }
}

var dane1 = {};
var fails = {};
var shorty = {};
var short = false;
var IDplanu = 'o12';
var currentDAY = today();

fetch('./fail.json')
  .then(response => response.json())
  .then(data => loadfails(data))
  .catch(error => {alert("fack U")})

fetch('./dane.json')
    .then(response => response.json())
    .then(data => load(data))
    .catch(error => {alert("Błąd połączenia z serwerem")})

document.addEventListener('DOMContentLoaded', function() {
    let normalLESSON = document.getElementById("normal-lenght");
    let shortLESSON = document.getElementById("short-lenght");
    
    normalLESSON.addEventListener("click", function() {
      changeLenght(1, 0, normalLESSON.id, shortLESSON.id);
      short = false;
    });

    shortLESSON.addEventListener("click", function() {
      changeLenght(0, 1, normalLESSON.id, shortLESSON.id);
      short = true;
    });

    var tableVIEW = document.getElementById("table-button");
    var listVIEW  = document.getElementById("list-button");

    tableVIEW.addEventListener("click", function () {
      changeVIEW("table", dane1);
      tableVIEW.classList.add("selected-button");
      listVIEW.classList.remove("selected-button");

    });

    listVIEW.addEventListener("click", function () {
      changeVIEW("list", dane1);
      tableVIEW.classList.remove("selected-button");
      listVIEW.classList.add("selected-button");

    });
    var buttonOPENnav = document.getElementById('button-close-nav');
    
    buttonOPENnav.addEventListener('click', function () {
        closeNAVI();
    });

    var buttonCLOSEnav = document.getElementById('button-open-nav')

    buttonCLOSEnav.addEventListener('click', function() {
        openNAWI();
    });

    var search = document.getElementById("search");

    search.addEventListener("input", function() {
      // console.log(search.value);
      let list = dane1["links"]
      let result = document.getElementById("results");
      let closeNAV = document.getElementById("button-close-nav");
      let holderSEARCH = document.getElementById("holder-search-close");
      let blockSEARCH = document.getElementById("holder-search");

      result.innerHTML = "";
      if (search.value+"" !== ""){
        // closeNAV.style.display= "none";
        // holderSEARCH.style.width= "100%";
        result.style.width = holderSEARCH.offsetWidth;
        // console.log(holderSEARCH.offsetWidth);
        for (const key in list) {
        for (const name of list[key]) {
          // console.log(name[0].toLowerCase());
          // console.log(search.value.toLowerCase());
          // console.log(name[0].toLowerCase().includes(search.value.toLowerCase()+""));
          if (fails[name[0]+""] !== undefined){
            // console.log(" x x");
            var fail = fails[name[0]+""];
          } else{
            var fail = name[0];
          }
          if (fail.toLowerCase().includes(search.value.toLowerCase()+"")){

            let position = document.createElement("button");
            // console.log(fails[name[0]])
            if (fails[name[0]+""] !== undefined){
              // console.log(" x x");
              position.innerHTML = fails[name[0]+""];
            } else{
              position.innerHTML = name[0];
            }
            // position.innerHTML = name[0];
            position.classList.add('przycisk-zmiany');
            position.setAttribute('name', name[1].split(".")[0]);
            result.appendChild(position);
            result.innerHTML += "<br>";
            blockSEARCH.style.borderBottomLeftRadius = "0";
            blockSEARCH.style.borderBottomRightRadius = "0";
            blockSEARCH.style.marginBottom = "0";
            result.style.border = "1px #b9b9b9 solid";
            result.style.borderTop = "transparent"
          }
        }
      }
    } else{
      blockSEARCH.style.borderBottomLeftRadius = "";
      blockSEARCH.style.borderBottomRightRadius = "";
      blockSEARCH.style.marginBottom = "";
      result.style.border = "none";
    };
    var buttons = document.querySelectorAll('.przycisk-zmiany');
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        handleButtonClick();
        search.value = "";
        result.innerHTML = "";
      });
      
    });
    });
});
window.addEventListener("resize", function () {
  resize();
});