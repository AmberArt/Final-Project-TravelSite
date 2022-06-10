// id: this.currentId++,
// tripName: tripName,     
// description: description,
// imageUrl: imageUrl

import {loadTravelPackagesFromLocalStorage} from "./itemsController.js"

// DOM variable
let listTravelCards = document.getElementById('list-travel-cards');


const addTravelPackageCard = (travelPackage) => {
  const card = 
  `
<div class="col-lg-4 col-md-6 mt-3 gx-5 card-package" data-id="${travelPackage.id}">
    <div class="card" style="width: 19rem;">
      <img src="${travelPackage.imageUrl}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${travelPackage.tripName}</h5>
        <p class="card-text">${travelPackage.description}</p>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">An item</li>
        <li class="list-group-item">A second item</li>
        <li class="list-group-item">A third item</li>
      </ul>
      <div class="card-body">
        <a href="#" class="btn btn-primary">Card link</a>
      </div>
    </div>
</div>
  `;

  listTravelCards.innerHTML += card;
};

const saveSampleTravelPackages = () => {
  const travelPackages = [
    { id: "0", tripName: "Denver", description: "3 day vacation to the mile high city", imageUrl: "https://placeholder.pics/svg/100x100"},
    {id: "1", tripName: "Colorado Springs", description: "3 day getaway. Includes hiking and water rafting.", imageUrl: "https://placeholder.pics/svg/100x100"},
    {id: "2", tripName: "St. Louis", description: "3 day trip with a great food tour.", imageUrl: "https://placeholder.pics/svg/100x100"}
];
localStorage.setItem("travelPackages", JSON.stringify(travelPackages));

}

saveSampleTravelPackages();
const controller = loadTravelPackagesFromLocalStorage();

if (!controller) {
  console.log("Error: no travel packages in local storage");
} else {
  controller.packages.forEach(travelPackage => {
    addTravelPackageCard(travelPackage);
  })
};


