// fukcja generująca tabelę na stronie
function loaderTABLE(data, ID, day){
  // console.log("loaderTABLE");
  var container = document.getElementById("holder-plan");
  currentDAY = day;
  // wczytanie aktualnej tabeli dla skrócenia późniejszego zapisu
  var data2 = data[ID];
  IDplanu = ID;
  localStorage.setItem("IDplanu", ID);
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
    daysHolder.style.display = "flex";
    var dniTygodnia = ['nr','godz', day];
  }
  var licznikSKIP = 0;
  // dopuki są rzędy


  while (data2[ROW]){
    // dopisanie rzędu do tabeli i na danie ID
    let rowDODAWANIE = table.insertRow(licznikROW - 1 - licznikSKIP);
    rowDODAWANIE.id = ROW;
    licznikCELL=0;
    let x = dniTygodnia.length;

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
          
          cellDOWADANIE.innerHTML += '<span class="przycisk-zmiany" name=\"'+podzELEMENT[0]+'\">'+markers[podzELEMENT[0][0]]+" "+element[0]+' </span>';
          
          let marker = cellDOWADANIE.querySelectorAll("i");
          let dl = marker.length;
          // console.log(dl);
          // console.log(marker);
          marker[dl - 1].setAttribute("name", podzELEMENT[0]);
        } else {

          if (element[0] == "nan"){
            cellDOWADANIE.innerHTML += '';
          } else{
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
          // console.log();
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
  // buttons.forEach((button) => {
  //   button.addEventListener('click', function () {
  //     let buttonID = button.getAttribute("name");
  //     handleButtonClick(buttonID)
  //   });
  // })

  buttons.forEach((button) => {
    button.addEventListener('click', function () {
      let buttonID = button.getAttribute("name");
      handleButtonClick(buttonID)
    }, {once: true})
  })

  // var buttonDAYS = document.querySelectorAll('.day')
  //   buttonDAYS.forEach((button)=>{
  //     var idDay = button.id
  //     button.addEventListener('click', function () {
  //       changeday(idDay, ID);
  //     })
  // })

  let exptime = document.createElement("p");
  exptime.id = "expiration-date";
  exptime.innerHTML = data["wazny"];
  container.appendChild(exptime)

  shortCHECK();
  findCURRENT();
  if (dniTygodnia.length == 3) {
    removeEMPTYstart(day);
  }
};

function removeEMPTYstart(day) {
  let columnDAY = document.querySelectorAll("."+day);
  let plan = document.getElementById("plan");
  let pattern = "<br>";
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
    // console.log("buttonDAYS");
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
        // console.log(data2["row1"][element][0]);

        // sprawdzenie poprawności znaków języka polskiego
        button.innerHTML = data["o1"]["row1"][element][0][0];
        // dodanie przycisków do diva przeznaczonego na nie
        daysHolder.appendChild(button);
      }
    });
    // dodanie przycisków na stronę
    container.appendChild(daysHolder);
    var buttonDAYS = document.querySelectorAll('.day');
    buttonDAYS.forEach((button)=>{
      var idDay = button.id;
      button.addEventListener('click', function () {
        changeday(idDay, IDplanu);
        // findCURRENT();
      });
    });
};

