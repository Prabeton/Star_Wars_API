// praca domowa - star wars api. ver.3 mam nadzieję ostatnia ;)
// <title> Star Wars ver.3 </title>
// miłego sprawdzania :)

const main = document.getElementById('main');
const $left_Container = document.getElementById("left_Container");
const $center_Container = document.getElementById("center_Container");
const $right_Container = document.getElementById("right_Container");
const suwak = document.getElementById('toggleSwitch');

suwak.addEventListener('click', function() {
    if (suwak.checked){
        console.log("checkbox jest zaznaczony");
        main.style.backgroundColor = 'grey';
        $left_Container.style.backgroundColor = 'green';
        $center_Container.style.backgroundColor = 'green';
        $right_Container.style.backgroundColor = 'green';
    } else {
        console.log("checkbox jest odznaczony");
        main.style.backgroundColor = '#05570b';
        $left_Container.style.backgroundColor = 'rgb(20, 46, 25)';
        $center_Container.style.backgroundColor = 'rgb(20, 46, 25)';
        $right_Container.style.backgroundColor = 'rgb(20, 46, 25)';
    }
});

const BASE_URL = "https://swapi.dev/api/";
const state = {};
let hederFlaga = false;
let page = 1;
let categoriaWyswietlana = "";

const $detailsBox = document.querySelector('#detailsBox');

const $powitalny = document.getElementById("powitalny");
 
// const $right_Container = document.querySelector("#right_Container");
const rightItem1 = document.createElement("div");
    rightItem1.classList.add("rightItem");
    $right_Container.appendChild(rightItem1);


const $buttonCC = document.querySelector("#buttonCC");
      $buttonCC.addEventListener("click", () => {
        console.log("Łączność OK! IDZIESZ NA PEWNĄ ŚMIERĆ!");
        alert("Łączność OK! IDZIESZ NA PEWNĄ ŚMIERĆ!");
        });


const $panel_Container = document.querySelector("#panel_Container")

let prevButton = document.createElement("button");
prevButton.classList.add("pagination");
let prevText = document.createTextNode("<-- poprzednia strona");
prevButton.appendChild(prevText);
$panel_Container.appendChild(prevButton);
              
let paginationInfo = document.createElement("div");
paginationInfo.classList.add("paginationInfo");
paginationInfo.innerHTML = `${page}`;
$panel_Container.appendChild(paginationInfo);
                
let nextButton = document.createElement("button");
nextButton.classList.add("pagination");
let nextText = document.createTextNode("następna strona -->");
nextButton.appendChild(nextText);
$panel_Container.appendChild(nextButton);

function refreshPaginationButton () {
    if (categoriaWyswietlana == "") {
            prevButton.disabled = true;
            nextButton.disabled = true;
    } else {
            prevButton.disabled = false; 
            nextButton.disabled = false;
    }
    if (page <=1) {
            prevButton.disabled = true;
    } else {
            prevButton.disabled = false;
    }
}

refreshPaginationButton();

nextButton.addEventListener("click", async() => {
    $detailsBox.classList.remove("detailsBox"); // zamykanie okna detailsów przy przejściu do innej strony 
    $detailsBox.innerHTML = "";                 
    page++;

    refreshPaginationButton();
    hederFlaga = false;
    await fetchDataFn(`https://swapi.dev/api/${categoriaWyswietlana}/?page=${page}`, `collectionsData.${categoriaWyswietlana}`, state.collectionsData);
          printTableFn(state.collectionsData[categoriaWyswietlana].results, categoriaWyswietlana);
    paginationInfo.innerHTML = `${page}`;
});

prevButton.addEventListener("click", async() => {
    $detailsBox.classList.remove("detailsBox"); 
    $detailsBox.innerHTML = "";                 
    page--;
    refreshPaginationButton();

    hederFlaga = false;
    await fetchDataFn(`https://swapi.dev/api/${categoriaWyswietlana}/?page=${page}`, `collectionsData.${categoriaWyswietlana}`, state.collectionsData);
          printTableFn(state.collectionsData[categoriaWyswietlana].results, categoriaWyswietlana);
    paginationInfo.innerHTML = `${page}`;
});


