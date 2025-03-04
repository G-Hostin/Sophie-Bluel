const editBtn = document.getElementById("edit-btn");
const modal = document.getElementById("modalBox");
const modalBody = document.querySelector(".modal-body");
const closeBtn = document.querySelector(".modal-closeBtn");
const modalTitle = document.querySelector(".modal-title");
const modalWorks = document.querySelector(".modal-works");
const addBtn = document.getElementById("addPhotoBtn");

editBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

modalBody.addEventListener("click", (event) => {
  event.stopPropagation();
});