function loaderLIST(data){
    // console.log("loaderLIST");
    var list = data["links"];
    // console.log(list["Sale"][IDplanu]);
    // console.log();
    var container = document.getElementById('nav');
    var listsID = ["Oddzialy", "Nauczyciele", "Sale"]
    var listsIDlicznik = 0;
    for (const title in list) {
      var lists = document.createElement('div');
      container.appendChild(lists);

      lists.className = "side-link";
      var buttonLIST = document.createElement('button');
      buttonLIST.className = "title-list-nav";
      // buttonLIST.classList.add("bg-color-for-link-bright")
      buttonLIST.setAttribute('name', title);
      buttonLIST.id = listsID[listsIDlicznik];
      lists.id = "side-link-"+listsID[listsIDlicznik];
      listsIDlicznik++;
      buttonLIST.innerHTML = title;
      
      lists.appendChild(buttonLIST);
      lists.innerHTML += '<br>';

      
      for (const IDbutton in list[title]) {
        const buttonINSIDE = list[title][IDbutton];

        buttonLIST = document.createElement('button');
        buttonLIST.setAttribute('name', IDbutton);
        buttonLIST.classList.add("przycisk-zmiany");
        buttonLIST.classList.add("element-side-link");
        buttonLIST.classList.add('bg-color-for-link-bright');
        buttonLIST.innerHTML = buttonINSIDE
        lists.appendChild(buttonLIST);
        lists.innerHTML+= '<br>';
      }
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
  // console.log("loaderTITLE");
  let titles = data["links"];
  let planHeader = document.getElementById("h2-tytol")
  let printPLAN = document.getElementById("print-plan")
  planHeader.innerHTML = "";
  printPLAN.setAttribute('href', "http://www.energetyk.ires.pl/planlekcji/plany/"+ID+".html")

  let startLeatersID = {"o":"Oddziały","n":"Nauczyciele","s":"Sale"}

  planHeader.innerHTML = titles[startLeatersID[ID[0]]][ID];

}

function load(data) {
  dane1 = data;
  buttonsDAYS(data);
  loaderLIST(data);
  // console.log(data["links"]);
  loaderTITLE(data, IDplanu);
  loaderTABLE(data, IDplanu, 0);
  resize();
  loadMOTIF();
  let spinLOADER = document.getElementById("loader");
  spinLOADER.style.display="none";
}

function loadfails(data) {
  console.log(data);
  shorty = data;
  console.log(data);
  const serializedObject = JSON.stringify(data);
  localStorage.setItem("shortPATERN", serializedObject)
}

function cleraringPLANholder(){
  // console.log("cleraringPLANholder");
  let plan = document.getElementById('plan');
  let expTime = document.getElementById('expiration-date');
  let container = document.getElementById("holder-plan");
  container.removeChild(plan);
  container.removeChild(expTime);
}

let clickedButtons = new Set();
var previousPLANid = "";

function handleButtonClick(ID) {

  if (clickedButtons.has(ID)) return;
  clickedButtons.add(ID);

  // console.log("handleButtonClick");
  cleraringPLANholder()
  // var buttonName = event.target.getAttribute('name');
  loaderTITLE(dane1, ID);
  loaderTABLE(dane1, ID, currentDAY);

  clickedButtons.delete(previousPLANid);
  previousPLANid = ID;
}
function changeday(IDday, IDplan) {
  // console.log(IDday);
  // var plan = document.getElementById('plan');
  // var container = document.getElementById("holder-plan");
  // container.removeChild(plan);
  cleraringPLANholder()
  loaderTABLE(dane1, IDplan, IDday);
  findCURRENT();
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
      // siedeLINK[i].classList.add('bg-color-for-link-bright');
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
        // console. log(container.offsetHeight );
      } 
    }
    // console.log(licznik);
    if (licznik == 3){
      support.style.position = "absolute";
    }
  }
}
function changeLenght(current, next) {
  // console.log("changeLenght");
  var timeCELL = document.querySelectorAll(".godz");
  var nrCELL = document.querySelectorAll(".nr");
  // console.log(shorty);
  for (let i = 0; i < timeCELL.length - 1; i++) {
    // console.log(timeCELL[i+1].querySelector("span").innerHTML);
    var currentCELL = timeCELL[i+1].querySelector("span");
    var currentTIME = shorty[nrCELL[i+1].querySelector("span").innerHTML];
    // console.log(currentTIME[0]);
    // console.log(currentCELL.innerHTML);
    // console.log(currentCELL.innerHTML == currentTIME[0]);
    if (currentTIME[0] !== undefined) {
      if (currentCELL.innerHTML == currentTIME[current]) {
        currentCELL.innerHTML = currentTIME[next];
      }
    }
  }
  findCURRENT();
}

