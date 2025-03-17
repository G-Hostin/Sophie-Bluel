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
const photoForm = document.getElementById("photoForm");
const fileInput = document.getElementById("fileInput");
const titleInput = document.getElementById("title");
const validateBtn = document.getElementById("validateBtn");
const uploadBox = document.querySelector(".upload-box");
const successMessageContainer = document.querySelector(".modal-success-form"); // recupere la div modal-success-form et la stocke dans successMessageContainer

if (editBtn) {
  editBtn.addEventListener("click", (event) => {
    // Ajoute un event listener pour le bouton modifier pour ouvrir la modale
    event.preventDefault(); // Empeche le comportement par default
    modal.style.display = "flex"; // Affiche la modale (qui a un display none dans son HTML)
    document.body.style.overflow = "hidden"; // Empeche le scroll sur le body quand la modale est ouverte
    displayWorksModal(); // Appelle la fonction qui affiche les travaux
  });
}

closeBtn.addEventListener("click", () => {
  // Ajoute un event listener sur la croix pour fermer la modale
  modal.style.display = "none"; // N'affiche plus la modale
  document.body.style.overflow = "auto"; // Réactive le scroll sur le body
  resetForm();
});

closeBtnForm.addEventListener("click", () => {
  // Ajoute un event listener sur la croix pour fermer la deuxieme modale (formulaire)
  modalForm.style.display = "none"; // N'affiche plus la deuxieme modale (formulaire)
  modalGallery.style.display = "flex"; // Réaffiche la premiere modale
  modal.style.display = "none"; // N'affiche plus la modale
  document.body.style.overflow = "auto"; // Réactive le scroll sur le body
  resetForm();
});

