const editBtn = document.getElementById("edit-btn"); // Recupere le bouton modifier pour ouvrir la modale
const modal = document.getElementById("modalBox"); // Recupere la modale
const modalBody = document.querySelector(".modal-body"); // Recupere le body de la modale
const closeBtn = document.querySelector(".modal-closeBtn"); // Recupere la croix pour fermer la modale
const closeBtnForm = document.querySelector(".modal-closeBtnForm"); // Recupere la croix pour fermer la deuxième modale (formulaire)
const modalTitle = document.querySelector(".modal-title"); // Recupere le titre de la modale
const modalWorks = document.querySelector(".modal-works"); // Recupere la div pour afficher les travaux de la modale
const addBtn = document.getElementById("addPhotoBtn"); // Recupere le bouton pour ajouter une photo
const backBtn = document.querySelector(".modal-previous"); // Recupere l'icone de fleche pour revenir à la premiere modale
const modalGallery = document.getElementById("modalGallery"); // Recupere la div qui contient la premiere modale
const modalForm = document.getElementById("modalForm"); // Recupere la div qui contient la deuxieme modale

editBtn.addEventListener("click", (event) => {
  // Ajoute un event listener pour le bouton modifier pour ouvrir la modale
  event.preventDefault(); // Empeche le comportement par default
  modal.style.display = "flex"; // Affiche la modale (qui a un display none dans son HTML)
  document.body.style.overflow = "hidden"; // Empeche le scroll sur le body quand la modale est ouverte
  displayWorksModal(); // Appelle la fonction qui affiche les travaux
});

closeBtn.addEventListener("click", () => {
  // Ajoute un event listener sur la croix pour fermer la modale
  modal.style.display = "none"; // N'affiche plus la modale
  document.body.style.overflow = "auto"; // Réactive le scroll sur le body
});

closeBtnForm.addEventListener("click", () => {
  // Ajoute un event listener sur la croix pour fermer la deuxieme modale (formulaire)
  modalForm.style.display = "none"; // N'affiche plus la deuxieme modale (formulaire)
  modalGallery.style.display = "flex"; // Réaffiche la premiere modale
  modal.style.display = "none"; // N'affiche plus la modale
  document.body.style.overflow = "auto"; // Réactive le scroll sur le body
});

modal.addEventListener("click", (event) => {
  // Ajoute un event listener sur toute la modale
  if (event.target === modal) {
    // Si le click est sur modal (zone sombre opacité 80% dans le fond, la "vraie" modale est modalBody)
    modalForm.style.display = "none"; // N'affiche plus la deuxieme modale (formulaire)
    modalGallery.style.display = "flex"; // Réaffiche la premiere modale
    modal.style.display = "none"; // N'affiche plus la modale
    document.body.style.overflow = "auto"; // Réactive le scroll sur body
  }
});

modalBody.addEventListener("click", (event) => {
  // Ajoute un event listener sur modalBody (la "vraie" modale)
  event.stopPropagation(); // Empeche la propagation de l'evenement click (la click ne va pas se propager à son parent (modal) qui aurait provoqué la fermeture de la modale)
});

function displayWorksModal() {
  // Fonction pour afficher les travaux dans la modale
  modalWorks.innerHTML = ""; // Vide la div qui doit contenir les travaux dans la modale

  globalWorks.forEach((work) => {
    // Parcours chaque travail de globalWorks
    const workElement = document.createElement("div"); // Créé une div workElement pour chaque travail
    workElement.classList.add("work-element"); // Ajoute une classe work-element à la div pour le css
    workElement.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}">
      <div class="delete-btn">
        <i class="fa-solid fa-trash-can"></i>
      </div>
    `; // Ajoute l'url de l'image et la balise alt dans la div workElement créée pour chaque travail + une div qui contient l'icone de poubelle
    modalWorks.appendChild(workElement); // La div créée devient l'enfant du container qui doit contenir les travaux dans la modale
  });
}

addPhotoBtn.addEventListener("click", () => {
  // On ajoute un event listener au bouton Ajouter une photo de la modale
  modalGallery.style.display = "none"; // Au click, fait disparaitre la premiere modale (vue gallerie)
  modalForm.style.display = "flex"; // Toujours sur ce même click, fait apparaitre la deuxieme modale (formulaire)
});

backBtn.addEventListener("click", () => {
  // On ajoute un event listener au bouton Fleche de retour de la deuxieme modale
  modalForm.style.display = "none"; // Au click, fait disparaitre la deuxieme modale (formulaire)
  modalGallery.style.display = "flex"; // Toujours sur ce même click, fait apparaitre la premiere modale (vue gallerie)
});