function changeVIEW(data, big) {
  // console.log("changeVIEW");
  let daysHOLDER = document.getElementById("days-holder")
  let row = document.getElementById("row1");
  let rowCountChild = row.childElementCount;
  cleraringPLANholder();
  if (big) {
    daysHOLDER.style.display = "none";
    loaderTABLE(data, IDplanu, 0)
  } else {
    // if (rowCountChild < 7) {
    //   daysHOLDER.style.display = "none";
    //   loaderTABLE(data, IDplanu, 0)
    // } else {
    //   daysHOLDER.style.display = "flex";
    //   loaderTABLE(data, IDplanu, currentDAY)
    // }
    daysHOLDER.style.display = "flex";
    loaderTABLE(data, IDplanu, today());
  }
}

function today() {
  // console.log("today");
  let week = ['nd','pn','wt','sr','cz','pt','sb']
  let  d = new Date().getDay();
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
  // console.log("findCURRENT");
  let highlighted1 = document.querySelectorAll(".current-row-bright");
  let highlighted2 = document.querySelectorAll(".next-row-bright");
  for (let i=0; i<highlighted1.length; i++) {
    highlighted1[i].classList.remove('current-row-bright');
    if (highlighted1[i].querySelectorAll("."+today())[0] !== undefined) {
    highlighted1[i].querySelectorAll("."+today())[0].classList.remove('current-lesson-bright');
    }
  }
  for (let i=0; i<highlighted2.length; i++){
    highlighted2[i].classList.remove('next-row-bright');
    if (highlighted2[i].querySelectorAll("."+today())[0] !== undefined) {
      highlighted2[i].querySelectorAll("."+today())[0].classList.remove('next-lesson-bright');
    }
  }

  let times = new Date().toLocaleTimeString("de-DE", {timeZone: "Europe/Berlin"});
  var time =  times.split(":");
  // console.log(times);
  // var time = [7, 15];
  if (time[0] > 20){
    time[0] = 0;
  }
  let timeNUMBER = Number(time[0])  * 60 + Number(time[1]);
  let columnTIME = document.querySelectorAll(".godz");
  let columnNUMBER = document.querySelectorAll(".nr");
  let last = 0;

  for (let i = 1; i<columnTIME.length; i++) {
    //pobranie godziny z komórki
    let rowTIME = columnTIME[i].children[0].innerHTML;
    //podzielenie godziny na godzinę początkową i końcową
    let splitROW = rowTIME.split("-");
    let TIMEstart = Number(splitROW[0].split(":")[0]) * 60 + Number(splitROW[0].split(":")[1])
    let TIMEend = Number(splitROW[1].split(":")[0]) * 60 + Number(splitROW[1].split(":")[1])

    // console.log(i);
    let numberOFrow =  columnNUMBER[i].textContent;
    // console.log(numberOFrow);
    // console.log("czas start ", TIMEstart);
    // console.log("czas teraz ", timeNUMBER);
    // console.log("czas koniec ", TIMEend);
    numberOFrow++;
    
    let currentROW = document.getElementById("row"+numberOFrow);
    let nowLesson = currentROW.querySelectorAll('.'+today())[0];
    // console.log(nowLesson.textContent);
    if (TIMEstart <= timeNUMBER &&  timeNUMBER < TIMEend) {
      currentROW.classList.add('current-row-bright');

      if (currentROW.childElementCount == 7) {
        if (nowLesson.textContent !== ""){
          nowLesson.classList.add('current-lesson-bright');
        }
      }

    }
    if (last <= timeNUMBER &&  timeNUMBER < TIMEstart){
      currentROW.classList.add('next-row-bright');
      currentROW.childElementCount
      if (currentROW.childElementCount == 7) {
        if (nowLesson.textContent !== ""){
          nowLesson.classList.add('next-lesson-bright');
        }      }
    }
    last = TIMEend;
  }
}

