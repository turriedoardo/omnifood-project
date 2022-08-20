console.log("Hello world!");

const myName = "Edoardo Turri";

// @ seleziona solo il primo degli elementi con quella classe
const h1 = document.querySelector(".heading-primary");

console.log(myName);
console.log(h1);

// h1.addEventListener("click", function () {
// @ modifico
// il testo dell'elemento
// h1.textContent = myName;

/*
posso modificare lo stile di un elemento. le proprietà che in css prevedono un trattino, in js si scrivono utilizzando il camel case
*/
// h1.style.backgroundColor = "red"; // il valore della proprietà deve essere specificato tra apici
// h1.style.padding = "5rem";
// });

// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
    // @ TOGGLE
    // toggle serve per aggiungere la classe all'elemento quando non la possiede, o rimuovergliela se la possiede. La classe va specificata come parametro, SENZA USARE IL PUNTO
    // non funziona su Safari
    headerEl.classList.toggle("nav-open");
});

// Smooth scrolling animation - bisogna sovrascrivere il comportamento di default dei link per fare in modo che anche su Safari funzioni lo smooth scrolling
const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
        // elimina il comportamento di default del link (cioè rimandare ad un'altra pagina o un'altra sezione della pagina)
        e.preventDefault();
        const href = link.getAttribute("href");

        // Scroll back to top
        if (href === "#")
            // riporto la finestra all'inizio della pagina
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });

        // Scroll to other links
        if (href !== "#" && href.startsWith("#")) {
            const sectionEl = document.querySelector(href);
            sectionEl.scrollIntoView({ behavior: "smooth" });
        }

        // close mobile navigation
        if (link.classList.contains("main-nav-link"))
            // @ nota bene
            // toggle aggiunge la classe nav-open all'elemento, ma se non è rispettata la condizione della media query, non succede nulla
            headerEl.classList.toggle("nav-open");
    });
});

// sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
    function (entries) {
        const ent = entries[0];
        console.log(ent);
        //@ instersecting
        // se l'elemento non interseca la root specificata sotto (cioè non c'è intersezione tra il section hero e almeno 80px più in basso del bordo in alto della pagina), allora viene aggiunta al classe sticky al body. Quando si scrolla verso l'alto e l'intersezione risulta verificata, si rimuove la classe

        if (ent.isIntersecting === false) {
            document.body.classList.add("sticky");
        }

        if (ent.isIntersecting === true) {
            document.body.classList.remove("sticky");
        }
    },
    {
        // controllo l'elemento all'interno dell'intera finestra del browser
        root: null,
        // significa che l'osservatore (obs) restituisce un segnale non appena lo 0% dell'elemento osservato (sectionHeroEl in questo caso) è all'interno del viewport (i valori vanno da 0 a 1)
        threshold: 0,
        rootMargin: "-80px",
    }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1;
    flex.parentNode.removeChild(flex);
    console.log(isSupported);

    if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*

*/
