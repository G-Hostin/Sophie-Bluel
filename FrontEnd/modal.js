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
const categorySelect = document.getElementById("category"); // Recupere le select de la liste déroulante

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
    let deleteBtn = workElement.querySelector(".delete-btn"); // recupere l'icone poubelle pour chaque travail
    deleteBtn.addEventListener("click", async () => {
      // ajoute un event listener sur l'icone
      await deleteWork(work.id, workElement); // appelle la fonction de suppression en prenant en paramètre l'id de chaque travail et la div qui contient les elements
    });
    modalWorks.appendChild(workElement); // La div créée devient l'enfant du container qui doit contenir les travaux dans la modale
  });
}

addPhotoBtn.addEventListener("click", () => {
  // On ajoute un event listener au bouton Ajouter une photo de la modale
  modalGallery.style.display = "none"; // Au click, fait disparaitre la premiere modale (vue gallerie)
  modalForm.style.display = "flex"; // Toujours sur ce même click, fait apparaitre la deuxieme modale (formulaire)
  displayCategoriesModal(); // Appelle la fonction qui fait apparaitre les catégories
});

backBtn.addEventListener("click", () => {
  // On ajoute un event listener au bouton Fleche de retour de la deuxieme modale
  modalForm.style.display = "none"; // Au click, fait disparaitre la deuxieme modale (formulaire)
  modalGallery.style.display = "flex"; // Toujours sur ce même click, fait apparaitre la premiere modale (vue gallerie)
});

function displayCategoriesModal() {
  // Fonction pour afficher les catégories dans la liste déroulante du form de la modale
  categorySelect.innerHTML = ""; // Vide la liste déroulante

  const defaultOption = document.createElement("option"); // Créé une option et stoke dans defaultOption
  defaultOption.value = ""; // La valeur de cette option est vide
  defaultOption.disabled = true; // defaultOption ne peut pas être selectionée par l'utilisateur
  defaultOption.selected = true; // Par defaut, c'est defaultOption qui est selectionnée
  categorySelect.appendChild(defaultOption); // defaultOption devient un enfant de la liste déroulante

  globalCategories.forEach((category) => {
    // Parcours le tableau globalCategories
    const option = document.createElement("option"); // Créé une option et le stocke dans option pour chaque catégorie
    option.value = category.id; // La valeur de l'option correspond à l'id de la catégorie sur l'API
    option.textContent = category.name; // Le texte de l'option correspond au nom de la catégorie
    categorySelect.appendChild(option); // L'option créée devient l'enfant de la liste déroulante
  });
}
// Fonction qui gere les erreurs de token
function tokenError(message = "Veuillez vous reconnecter") {
  // prend en parametre message = "Veuillez vous reconnecter"
  sessionStorage.setItem("errorMessage", message); // créer un item dans le sessionStorage avec la clé errorMessage et la valeur message
  window.location.href = "login.html"; // redirige directement sur la page de login
}
// Fonction pour afficher les message d'erreur dans la modale
function showErrorMessage(message) {
  // prend en paramètre le message a afficher
  errorMessageContainer = document.querySelector(".modal-error"); // recupere la div modal-error et la stocke dans errorMessageContainer
  errorMessageContainer.innerHTML = ""; // vide la div pour eviter d'afficher plusieurs fois le message
  errorMessageContainer.classList.add("error-message"); // ajoute la classe error-message a la div
  const errorMessage = document.createElement("p"); // Créé une balise p et la stocke dans errorMessage
  errorMessage.classList.add("error-text"); // ajoute la classe error-text à la balise p
  errorMessage.innerText = message; // ajoute le message (en paramètre) dans la balise p
  errorMessageContainer.appendChild(errorMessage); // la balise p devient l'enfant de la div errorMessageContainer
}
// Fonction qui supprime les travaux
async function deleteWork(workId, workElement) {
  // prend en paramètre l'id de chaque travail et la div qui contient l'image et l'icone
  const token = localStorage.getItem("token"); // recupere le token dans le localStorage

  if (!token) {
    // si il n'y a pas de token
    tokenError(); // Appel de la fonction de gestion des erreurs de token
    return;
  }

  const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
    // appel api avec le work.id de chaque work
    method: "DELETE", // supression
    headers: {
      Authorization: `Bearer ${token}`, // header avec le token pour l'autorisation
      "Content-Type": "application/json",
    },
  });
  switch (
    response.status // en fonction du status de la reponse API
  ) {
    case 200: // Element supprimé
    case 204: // Element supprimé et l'API ne renvoie rien
      workElement.remove(); // supprime la div du DOM
      globalWorks = globalWorks.filter((work) => work.id !== workId); // globalWorks se met a jour avec un nouveau tableau qui doit passer le test : work.id doit être différent de workId (=work.id de l'event listener) sinon il est supprimé
      displayWorks(); // Met a jour l'affichage de la galerie principale
      break;

    case 401: // le token n'est plus bon/ probleme d'autorisation
      tokenError(); // Appel la fonction de gestion des erreurs de token
      break;

    case 500: // Probleme coté serveur
      showErrorMessage("Erreur serveur : impossible de supprimer le projet."); // Appel la fonction d'affichage des messages d'erreur dans la modale avec en parametre le message "Erreur serveur : impossible de supprimer le projet."
      break;

    default: // Les autres erreurs
      showErrorMessage(
        `Erreur inconnue : ${response.status}. Veuillez réessayer` // Appel la fonction d'affichage des messages d'erreur dans la modale avec en parametre le message "Erreur inconnue : ${response.status}. Veuillez réessayer"
      );
  }
}