class People {
    constructor({ name, birth_year, gender, height, created }, index) {
        this.index = index;
        this.name = name;
        this.birth_year = birth_year;
        this.gender = gender;
        this.height = height;
        this.created = created;
    }        

    toHTML() {
        return `<tr id="row${categoriaWyswietlana}${this.index}">
            <td class="ID">${this.index + 1}</td>
            <td>${this.name}</td>
            <td>${this.birth_year}</td>
            <td>${this.gender}</td>
            <td>${this.height}</td>
            <td>${new Date(this.created).toLocaleDateString()}</td>
            <td>
                <button class="details">details</button>
                <button class="delete">delete</button>
            </td>
            <td>
                <input type="checkbox" name="${categoriaWyswietlana}${this.index}" value="${this.name}">
            </td>
        </tr>`;
    }
}        
        
class Planet {
    constructor ({name, climate, diameter, gravity, created}, index) {
        this.index = index;
        this.name = name;
        this.climate = climate;
        this.diameter = diameter;
        this.gravity = gravity;
        this.created = created;
    }

    toHTML () {
        return `<tr id="row${categoriaWyswietlana}${this.index}">
                    <td class="ID">${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.climate}</td>
                    <td>${this.diameter}</td>
                    <td>${this.gravity}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="${categoriaWyswietlana}${this.index}" value="${this.name}">
                    </td>
                </tr>`
    }
}

class Film {
    constructor ({title, director, producer, release_data, created}, index) {
        this.index = index;
        this.title = title;
        this.director = director;
        this.producer = producer;
        this.release_data = release_data;
        this.created = created;
    }
    
    toHTML () {
        return `<tr id="row${categoriaWyswietlana}${this.index}">
                    <td class="ID">${this.index +1}</td>
                    <td>${this.title}</td>
                    <td>${this.director}</td>
                    <td>${this.producer}</td>
                    <td>${this.release_data}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="${categoriaWyswietlana}${this.index}" value="${this.title}">
                    </td>
                </tr>`
    }
}       
        
class Species {
    constructor ({name, language, average_height, average_lifespan, created}, index) {
        this.index = index;
        this.name = name;
        this.language = language;
        this.average_height = average_height;
        this.average_lifespan = average_lifespan;
        this.created = created;
    }
    
    toHTML () {
        return `<tr id="row${categoriaWyswietlana}${this.index}">
                    <td class="ID">${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.language}</td>
                    <td>${this.average_height}</td>
                    <td>${this.average_lifespan}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="${categoriaWyswietlana}${this.index}" value="${this.name}">
                    </td>
                </tr>`
    }
}
        
class Starship {
    constructor ({name, manufacturer, model, cost_in_credits, created}, index) {
        this.index = index;
        this.name = name;
        this.manufacturer = manufacturer;
        this.model = model;
        this.cost_in_credits = cost_in_credits;
        this.created = created;
    }

    toHTML () {
        return `<tr id="row${categoriaWyswietlana}${this.index}">
                    <td class="ID">${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.manufacturer}</td>
                    <td>${this.model}</td>
                    <td>${this.cost_in_credits}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="${categoriaWyswietlana}${this.index}" value="${this.cost_in_credits}">
                    </td>
                </tr>`
    }
}
        
class Vehicle {
    constructor ({name, manufacturer, length, cost_in_credits, created}, index) {
        this.index = index;
        this.name = name;
        this.manufacturer = manufacturer;
        this.length = length;
        this.cost_in_credits = cost_in_credits;
        this.created = created;
    }

    toHTML () {
        return `<tr id="row${categoriaWyswietlana}${this.index}">
                    <td class="ID">${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.manufacturer}</td>
                    <td>${this.length}</td>
                    <td>${this.cost_in_credits}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button>
                    </td>
                    <td><input type="checkbox" name="${categoriaWyswietlana}${this.index}" value="${this.cost_in_credits}">
                    </td>
                </tr>`
    }
}