function shortCHECK() {

  if (short){
    changeLenght(0, 1);
  }
}



function toggleNAV(current,next) {
  let classTOswitchNAV = [
    ["nav-open", "nav-close"],
    ["button-open-nav-open", "button-open-nav-close"],
    ["left-open","left-close"],
    ['right-open', "right-close"]
  ]

  classTOswitchNAV.forEach(element => {
    let MARKERS = document.querySelectorAll("."+element[current])
    for (let i = 0; i < MARKERS.length; i++) {
      const currentMARKER = MARKERS[i];
      currentMARKER.classList.remove(element[current]);
      currentMARKER.classList.add(element[next]);
    }
  });
}

function changeMOTIF(type) {
  // console.log("changeMOTIF");
  // console.log("dsfsghb");
  localStorage.setItem("motif", type);
  let next, current;
  if  (type == 'bright'){
    next = 0;
    current = 1;
    
  } 
  if (type == 'dark'){
    next = 1;
    current = 0;
    // console.log("dark");
  }
  darkclassLIST.forEach((element)=>{
    // console.log(element);
    let elementsTOchange = document.querySelectorAll("."+element[current]);
    // console.log(elementsTOchange);
    elementsTOchange.forEach((toCHANGE)=> {
      toCHANGE.classList.remove(element[current]);
      toCHANGE.classList.add(element[next]);
    });
  });
}

function loadMOTIF(){
  let lastMOTIF = localStorage.getItem("motif");

  if (lastMOTIF == undefined || lastMOTIF == null){
    lastMOTIF = "bright";
  }

  let MOTIFmarker = document.getElementById(lastMOTIF).innerHTML;
  
  let selectSelected = document.querySelectorAll(".select-selected")[0];
  selectSelected.innerHTML = MOTIFmarker+" <i class=\"fas fa-caret-down select-selected\"></i>";

  changeMOTIF(lastMOTIF);
}

function resize() {
  // console.log("resize");
  let view = document.getElementById("select-view");
  console.log(window.innerWidth);
  if (window.innerWidth >= 1200){
    // console.log("BIG");
    changeVIEW(dane1, true);
    view.style.display = "block";
  } else{
    // console.log("smal");
    changeVIEW(dane1, false);
    view.style.display = "none";

  }
}

var darkclassLIST = [
  ["color-holder-plan-legenda-bright","color-holder-plan-legenda-dark"],
  ["bg-color-nav-bright","bg-color-nav-dark"],
  ["bg-color-tytol-bright","bg-color-tytol-dark"],
  ["bg-credits-bright","bg-credits-dark"],
  ["bg-holder-search-bright", "bg-holder-search-dark"],
  ["bg-slider-bright", "bg-slider-dark"],
  ["bg-select-items-bright", "bg-select-items-dark"],
  ["color-tytol-items-bright", "color-tytol-items-dark"],
  ["bg-header-bright", "bg-header-dark"],
  ["bg-color-for-link-bright", "bg-color-for-link-dark"]
]
var currentMOTIF = "bright";
// var dane1 = {};
var fails = {};
var shorty = {};

var short = false;
if (localStorage.getItem("short") !== null) {
//   console.log("xx");
  short = localStorage.getItem("short");
  // console.log(localStorage.getItem("short"));
  if (short !== "false"){
    // console.log("short");
    let lenghtSWITCH = document.getElementById("change-lenght");
    lenghtSWITCH.setAttribute( "checked", "true" );
    changeLenght(0, 1);
    short = true;
  } else {
    // console.log("long");
    short = false;
  }
}

var IDplanu = 'o12';
if (localStorage.getItem("IDplanu") !== null) {
  IDplanu = localStorage.getItem("IDplanu");
}

var currentDAY = today();
// console.log(currentDAY);

