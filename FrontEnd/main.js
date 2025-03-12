let globalWorks; // VAriable globale qui stocke les travaux
let globalCategories;

async function fetchWorks() {
  const response = await fetch("http://localhost:5678/api/works"); // API backend/works swagger
  if (!response.ok) {
    console.error("Erreur lors de la récupération de l'API"); // Message d'erreur dans la console si la reponse n'est pas true
    return []; // Tableau vide pour ne pas bloquer le code
  }
  globalWorks = await response.json(); // Passe la réponse en format JSON
}

function displayWorks() {
  const gallery = document.querySelector(".gallery"); // Sélectionne l'élément qui contient la galerie
  gallery.innerHTML = ""; // Vide la gallery avant d'y ajouter les éléments

  globalWorks.forEach((work) => {
    // Equivalent d'une boucle for et crée un élément HTML pour chaque work (work = globalWorks[i])

    const workElement = document.createElement("figure"); // Crée un élément figure

    // Ajoute l'image .imageUrl et une balise alt/legende avec .title
    workElement.innerHTML = `
          <img src="${work.imageUrl}" alt="${work.title}">
          <figcaption>${work.title}</figcaption>
        `;

    gallery.appendChild(workElement); // La figure créée devient l'enfant de gallery (inséré dans le HTMl)
  });
}

// Récupère et renvoie les catégories (avec "Tous" en premier)
async function fetchCategories() {
  const response = await fetch("http://localhost:5678/api/categories"); //Appel API pour récupérer les catégories (Swagger)
  const categoriesList = await response.json(); // Passe la réponse de l'API au format json et est stockée dans categoriesList
  globalCategories = categoriesList; // stocke le tableau categoriesList dans une variable globale pour s'en resservir ailleur (modal.js)
  return ["Tous", ...globalCategories.map((category) => category.name)]; // Création d'un tableau avec "Tous" en premier, puis ...categories (opérateur spread) va "étaler" les éléments contenus dans categories + // .map va parcourir la variable globalCategories et créer un nouveau tableau contenant les "name" de chaque categorie
}

// Génère les boutons de filtre
async function displayCategories() {
  const categories = await fetchCategories(); // Récupère la liste des catégories + "Tous"
  const filtersContainer = document.querySelector(".filters"); //filtersContainer = l'élément qui contiendra les boutons de filtres
  filtersContainer.innerHTML = ""; // Vide le conteneur si il y a déjà quelque chose (notamment avec du futur localStorage)

  categories.forEach((category) => {
    // Chaque élément du tableau categories (["Tous", ...categories])= une category
    const button = document.createElement("button"); // Créé un bouton à chaque élément
    button.textContent = category; // Met le nom de la catégorie comme texte sur le bouton (textContent = innerText pour les boutons)
    if (category === "Tous") {
      button.classList.add("selected");
    }
    button.addEventListener("click", () => {
      let allBtn = document.querySelectorAll(".filters button");
      allBtn.forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      filterWorks(category);
    }); // Lorsque le bouton est clické, cela lance la fonction filterWorks avec en argument la catégorie
    filtersContainer.appendChild(button); // Ajoute le bouton dans le conteneur de filtre filtersContainer
  });
}

// Filtre les travaux en fonction de la catégorie sélectionnée
function filterWorks(selectedCategory) {
  // selectedCategory = à la catégorie clickée grâce à l'appel filterWorks(category)
  const gallery = document.querySelector(".gallery"); // gallery = élément HTML qui contient la galerie
  gallery.innerHTML = ""; // Vide la gallerie pour ne pas afficher les travaux en double

  let filteredWorks; // Déclare une variable qui contiendra les travaux filtrés
  if (selectedCategory === "Tous") {
    //Si la catégorie sélectionnée est "Tous"
    filteredWorks = globalWorks; // filteredWorks = la liste des travaux entière
  } else {
    filteredWorks = globalWorks.filter(
      // .filter crée un nouveau tableau qui contient tous les éléments qui passent le test
      (work) => work.category.name === selectedCategory // Le test est : chaque work on vérifie si work.category.name est égal à la catégorie séléctionnée
    );
  }

  filteredWorks.forEach((work) => {
    // Pour chaque travail dans le tableau filtré
    const workElement = document.createElement("figure"); // Crée un élément figure
    workElement.innerHTML = `
      <img src="${work.imageUrl}" alt="${work.title}"> 
      <figcaption>${work.title}</figcaption>
    `; // Ajoute l'image .imageUrl et une balise alt/legende avec .title
    gallery.appendChild(workElement); // workElement contient la figure créée devient l'enfant de gallery (inséré dans le HTMl)
  });
}

async function runAppli() {
  // Fonction pour gérer l'ordre de lancement des fonctions et les temps de réponse
  await fetchWorks();

  displayCategories();
  displayWorks(); // Appel la fonction qui ajoute les travaux dans le HTML
}

runAppli();