function addDeleteEventListeners() {
    
    const Rows = document.querySelectorAll('[id^="row' + categoriaWyswietlana + '"]');
                // znajduje elementy, kórych id zaczyna sie od.. row + kategoria +..
    Rows.forEach((row) => {
        const deleteButton = row.querySelector('.delete');
                // dla każdego wiersza znajduje element o klasie .delete
        deleteButton.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add("modal");
            modal.innerHTML = "Czy na pewno chcesz usunąć ten wiersz?";
            const buttonYes = document.createElement('button');
            buttonYes.classList.add('yes');
            buttonYes.innerHTML = "YES";
            buttonYes.addEventListener("click", () => {
                row.remove();
                modal.classList.toggle('hidden');
            });
            modal.appendChild(buttonYes);

            const buttonNo = document.createElement('button');
            buttonNo.classList.add('no');
            buttonNo.innerHTML = "NO";
            buttonNo.addEventListener("click", () => {
                modal.classList.toggle('hidden');
            });
            modal.appendChild(buttonNo);

            buttons_Container.appendChild(modal);
        });
    });
}

function addDetailsEventListeners() {
    const rows = document.querySelectorAll('[id^="row' + categoriaWyswietlana + '"]');
    rows.forEach((row) => {
        const detailsButton = row.querySelector('.details');
        
        
        detailsButton.addEventListener('click', () => {
            $detailsBox.classList.toggle("detailsBox"); 

            const closeDetails = document.createElement("button");
            closeDetails.classList.add("closeDetails");
            closeDetails.innerHTML = "Zamknij detale";
            closeDetails.addEventListener("click", () => {
                $detailsBox.classList.remove("detailsBox"); // Usuń klasę "detailsBox" po kliknięciu przycisku "Zamknij detale"
                $detailsBox.innerHTML = ""; // Wyczyść zawartość #detailsBox
            });


            $detailsBox.appendChild(closeDetails);
            const rowIndex = row.id.substring(categoriaWyswietlana.length + 3); // Pobiera indeks z id wiersza obcinając 3 znaki 
            const rowDetails = state.collectionsData[categoriaWyswietlana].results[rowIndex]; 
            
            const trescDetali = document.createElement('div');
            trescDetali.innerHTML = JSON.stringify(rowDetails, null, 2);
            $detailsBox.appendChild(trescDetali);
        });
    });
  }



        // (state.collectionsData[key].results, key)
function printTableFn (tablicaObjektow, category) {

    const $table_Container = document.querySelector("#table_Container");
    $table_Container.innerHTML = "";
    
    let html = "";
        tablicaObjektow.forEach((element, index) => {
            html += fillCategoryWithData (element, index, category);
        })

    $table_Container.innerHTML = html;
    addDeleteEventListeners();
    addDetailsEventListeners();
}


                            // (state.collectionsData)
function displayButton (collectionName) {
    const $buttons_Container = document.querySelector("#buttons_Container");
    Object.entries(collectionName).forEach(([key, value]) => {

        const button = document.createElement("button");
        button.innerHTML = key;
        button.classList.add("button");

        button.addEventListener("click", async () => {
            $detailsBox.classList.remove("detailsBox"); 
            $detailsBox.innerHTML = "";    
            $powitalny.classList.add("hidden");
            page = 1;
            paginationInfo.innerHTML = `${page}`;
            categoriaWyswietlana = key;
            refreshPaginationButton ();
            rightItem1.innerHTML = "";
            rightItem1.innerHTML = `*** ${categoriaWyswietlana} ***`;
            hederFlaga = false;
            await fetchDataFn(`${value}?page=${page}`, `collectionsData.${key}`, state.collectionsData);
            printTableFn(state.collectionsData[key].results, key);
            
        });
        $buttons_Container.appendChild(button);
    })
}

async function fetchDataFn (url, key, object) {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data:", data);
    toState(object, key, data);
}

function toState(object, key, data) {
    let currentObject = object;
    let keys = key.split(".");

    keys.forEach((value, i) => {
        if(!currentObject[value]){
            currentObject[value] = {}
        }
        if(i === keys.length - 1){
            currentObject[value] = data;
        }
    });
console.log("state:", state);
}



