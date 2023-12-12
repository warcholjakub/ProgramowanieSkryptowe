let rendered = 0
let text = [["Natenczas Wojski chwycił na taśmie przypięty",
    "Swój róg bawoli, długi, cętkowany, kręty",
    "Jak wąż boa, oburącz do ust go przycisnął,",
    "Wzdął policzki jak banię, w oczach krwią zabłysnął,",
    "Zasunął wpół powieki, wciągnął w głąb pół brzucha",
    "I do płuc wysłał z niego cały zapas ducha,",
    "I zagrał: róg jak wicher, wirowatym dechem",
    "Niesie w puszczę muzykę i podwaja echem."],

    ["Umilkli strzelcy, stali szczwacze zadziwieni",
    "Mocą, czystością, dziwną harmoniją pieni.",
    "Starzec cały kunszt, którym niegdyś w lasach słynął,",
    "Jeszcze raz przed uszami myśliwców rozwinął;",
    "Napełnił wnet, ożywił knieje i dąbrowy,",
    "Jakby psiarnię w nie wpuścił i rozpoczął łowy."],

    ["Bo w graniu była łowów historyja krótka:",
    "Zrazu odzew dźwięczący, rześki: to pobudka;",
    "Potem jęki po jękach skomlą: to psów granie;",
    "A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."]]


const setButton = document.getElementById("set_button");
const deleteButton = document.getElementById("delete_button");
const addButton = document.getElementById("add_button");

setButton.addEventListener("click", () => {set_css()})
deleteButton.addEventListener("click", () => {delete_css()})
addButton.addEventListener("click", () => {add_text()})

function set_common(element) {
    element.style.backgroundColor = "rgb(238, 255, 255)";
    element.style.border = "2px rgb(168,168,168) solid";
    element.style.boxShadow = "0px 0px 5px 0px rgb(66,68,90)";
    element.style.boxSizing = "border-box";
}

function remove_common(element) {
    element.style.backgroundColor = "";
    element.style.border = "";
    element.style.boxShadow = "";
    element.style.boxSizing = "";
}

function set_css() {
    // Header
    const header = document.getElementById("header");
    set_common(header);
    header.style.fontSize = "1vw";
    header.style.paddingLeft = "10px";
    header.style.margin = "1vw";

    // Nav
    const nav = document.getElementById("nav");
    set_common(nav);
    nav.style.fontSize = "0.8vw";
    nav.style.width = "9vw";
    nav.style.height = "4vw";
    nav.style.margin = "1vw";
    nav.style.marginBlock = "0px";
    nav.style.paddingLeft = "3.5vw";

    // Nav ul
    const nav_ul = document.getElementById("nav_ul");
    nav_ul.style.padding = "0px";

    // Main
    const main = document.getElementById("main");
    set_common(main);
    main.style.margin = "1vw";
    main.style.width = "33%"
    main.style.paddingBottom = "30px";

    // Main h1
    const main_h1 = document.getElementById("main_h1");
    main_h1.style.fontSize = "1.9vw";
    main_h1.style.paddingLeft = "20px";

    // Aside
    const aside = document.getElementById("aside");
    set_common(aside);
    aside.style.position = "relative";
    aside.style.top = "-5vw";
    aside.style.float = "right";
    aside.style.margin = "1vw";
    aside.style.paddingLeft = "25px";
    aside.style.width = "50%";
    aside.style.paddingBottom = "20px"

    // Aside h1
    const aside_h1 = document.getElementById("aside_h1")
    aside_h1.style.fontSize = "1.5vw"

    // Aside h2
    const aside_h2 = document.getElementById("aside_h2")
    aside_h2.style.fontSize = "1.2vw"

    // Aside ul
    const aside_ul = document.getElementById("aside_ul")
    aside_ul.style.fontSize = "0.9vw"

    // Footer
    const footer = document.getElementById("footer")
    set_common(footer)
    footer.style.fontSize = "0.8vw"
    footer.style.margin = "1vw"
    footer.style.padding = "10px"

}

function delete_css() {
    // Header
    const header = document.getElementById("header");
    remove_common(header);
    header.style.fontSize = "";
    header.style.paddingLeft = "";
    header.style.margin = "";

    // Nav
    const nav = document.getElementById("nav");
    remove_common(nav);
    nav.style.fontSize = "";
    nav.style.width = "";
    nav.style.height = "";
    nav.style.margin = "";
    nav.style.marginBlock = "";
    nav.style.paddingLeft = "";

    // Nav ul
    const nav_ul = document.getElementById("nav_ul");
    nav_ul.style.padding = "";

    // Main
    const main = document.getElementById("main");
    remove_common(main);
    main.style.margin = "";
    main.style.width = "";

    // Main h1
    const main_h1 = document.getElementById("main_h1");
    main_h1.style.fontSize = "";
    main_h1.style.paddingLeft = "";

    // Aside
    const aside = document.getElementById("aside");
    remove_common(aside);
    aside.style.position = "";
    aside.style.top = "";
    aside.style.float = "";
    aside.style.margin = "";
    aside.style.paddingLeft = "";
    aside.style.width = "";
    aside.style.paddingBottom = "";

    // Aside h1
    const aside_h1 = document.getElementById("aside_h1");
    aside_h1.style.fontSize = "";

    // Aside h2
    const aside_h2 = document.getElementById("aside_h2");
    aside_h2.style.fontSize = "";

    // Aside ul
    const aside_ul = document.getElementById("aside_ul");
    aside_ul.style.fontSize = "";

    // Footer
    const footer = document.getElementById("footer");
    remove_common(footer);
    footer.style.fontSize = "";
    footer.style.margin = "";
    footer.style.padding = "";
}

function add_text() {
    const main_bc = document.getElementById("main_bc")
    for (i = 0; i < text[rendered].length; i++){
        main_bc.appendChild(document.createTextNode(text[rendered][i]));
        main_bc.appendChild(document.createElement("br"));
    }
    main_bc.appendChild(document.createElement("br"))
    rendered++;
    if (rendered === 3){
        document.getElementById("add_button").disabled = true;
    }
}