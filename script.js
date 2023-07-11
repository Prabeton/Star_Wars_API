// praca domowa - star wars api. ver.3 mam nadzieję ostatnia ;)
// <title> Star Wars ver.3 </title>
// miłego sprawdzania :)

const BASE_URL = "https://swapi.dev/api/";
const state = {};
let hederFlaga = false;
let page = 1;
let categoriaWyswietlana = "";


const $right_Container = document.querySelector("#right_Container");
const rightItem1 = document.createElement("div");
rightItem1.classList.add("rightItem");
$right_Container.appendChild(rightItem1);


const $buttonCC = document.querySelector("#buttonCC");
    $buttonCC.addEventListener("click", () => {
        console.log("Łączność OK! IDZIESZ NA PEWNĄ ŚMIERĆ!");
        alert("Łączność OK! IDZIESZ NA PEWNĄ ŚMIERĆ!");
        });


                            // (state.collectionsData[key].results, key)
function printTableFn (tablicaObjektow, category) {

    const $table_Container = document.querySelector("#table_Container");
    $table_Container.innerHTML = "";
    
    let html = "";
        tablicaObjektow.forEach((element, index) => {
            html += fillCategoryWithData (element, index, category);
        })

    $table_Container.innerHTML = html;
}



                            // (state.collectionsData)
function displayButton (collectionName) {
    const $buttons_Container = document.querySelector("#buttons_Container");
    Object.entries(collectionName).forEach(([key, value]) => {

        const button = document.createElement("button");
        button.innerHTML = key;
        button.classList.add("button");

        button.addEventListener("click", async () => {
            categoriaWyswietlana = key;
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




class People {
    constructor ({name, birth_year, gender, height, created}, index) {
        this.index = index;
        this.name = name;
        this.birth_year = birth_year;
        this.gender = gender;
        this.height = height;
        this.created = created;
    }
    
    toHTML () {
        return `<tr id="rowPeople${this.index}">
                    <td>${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.birth_year}</td>
                    <td>${this.gender}</td>
                    <td>${this.height}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="people${this.index}" value="${this.name}">
                    </td>
                </tr>`
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
        return `<tr id="rowPlanet${this.index}">
                    <td>${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.climate}</td>
                    <td>${this.diameter}</td>
                    <td>${this.gravity}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="planet${this.index}" value="${this.name}">
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
        return `<tr id="rowFilm${this.index}">
                    <td>${this.index +1}</td>
                    <td>${this.title}</td>
                    <td>${this.director}</td>
                    <td>${this.producer}</td>
                    <td>${this.release_data}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="film${this.index}" value="${this.title}">
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
        return `<tr id="rowSpecies${this.index}">
                    <td>${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.language}</td>
                    <td>${this.average_height}</td>
                    <td>${this.average_lifespan}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="species${this.index}" value="${this.name}">
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
        return `<tr id="rowStarship${this.index}">
                    <td>${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.manufacturer}</td>
                    <td>${this.model}</td>
                    <td>${this.cost_in_credits}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button></td>
                    <td><input type="checkbox" name="starship${this.index}" value="${this.cost_in_credits}">
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
        return `<tr id="rowVehicle${this.index}">
                    <td>${this.index +1}</td>
                    <td>${this.name}</td>
                    <td>${this.manufacturer}</td>
                    <td>${this.length}</td>
                    <td>${this.cost_in_credits}</td>
                    <td>${new Date(this.created).toLocaleDateString()}</td>
                    <td><button class="details">details</button>
                        <button class="delete">delete</button>
                    </td>
                    <td><input type="checkbox" name="vehicle${this.index}" value="${this.cost_in_credits}">
                    </td>
                </tr>`
    }
}

// wypełnij kategorię danymi 
                                    // ( {} , i , category ) 
const fillCategoryWithData = (value, index, category) => {
    let html = "";

    const wstawCholeraTenHeder = (flaga) => {
        if (!flaga) {
            switch (true) {           // fajne to wstrzykiwanie html'a
                case category === "people":
                    html += `<tr class="heder">
                                <td>id</td>
                                <td>name</td>
                                <td>birth</td>
                                <td>genderon</td>
                                <td>height</td>
                                <td>created</td>
                            </tr>`;
                break;
                case category === "planets":
                    html += `<tr class="heder">
                                <td>id</td>
                                <td>name</td>
                                <td>climate</td>
                                <td>diameter</td>
                                <td>gravity</td>
                                <td>created</td>
                            </tr>`;
                break;
                case category === "films":
                    html += `<tr class="heder">
                                <td>id</td>
                                <td>title</td>
                                <td>director</td>
                                <td>producerus</td>
                                <td>release</td>
                                <td>created</td>
                            </tr>`;
                break;
                case category === "species":
                    html += `<tr class="heder">
                                <td>id</td>
                                <td>name</td>
                                <td>language</td>
                                <td>height</td>
                                <td>lifespan</td>
                                <td>created</td>
                            </tr>`;
                break;
                case category === "vehicles":
                    html += `<tr class="heder">
                                <td>id</td>
                                <td>name</td>
                                <td>manufacturer</td>
                                <td>length</td>
                                <td>cost</td>
                                <td>created</td>
                            </tr>`;
                break;
                case category === "starships":
                    html += `<tr class="heder">
                                <td>id</td>
                                <td>name</td>
                                <td>manufacturer</td>
                                <td>model</td>
                                <td>cost</td>
                                <td>created</td>
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

// pagination section ;)
const $panel_Container = document.querySelector("#panel_Container")

let prevButton = document.createElement("button");
let prevText = document.createTextNode("poprzednia strona");
prevButton.appendChild(prevText);
$panel_Container.appendChild(prevButton);

let nextButton = document.createElement("button");
let nextText = document.createTextNode("następna strona");
nextButton.appendChild(nextText);
$panel_Container.appendChild(nextButton);

let paginationInfo = document.createElement("p");
let paginationText = document.createTextNode("czemu sie nie wyświetla?");
paginationInfo.appendchild(paginationText);
$panel_Container.appendChild(paginationInfo);





