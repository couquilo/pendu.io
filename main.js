//récupération des données
const container = document.getElementById('container');
const container_pendu = document.getElementById('container_pendu');
const container_lettres = document.getElementById('container_lettres');
const container_reponse = document.getElementById('container_reponse');
const img_pendu = document.getElementById('img_pendu');
const all_lettres = [...document.getElementsByClassName('lettres')];
const reponse_input = document.getElementById('reponse');



//mot à trouver
let name = prompt('quel mot doit il trouver')
name = [...
    name
];

//ajout d'attribut onclick sur chaque lettre
all_lettres.map(elem => elem.addEventListener('click', iclicked));




let lettres_trouvées = [];
let nb_Erreur = 0;
const nombre_de_vies = 10;
actualisation_reponse_input()


function iclicked() {
    for (let i = 0; i < name.length; i++) {
        this.removeEventListener('click', iclicked)
        if (name[i] == this.innerText) {
            lettres_trouvées.push(name[i])
            this.style.backgroundColor = "blue"
            actualisation_reponse_input(this.innerText)
            break;
        }
        this.style.backgroundColor = "red"
        if (i == name.length - 1) {
            nb_Erreur += 1;
            actualisation_img_pendu(nb_Erreur);
            if (nb_Erreur == nombre_de_vies)
                perdu(nombre_de_vies)
        }
    }
}

//GAGNE
function gagne(nb_Erreur) {
    retire_tous_event_click(all_lettres)
    container_reponse.innerHTML = `<div id="gagne">Einstein a vécu ${nb_Erreur + 1} vies.</div><div id="gagne">
    <div>En vivant seulement ${nb_Erreur} vie(s) tu deviens donc meilleur que lui ! </div>`
}

// actualisation placeholder sur l'input
function actualisation_reponse_input() {
    reponse_input.placeholder = name.map(lettre => lettres_trouvées.find(lettre_trouvée => {
        if (lettre_trouvée == lettre)
            return lettre
    }) ? lettre : "*").join("");
    console.log(name.join(''))
    console.log(reponse_input.placeholde)
    if (reponse_input.placeholder == name.join('')) {
        gagne(nb_Erreur);
        console.log('onk')
    }
}

//PERDU
function perdu(nombre_de_vies) {
    retire_tous_event_click(all_lettres)
    container_reponse.innerHTML = `<div id="perdu">${nombre_de_vies} vies ne t'auront donc pas suffit ?!</div>`
}

// enlève tous l"event click() de chaque lettres
function retire_tous_event_click(all_lettres) {
    all_lettres = all_lettres.map(lettre => lettre.removeEventListener('click', iclicked))
}

//actualisation de l'image du pendu
function actualisation_img_pendu(nb_Erreur) {
    img_pendu.src = `img/${nb_Erreur}.png`;
    console.log(img_pendu.src)
}