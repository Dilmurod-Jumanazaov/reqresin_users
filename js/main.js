const elList = document.querySelector(".list");
const elNextBtn = document.querySelector(".js-next-btn");
const elPrevBtn = document.querySelector(".js-prev-btn");
const getUsersUrl = "https://reqres.in/api/users?page="
let pageCount = 1;

function renderUsers(array,node) {
  node.innerHTML = "";
  array.forEach(element => {
    const liElement = document.createElement("li");
    const userImg = document.createElement("img");
    const userID = document.createElement("span");
    const nameWrapper = document.createElement("div");
    const firstName = document.createElement("p");
    const lastName = document.createElement("p");
    const userEmail = document.createElement("a");

    liElement.classList.add("list__item");
    userID.classList.add("list__item-id");
    userImg.classList.add("list__item-img");
    firstName.classList.add("list__item-name");
    lastName.classList.add("list__item-surname");
    userEmail.classList.add("list__item-email");


    userID.textContent = `ID: ${element.id}`;
    firstName.textContent = `Name: ${element.first_name}`;
    lastName.textContent = `Surname: ${element.last_name}`;
    userImg.src = element.avatar;
    userEmail.text = element.email;
    userEmail.href = `mailto:${element.email}`;

    nameWrapper.append(firstName,lastName);
    liElement.append(userImg,userID,nameWrapper,userEmail);
    elList.appendChild(liElement);
  });
}

function getUsers(url,page) {
  fetch(url + page)
  .then(response => response.json())
  .then(data => renderUsers(data.data,elList));
}
getUsers(getUsersUrl,pageCount);


elNextBtn.addEventListener("click", (evt) => {
  pageCount++;
  getUsers(getUsersUrl,pageCount);
  if(pageCount >= 2) {
    elNextBtn.setAttribute("disabled",true);
    elNextBtn.style.opacity = 0.5;
    elPrevBtn.removeAttribute("disabled");
    elPrevBtn.style.opacity = 1;
  }
});

elPrevBtn.addEventListener("click", (evt) => {
  if(pageCount > 1) {
    pageCount--;
    getUsers(getUsersUrl,pageCount);
    elNextBtn.removeAttribute("disabled");
    elNextBtn.style.opacity = 1;
    disabledBtn();
  }
});

function disabledBtn() {
  if(pageCount <= 1) {
    elPrevBtn.setAttribute("disabled", true);
    elPrevBtn.style.opacity = 0.5;
  }
}
disabledBtn();