// console.log(window.matchMedia);
if (localStorage.getItem("shortPATERN") == null) {
  fetch('./fail.json')
    .then(response => response.json())
    .then(data => loadfails(data))
    // .catch(error => {alert("Błąd połączenia z serwerem!")})
} else {
  // shorty = {}
  const storedObject = localStorage.getItem("shortPATERN");
  shorty = JSON.parse(storedObject);
  console.log(shorty); // Wyświetli "John"


  console.log(shorty);
}

const storedPLAN = localStorage.getItem("danePLANU");
if (storedPLAN == undefined) {
  var dane1 = {"wazny":""}
} else {
  dane1 = JSON.parse(storedPLAN);

}


console.log(localStorage.getItem("shortPATERN"));
fetch('./expiretime.json')
    .then(response => response.json())
    .then(response => {
      // console.log(response );
      console.log('rpzed if');
      console.log(dane1);
      if (dane1["wazny"] == response) {
          
          // const storedObject = localStorage.getItem("danePLANU");
          // let preview = JSON.parse(storedObject);
          console.log("wazny");
          load(dane1);
        } else{
          console.log("fe");
          fetch('./dane.json')
            .then(response => response.json())
            .then(data => {preLOAD(data)
            console.log("niko");})
            // .catch(error => {alert("Błąd połączenia z serwerem")})
        }
        console.log("po if");
      })
    .catch(error => console.log("Brak połączenia z serwerem."))

function preLOAD(data) {
  const serializedObject = JSON.stringify(data);
  localStorage.setItem("danePLANU", serializedObject)
  load(data)
  const storedObject = localStorage.getItem("danePLANU");
  let preview = JSON.parse(storedObject);
  console.log(preview);
}

