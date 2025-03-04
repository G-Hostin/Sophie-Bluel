const token = window.localStorage.getItem("token"); // Recupere le token qu'on à stocké dans localStorage après le login
const loginElement = document.getElementById("login-header"); // Recupere le li qui correspond à "login/logout" dans le header

if (token) {
  // Si le token est ok
  const body = document.body; // Stocke le body dans une variable body
  const editMode = document.createElement("div"); // stocke une div qui vient d'être créée dans une variable editMode
  editMode.classList.add("edit-mode"); // Ajoute la classe edit-mode pour cette div (pour le css)
  editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i><p>Mode édition<p>`; // Ajoute l'icône et le texte dans cette div
  body.insertBefore(editMode, body.firstChild); // Insere la div editMode avant le premier enfant de body (elle devient donc le premier enfant)

  const portfolio = document.getElementById("portfolio"); // Recupere la section portfolio
  const portfolioTitle = document.querySelector("#portfolio h2"); // Recupere le titre de la section portfolio

  const editProject = document.createElement("div"); // Créé et stocke une div dans editProject
  editProject.classList.add("edit-project"); // Ajoute la classe edit-project à cette div

  portfolio.insertBefore(editProject, portfolio.firstChild); // Insere la div editProject avant le premier enfant de portfolio (elle devient donc le premier enfant)
  editProject.appendChild(portfolioTitle); // Place le titre dans cette div
  editProject.insertAdjacentHTML(
    "beforeend",
    `<a href="#" id="edit-btn" target="_blank"><i class="fa-regular fa-pen-to-square"></i><p>modifier</p></a>`
  ); // Insere le HTML (lien avec une icone et du texte) après le titre

  const filtersContainer = document.querySelector(".filters"); // Recupere la div qui contient les boutons de filtres
  filtersContainer.style.display = "none"; // N'affiche plus les boutons de filtres

  loginElement.innerHTML = `<a href="#" id="logout-link">logout</a>`; // Remplace le HTML du li loginElement par un lien avec ecrit logout (qui a un id logout-link)
  const logoutLink = document.getElementById("logout-link"); //Recupère le logout-link
  logoutLink.addEventListener("click", (event) => {
    // Ajoute un event listener
    event.preventDefault(); // Empeche le comportement par défault
    window.localStorage.clear(); // Nettoie/supprime le localStorage de la page
    window.location.reload(); // Recharge la page (il n'y aura donc plus de localStorage et la condition if ligne 4 n'est plus vraie)
  });
} else {
  loginElement.innerHTML = `<a href="login.html">login</a>`; // Le texte login devient un lien qui renvoie vers la page login.html
}
