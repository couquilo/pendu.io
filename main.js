//récupération des données
const container = document.getElementById('container');
const container_pendu = document.getElementById('container_pendu');
const container_lettres = document.getElementById('container_lettres');
const container_reponse = document.getElementById('container_reponse');
const img_pendu = document.getElementById('img_pendu');
const all_lettres = [...document.getElementsByClassName('lettres')];
const reponse = document.getElementsByClassName('fin')[1]


let name = prompt('quel mot doit il trouver')
name = [...
    name
];

//ajout d'attribut onclick sur chaque lettre
all_lettres.map(elem => elem.addEventListener('click', iclicked));



let lettres_trouvées = [];
let nb_Erreur = 0;
const nombre_de_vies = 10;
const false_color = '#aa2b1d';
const true_color = '#cdc733';
actualisation_reponse()


function iclicked() {
    for (let i = 0; i < name.length; i++) {
        this.removeEventListener('click', iclicked)
        if (name[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "") == this.innerText.toLowerCase()) {
            lettres_trouvées.push(name[i])
            this.style.backgroundColor = true_color;
            actualisation_reponse(this.innerText)
            break;
        }
        this.style.backgroundColor = false_color;
        if (i == name.length - 1) {
            console.log('ok')
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
    container_reponse.innerHTML = `
    <div class="fin">Bien joué ! La réponse était <span id="user_word_choice">${name.join('')}</span>.<br>
        Einstein a vécu ${nb_Erreur + 1} vies.<br>
        En vivant seulement ${nb_Erreur} vie(s) tu deviens donc meilleur que lui ! 
    </div>
    `
}

// actualisation innerText sur l'input
function actualisation_reponse() {
    reponse.innerText = name.map(lettre => lettres_trouvées.find(lettre_trouvée => {
        if (lettre_trouvée == lettre)
            return lettre
    }) ? lettre : "*").join("");
    if (reponse.innerText == name.join('')) {
        gagne(nb_Erreur);
    }
}

//PERDU
function perdu(nombre_de_vies) {
    retire_tous_event_click(all_lettres)
    container_reponse.innerHTML = `
    <div class="fin">
        ${nombre_de_vies} vies ne t'auront donc pas suffit ?!
        <br>
        Bon allé je t'aide. La réponse était <span id="user_word_choice">${name.join('')}</span>.
    </div>
    `
}

// enlève tous l"event click() de chaque lettres
function retire_tous_event_click(all_lettres) {
    all_lettres = all_lettres.map(lettre => lettre.removeEventListener('click', iclicked))
}

//actualisation de l'image du pendu
function actualisation_img_pendu(nb_Erreur) {
    img_pendu.src = `img/${nb_Erreur}.svg` || `img/${nb_Erreur}.png`;
    console.log(img_pendu.src)
}