// praca domowa - star wars api. ver.3 mam nadzieję ostatnia ;)
// <title> Star Wars ver.3 </title>
// miłego sprawdzania :)
const BASE_URL = "https://swapi.dev/api/";
const state = {};
let header = false;

const $buttonSW = document.querySelector("#buttonSW");
$buttonSW.addEventListener("click", () => {
    console.log("IDZIESZ NA PEWNĄ ŚMIERĆ!");
        alert("IDZIESZ NA PEWNĄ ŚMIERĆ!");
})



function printTableFn (tablicaObjektow, category) {
    const $tableContainer = document.querySelector("#tableContainer");
    $tableContainer.innerHTML = "";
    header = false;
    let html = "";
        tablicaObjektow.forEach((element, index) => {
            html += fillCategoryWithData (element, index, category);
        })
    $tableContainer.innerHTML = html;
}




function displayButton (collectionName) {
    
    const $buttonsContainer = document.querySelector("#buttonsContainer");
    Object.entries(collectionName).forEach(([key, value]) => {
        const button = document.createElement("button");
        button.innerHTML = key;
        button.classList.add("button");
        button.addEventListener("click", async () => {
            const $dataContainer = document.querySelector("#dataContainer");
            $dataContainer.immerHTML = "";
            await fetchDataFn(`${value}?page=1`, `collectionsData.${key}`, state.collectionsData);
            printTableFn(state.collectionsData[key].results, key);
        });
        
        $buttonsContainer.appendChild(button);
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
                    <td><button class="details person index${this.index}">details</button>
                        <button class="delete person index${this.index}">delete</button></td>
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
                    <td><button class="details person index${this.index}">details</button>
                        <button class="delete person index${this.index}">delete</button></td>
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
                    <td><button class="details person index${this.index}">details</button>
                        <button class="delete person index${this.index}">delete</button></td>
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
                    <td><button class="details person index${this.index}">details</button>
                        <button class="delete person index${this.index}">delete</button></td>
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
                    <td><button class="details person index${this.index}">details</button>
                        <button class="delete person index${this.index}">delete</button></td>
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
                    <td><button class="details person index${this.index}">details</button>
                        <button class="delete person index${this.index}">delete</button></td>
                </tr>`
    }
}

// wypełnij kategorię danymi 
// tutaj funkcja jako stała 
const fillCategoryWithData = (value, index, category) => {
    let html = "";
    
    switch(true){
        case category === "people":
            const people = new People(value, index);
            return (html += people.toHTML());
        
        case category === "planets":
            const planet = new Planet(value, index);
            return (html += planet.toHTML());
        
        case category === "films":
            const film = new Film(value, index);
            return (html += film.toHTML());
        
        case category === "species":
            const species = new Species(value, index);
            return (html += species.toHTML());
        
        case category === "starships":
            const starship = new Starship(value, index);
            return (html += starship.toHTML());
        
        case category === "vehicles":
            const vehicle = new Vehicle(value, index);
            return (html += vehicle.toHTML());
    }
}; 






