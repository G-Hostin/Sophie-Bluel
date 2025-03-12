const loginForm = document.getElementById("login"); // Stocke le formulaire dans une variable

document.addEventListener("DOMContentLoaded", () => {
  const errorMessage = sessionStorage.getItem("errorMessage");
  if (errorMessage) {
    const errorElement = document.querySelector(".error-message"); // Récupére la div avec la class error-message
    errorElement.innerHTML = ""; // Vide la div pour éviter d'avoir plusieurs messages d'erreur quand on click plusieurs fois sur le bouton
    const error = document.createElement("p"); // créé une balise p
    error.classList.add("error-text"); //On ajoute une classe à la balise p pour pouvoir appliquer du style sur elle (si on applique sur error.message le style s'applique sur une div vide)
    error.innerText = errorMessage; //insere le texte d'erreur dans la balise p
    errorElement.appendChild(error); // place error (la balise p avec son texte) à l'intérieur de errorElement (la div qu'on a récupéré)
    sessionStorage.removeItem("errorMessage"); // supprime le message d'erreur du sessionStorage une fois qu'il a été affiché
  }
});

loginForm.addEventListener("submit", async (event) => {
  // Ajout d'un event listener sur le formulaire au moment du submit (async car il va y avoir un post API)
  event.preventDefault(); // empeche le comportement par defaut d'un submit (rechargement de la page)

  const email = document.getElementById("email").value; // email = la valeur qui est rentrée dans le champ email du formulaire au moment du clic submit
  const password = document.getElementById("password").value; // password = la valeur qui est rentrée dans le champ password du formulaire au moment du clic submit

  const jsonLoginValues = JSON.stringify({ email, password }); // converti les variables email et password en string json et les stock dans jsonLoginValues

  const response = await fetch("http://localhost:5678/api/users/login", {
    // Requete api à users/login
    method: "POST", // La requete va poster quelque chose sur l'API
    headers: { "Content-Type": "application/json" }, // json
    body: jsonLoginValues, // Envoi un objet qui contient une chaine de caracteres json avec les valeurs email et password pour les comparer à celles de l'API
  });
  const responseLogin = await response.json(); // Passe la reponse de l'API en format json

  if (response.ok) {
    // Si la reponse de l'API est ok (les identifiants sont corrects)
    window.localStorage.setItem("token", responseLogin.token); // stocke le token d'authentification dans le localStorage du navigateur

    window.location.href = "index.html"; // redirige automatiquement vers la page d'accueil
  } else {
    // Si la réponse API n'est pas ok (donc si les identifiants ne sont pas corrects)
    const errorElement = document.querySelector(".error-message"); // Récupére la div avec la class error-message
    errorElement.innerHTML = ""; // Vide la div pour éviter d'avoir plusieurs messages d'erreur quand on click plusieurs fois sur le bouton
    const error = document.createElement("p"); // créé une balise p
    error.classList.add("error-text"); //On ajoute une classe à la balise p pour pouvoir appliquer du style sur elle (si on applique sur error.message le style s'applique sur une div vide)
    error.innerText = "Erreur dans l’identifiant ou le mot de passe"; //insere le texte d'erreur dans la balise p
    errorElement.appendChild(error); // place error (la balise p avec son texte) à l'intérieur de errorElement (la div qu'on a récupéré)
  }
});
