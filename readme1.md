Zadania do rozwiązania po live'ie w celu dozrozumienia tematu z live.

        1. Zmodyfikuj metodę addToState w taki sposób, żeby kolekcje danych zapisywyały się w collectionsData
        pod odpowiednimi kluczami nazwy kolekcji i.e.films, species, starships etc.

        2. Po kliknięciu w daną kolekcję wyświetl wszystkie itemy jako listę <ul> <li>
        HINT użyj document.createElement, getElementById, appendChild

        3. Po kliknięciu w każdy element listy wykonaj fetchowanie za pomocą async await szczegółów danego itema (property url) a następnie zapisz wynik do stanu aplikacji pod kluczem collectionsData[kolekcja][name] = {}, collectionsData.people.Luke = {}

----------------------------------- Zasadnicza część pracy domowej: ---------------------

Deadline - ?
Przydatne linki:
API - https://swapi.dev/
Dokumentacja SWAPI - https://swapi.dev/documentation
SWAPI jest otwartym API, w którym znajdziemy dane z universum STAR WARS
CEL: Implementacja interaktywnej aplikacji www

----------------------------------------------- *** -------------------------------------
      
        1. Stwórz pliki:
        index.html
        script.js
        style.css

        2. podłącz plik script i style do index.html

        3. fetchDATA(BASE_URL) 
        Napisz funkcję pobierającą linki do dostępnych danych w SWAPI
        https://swapi.dev/api/ (BASE_URL)


        4. BUTTONY Z KOLEKCJAMI
        Stwórz na górze strony przyciski bazujące na danych, które zejdą po wykonaniu funkcji z punktu '3'
        *miej na uwadze że dane pochodzące z API mogą być różne, dlatego bazuj tylko na danych, które zejdą z API, nie pisz na sztywno nazw filmy/postacie itd.


        5. fetchDATA 2 === fetchData
        Po kliknięciu w przycisk wywołaj odpowiedni endpoint pobierający daną kolekcję danych.
        np. przycisk films powienien pobierać dane z https://swapi.dev/api/films/
        *napisz funcję z punktu '3' w taki sposób, żeby można ją było używać także tutaj.



        6. KLASA / KONSTRUKTOR -  DLA KAŻDEJ KOLEKCJI (4 PARAMETRY Z MODELU) 
        Przygotuj dla każdej kolekcji klasę, która w konstruktorze przyjmie co najmniej 4 parametry pochodzące z modelu, który pobierzesz, następnie dla całej listy stwórz tablicę obiektów, które będą instancjami danej klasy films/people/planets/species/starships/vehicles
        *jeżeli znajdziesz jakiekolwiek punkty wspólne, możesz pokusić się o dziedziczenie po klasie bazowej


        7. TABELKA ITEMÓW
        / ID=1,2,..., / NAGŁÓWKI[NAME] / 'CREATTED' DD-MM-YY / DETAILS (CLOSE) / DELETE (YES/NO) / 
        
        Na podstawie stworzonych obiektów wyświetl tabelkę, w której - nagłówkami będą nazwy właściwości obiektów - ostatnią kolumną będzie data 'created' przeformatowana do formatu DD-MM-YY - pierwszą kolumną będzie # liczba porządkowa 1,2,3... - na końcu każdego wiersza pojawią się 2 przyciski/ikony, DELETE i DETAILS. 

7a. Po kliknięciu w DETAILS wyświetl listę po lewej stronie ekranu, a po prawej pokaż rozszerzony widok konkretnego modelu - na widoku modelu dodaj przycisk close, który zamknie detailsy i ponownie wyświetli listę na środku ekranu. 

7b. Kliknięcie DELETE wyświetla modal: "Are you sure", z przyciskami YES i NO, po kliknięciu YES usuwamy element z listy, po kliknięciu NO zamykamy modal


8. PAGINACJA / WALIDACJA / SELECT 
Do tabelki dodaj:
- paginację - poprzednia strona (z zablokowaniem < 1) - następna strona (oblicz ilość stron na podstawie ilosci wynikow i ilosci wyswietlonych elementow na 1 stronie)
- input, w którym możemy wpisać do której strony chcemy przejść (walidacja) 
- select, w którym możemy zmienić ilość elementów wyświetlanych na stronie.


9. * 1 UNIKALNA FUNKCJA W WIDOKU MODELU (np. OPIS MODELU)
Widok każdego modelu, powinen zawierać unikalną funkcję zaimplementowaną na klasie danego modelu
np. dla films mógłby to być przycisk, który po kliknięciu w model wyświetli opis tego filmu


10. **  2 X WYSZUKIWARKA PO PARAMETRACH (BEZ ENDPOINTU)
Zaimplementuj 2 rodzaje wyszukiwarki: 

        1 - za pomocą użycia odpowiednich parametrów w endpointach konkretnych modeli 
        2 - za pomocą przeszukiwania tabelki(tablicy) bez używania endpointu.


11. *** 3 FUNKCJONALNOŚCI 
Dodaj 3 ukryte funkcjonalności, które wszystkich zaskoczą
np. po klinięciu 'enter' wyświetli się komunikat GAME OVER i otworzy się nowa karta w przeglądarce
po najechaniu myszką na logo, bądź inny element odpali się dźwięk/film/animacja
w tym zadaniu liczy się Wasza kreatywność, znajdźcie coś co nas zaskoczy 


12. **** CHECKBOX'Y NA WIERSZACH  
Dodaj możliwośc zaznaczania checkboxem wierszy na tabelce, dzięki czemu na raz będziemy mogli usunąć kilka itemów z listy, a nie tylko jeden


14. Funkcjonalność zmiany THEMING'U z jasnego na ciemny i odwrotnie.

-------------------------------------------- *** ---------------------------------------------------------

13. ***** GRA Z KOMPUTEREM // to powinna być karcianka (grasz lukiem kontra waderem)
korzystając z wiedzy zdobytej podczas tworzenia gry, spróbuj za pomocą modelu(klasy) postaci zaimplementować walkę 2 postaci jedna postać niech to będzie "sztuczna inteligencja", zaimplementowana za pomocą ifów drugą postacią będziemy grać my, czyli musi być opcja wygrania i przegrania z przeciwnikiem `:)`