modal.addEventListener("click", (event) => {
  // Ajoute un event listener sur toute la modale
  if (event.target === modal) {
    // Si le click est sur modal (zone sombre opacité 80% dans le fond, la "vraie" modale est modalBody)
    modalForm.style.display = "none"; // N'affiche plus la deuxieme modale (formulaire)
    modalGallery.style.display = "flex"; // Réaffiche la premiere modale
    modal.style.display = "none"; // N'affiche plus la modale
    document.body.style.overflow = "auto"; // Réactive le scroll sur body
    resetForm();
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
function tokenError(message = "Session expirée, veuillez vous reconnecter") {
  // prend en parametre message = "Session expirée, veuillez vous reconnecter"
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

let imagePreview = null;
let selectedFile = null;

validateBtn.disabled = true; // Desactive le bouton d'upload par default
validateBtn.classList.add("disabled"); // Ajoute une classe désactivé pour le css du btn

function checkFormValidity() {
  const title = titleInput.value.trim();
  const category = categorySelect.value;

  if (selectedFile && title && category) {
    validateBtn.disabled = false;
    validateBtn.classList.remove("disabled");
  } else {
    validateBtn.disabled = true; // Desactive le bouton d'upload par default
    validateBtn.classList.add("disabled"); // Ajoute une classe désactivé pour le css du btn
  }
}

titleInput.addEventListener("input", checkFormValidity); // Ajoute un event listener sur l'input du titre / l'event input s'active à chaque fois qu'un caractère est ajouté ou suppr / checkFormValidity est une reference au listener, pas de () sinon checkFormValidity est appelé au moment de l'ajout du listener et pas de l'event input
categorySelect.addEventListener("change", checkFormValidity); // Ajoute un event listener sur la selection de categorie / l'event change s'active à chaque fois que la selection change / checkFormValidity est une reference au listener, pas de () sinon checkFormValidity est appelé au moment de l'ajout du listener et pas de l'event change
fileInput.addEventListener("change", (event) => {
  // Ajoute un event listener sur l'upload de fichier / l'event change s'active à chaque fois qu'un fichier est selectionné
  const file = event.target.files[0]; // cible l'element html qui a declenché l'event et parcours la liste, JS considere les fichier comme une liste FileList donc [0] selectionne le premier (et le seul) fichier de la liste / Verif importante car si l'utilisateur clique pour upload un fichier, puis ferme la fenetre sans selectionner de fichier alors file = undefined

  if (file) {
    selectedFile = file;

    if (imagePreview) {
      uploadBox.removeChild(imagePreview);
    }

    const uploadElements = uploadBox.querySelectorAll("i, .textBtnUpload, p"); // Selectionne les icone et les 2 textes dans l'upload box
    uploadElements.forEach((element) => {
      // Parcours tous les elements de l'upload box un a un
      element.style.display = "none"; // Masque les elements de l'upload box
    });

    imagePreview = document.createElement("img");
    imagePreview.classList.add("image-preview");
    imagePreview.style.maxHeight = "170px";
    imagePreview.style.maxWidth = "100%";
    imagePreview.style.objectFit = "contain";

    imagePreview.src = URL.createObjectURL(file);
    uploadBox.appendChild(imagePreview);

    checkFormValidity();
  }
});

photoForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!selectedFile || !titleInput.value.trim() || !categorySelect.value) {
    showErrorMessageForm("Veuillez remplir tous les champs");
    return;
  }

  const token = localStorage.getItem("token");
  if (!token) {
    tokenError();
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("title", titleInput.value.trim());
  formData.append("category", parseInt(categorySelect.value));

  const response = await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (response.ok) {
    const newWork = await response.json();

    globalWorks.push(newWork);

    displayWorks();
    displayWorksModal();

    resetForm();

    showSuccessMessage("Projet ajouté avec succès !");
  } else {
    switch (response.status) {
      case 400:
        showErrorMessageForm("Veuillez remplir tous les champs correctement");
        break;
      case 401:
        tokenError();
        break;
      case 500:
        showErrorMessageForm("Erreur serveur. Veuillez réessayer plus tard");
        break;
      default:
        showErrorMessageForm("Une erreur est survenue. Veuillez réessayer");
    }
  }
});

function resetForm() {
  fileInput.value = "";
  titleInput.value = "";
  categorySelect.selectedIndex = 0;
  selectedFile = null;

  if (imagePreview) {
    uploadBox.removeChild(imagePreview);
    imagePreview = null;
  }

  successMessageContainer.innerHTML = "";

  const uploadElements = uploadBox.querySelectorAll("i, .textBtnUpload, p"); // Selectionne les icone et les 2 textes qui etaient masques dans l'upload box
  uploadElements.forEach((element) => {
    // Parcours tous les elements de l'upload box un a un
    element.style.display = ""; // Réaffiche les elements de l'upload box
  });

  validateBtn.disabled = true;
  validateBtn.classList.add("disabled");
}

function showErrorMessageForm(message) {
  // prend en paramètre le message a afficher
  const errorMessageContainer = document.querySelector(".modal-error-form"); // recupere la div modal-error-form et la stocke dans errorMessageContainer
  errorMessageContainer.innerHTML = ""; // vide la div pour eviter d'afficher plusieurs fois le message
  errorMessageContainer.classList.add("error-message"); // ajoute la classe error-message a la div
  const errorMessage = document.createElement("p"); // Créé une balise p et la stocke dans errorMessage
  errorMessage.classList.add("error-text"); // ajoute la classe error-text à la balise p
  errorMessage.innerText = message; // ajoute le message (en paramètre) dans la balise p
  errorMessageContainer.appendChild(errorMessage); // la balise p devient l'enfant de la div errorMessageContainer
}

function showSuccessMessage(message) {
  // prend en paramètre le message a afficher
  successMessageContainer.innerHTML = ""; // vide la div pour eviter d'afficher plusieurs fois le message
  successMessageContainer.classList.add("success-message"); // ajoute la classe success-message a la div
  const successMessage = document.createElement("p"); // Créé une balise p et la stocke dans successMessage
  successMessage.classList.add("success-text"); // ajoute la classe success-text à la balise p
  successMessage.innerText = message; // ajoute le message (en paramètre) dans la balise p
  successMessageContainer.appendChild(successMessage); // la balise p devient l'enfant de la div successMessageContainer
}