document.addEventListener('DOMContentLoaded', function() {

// -----------------------------  zmiana motywu ------------------------------------
  var selectSelected = document.querySelectorAll(".select-selected")[0];
  var selectItems = document.querySelector(".select-items");
  
  selectSelected.addEventListener("click", function() {
    selectItems.classList.toggle("show");
    if (selectItems.classList.contains( "show")){
      selectSelected.style.borderBottomLeftRadius = "0";
      selectSelected.style.borderBottomRightRadius ="0";
      if (window.innerWidth <= 767){
        let left = document.getElementById("left")
        if (left.classList.contains("left-close")){
          toggleNAV(1, 0);
        }
      }
    } else{
      selectSelected.style.borderBottomLeftRadius = "";
      selectSelected.style.borderBottomRightRadius ="";
    }
  });
  
  var selectOptions = document.querySelectorAll(".select-items div");
  
  selectOptions.forEach(function(option) {
    option.addEventListener("click", function() {
      var value = this.innerHTML;
      changeMOTIF(option.id)
      selectSelected.innerHTML = value+" <i class=\"fas fa-caret-down select-selected\"></i>";
      selectItems.classList.remove("show");
      let selectSelectedChildren = selectSelected.getElementsByTagName("i");
      
      for (let index = 0; index < selectSelectedChildren.length; index++) {
        const element = array[index];
        element.classList.add("select-selected");
      }

    });
  });
  
  // zamykanie menu gdy kliknięto poza menu
  window.addEventListener("click", function(e) {
    if (!e.target.matches(".select-selected")) {
      selectItems.classList.remove("show");
      selectSelected.style.borderBottomLeftRadius = "";
      selectSelected.style.borderBottomRightRadius ="";
    }
  });
//-----------------------------------------------------------------------------------

//-------------------------- zmiana długości czasu lekcji --------------------------
    let changeLESSON = document.getElementById("change-lenght");
    
    changeLESSON.addEventListener("change", function() {
      if (short) {
        changeLenght(1, 0);
        short = false;
        localStorage.setItem("short", short);
        // console.log(localStorage.getItem("short"));
      } else {
        changeLenght(0, 1);
        short = true;
        localStorage.setItem("short", short);
        // console.log(localStorage.getItem("short"));
      }
    });
//-------------------------------------------------------------------------

//-------------------------- Zmiana widoku planu ------------------------------------
    let VIEWchange = document.getElementById("change-view");
    VIEWchange.addEventListener("change", function() {

      let row = document.getElementById("row1");
      if (row.childElementCount == 7) {
        changeVIEW(dane1, false);
      } else{
        changeVIEW(dane1, true);
      }
    });
//--------------------------------------------------------------------------

//---------------------------- Otwieranie i zamykanie pola nawigacji --------------------
    var buttonOPENnav = document.getElementById('button-close-nav');
    
    buttonOPENnav.addEventListener('click', function () {
      toggleNAV(0,1);
    });

    var buttonCLOSEnav = document.getElementById('button-open-nav')

    buttonCLOSEnav.addEventListener('click', function() {
      toggleNAV(1, 0);
    });

    var menuTOGGLE = document.getElementById("menu-toggle");

    menuTOGGLE.addEventListener("click", function(){
      let left = document.getElementById("left")
      // console.log(left.classList.contains("left-open"));
      if  (left.classList.contains("left-open")) {
        // console.log('grdthfg');
        toggleNAV(0,1);
      } else{
        // console.log("ertyui");
        toggleNAV(1,0);
      }
    });
//-------------------------------------------------------------------------

//----------------------------- obługo pola wyszukiwania ---------------------------------
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
        for (const planKEY in list[key]) {
          const name = list[key][planKEY];
          // console.log(name[0].toLowerCase());
          // console.log(search.value.toLowerCase());
          // console.log(name[0].toLowerCase().includes(search.value.toLowerCase()+""));
          
          let nameLOWER  = name+"";
          nameLOWER = nameLOWER.toLowerCase();
          if (nameLOWER.includes(search.value.toLowerCase()+"")){

            let position = document.createElement("button");
            position.innerHTML = name;
            // position.innerHTML = name[0];
            position.classList.add('przycisk-zmiany');
            position.setAttribute('name', planKEY);
            result.appendChild(position);
            result.innerHTML += "<br>";
            blockSEARCH.style.borderBottomLeftRadius = "0";
            blockSEARCH.style.borderBottomRightRadius = "0";
            blockSEARCH.style.marginBottom = "0";
            result.classList.add("result");
          }
        }
      }
    } else{
      blockSEARCH.style.borderBottomLeftRadius = "";
      blockSEARCH.style.borderBottomRightRadius = "";
      blockSEARCH.style.marginBottom = "";
      result.classList.remove("result");
      // result.style.border = "none";
    };
    var buttons = document.querySelectorAll('.przycisk-zmiany');
    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        let buttonID = button.getAttribute("name");
        handleButtonClick(buttonID);
        search.value = "";
        result.innerHTML = "";
      });
      
    });
    });
    const searchInput = search;
const searchResults = document.getElementById("results");

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const firstResult = searchResults.children[0]; // Wybierz pierwszy wynik z listy
    if (firstResult) {
      // Jeśli istnieje pierwszy wynik, wykonaj akcję (np. przejdź na stronę wyniku)
      // Tutaj możesz dodać kod, który obsłuży wybranie pierwszej opcji
      // loaderTABLE(dane1, firstResult.getAttribute("name"), 0)
      let blockSEARCH = document.getElementById("holder-search");
      let buttonID = firstResult.getAttribute("name");
        handleButtonClick(buttonID);
        search.value = "";
        blockSEARCH.style.borderBottomLeftRadius = "";
        blockSEARCH.style.borderBottomRightRadius = "";
        let result = document.getElementById("results");
        result.innerHTML = "";
    }
  }
});
});
//---------------------------------------------------------------------------

//--------------------- wykrywanie zmniejszenia się ekranu -------------------------
window.addEventListener("resize", function () {
  resize();
});