// (start)
(async function main (){
    await fetchDataFn (BASE_URL, "collectionsData", state);
    displayButton(state.collectionsData);
})();




// wypełnij kategorię danymi 
                                    // ( {} , i , category ) 
const fillCategoryWithData = (value, index, category) => {
    let html = "";

    const wstawCholeraTenHeder = (flaga) => {
        if (!flaga) {
            switch (true) {           // fajne to wstrzykiwanie html'a
                case category === "people":
                    html += `<tr class="heder">
                                <td>ID</td>
                                <td>NAME</td>
                                <td>BIRTH</td>
                                <td>GENDERON</td>
                                <td>HEIGHT</td>
                                <td>CREATED</td>
                            </tr>`;
                break;
                case category === "planets":
                    html += `<tr class="heder">
                                <td>ID</td>
                                <td>NAME</td>
                                <td>CLIMATE</td>
                                <td>DIAMETER</td>
                                <td>GRAVITY</td>
                                <td>CREATED</td>
                            </tr>`;
                break;
                case category === "films":
                    html += `<tr class="heder">
                                <td>ID</td>
                                <td>TITLE</td>
                                <td>DIRECTOR</td>
                                <td>PRODUCERUS</td>
                                <td>RELEASE</td>
                                <td>CREATED</td>
                            </tr>`;
                break;
                case category === "species":
                    html += `<tr class="heder">
                                <td>ID</td>
                                <td>NAME</td>
                                <td>LANGUAGE</td>
                                <td>HEIGHT</td>
                                <td>LIFESPAN</td>
                                <td>CREATED</td>
                            </tr>`;
                break;
                case category === "vehicles":
                    html += `<tr class="heder">
                                <td>ID</td>
                                <td>NAME</td>
                                <td>MANUFAKTURER</td>
                                <td>LENGTH</td>
                                <td>COST</td>
                                <td>CREATED</td>
                            </tr>`;
                break;
                case category === "starships":
                    html += `<tr class="heder">
                                <td>ID</td>
                                <td>NAME</td>
                                <td>MANUFAKTURER</td>
                                <td>MODEL</td>
                                <td>COST</td>
                                <td>CREATED</td>
                            </tr>`;
                break; 
            }
        } 
        hederFlaga = true;
    }
    
    switch(true){
        case category === "people":
            const people = new People(value, index);
            wstawCholeraTenHeder(hederFlaga);
            return (html += people.toHTML());
        
        case category === "planets":
            const planet = new Planet(value, index);
            wstawCholeraTenHeder(hederFlaga);
            return (html += planet.toHTML());
        
        case category === "films":
            const film = new Film(value, index);
            wstawCholeraTenHeder(hederFlaga);
            return (html += film.toHTML());
        
        case category === "species":
            const species = new Species(value, index);
            wstawCholeraTenHeder(hederFlaga);
            return (html += species.toHTML());
        
        case category === "starships":
            const starship = new Starship(value, index);
            wstawCholeraTenHeder(hederFlaga);
            return (html += starship.toHTML());
        
        case category === "vehicles":
            const vehicle = new Vehicle(value, index);
            wstawCholeraTenHeder(hederFlaga);
            return (html += vehicle.toHTML());
    }
}; 


const $function_Container = document.getElementById("function_Container");

const deleteChecked = document.createElement("button");
deleteChecked.classList.add('deleteChecked');
deleteChecked.innerHTML = "delete checked";
$function_Container.appendChild(deleteChecked);

deleteChecked.addEventListener("click", () => {
    const checkedCheckboxes = document.querySelectorAll('[name^="' + categoriaWyswietlana + '"]:checked');
    checkedCheckboxes.forEach((checkbox) => {
        const row = checkbox.closest('tr');  // closest('tr') 
                                        // szukamy najbliższego przodka (rodzica), który spełania
                                        // warunek, że jest <tr> czyli wierszem 
        row.remove();
      });
})





