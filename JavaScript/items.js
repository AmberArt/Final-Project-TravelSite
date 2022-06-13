// Returns travel package HTML ready to display on the home page 
const createTravelPackageCard = (travelPackage) => {
  const bootstrapCard = 
  `
<div class="col-lg-4 col-md-6 mt-3 gx-5 card-package" data-id="${travelPackage.id}">
    <div class="card" style="width: 19rem;">
      <img src="${travelPackage.image}" class="card-img-top" alt="Picture representing a travel package.">
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
  return bootstrapCard;
};

function renderHomePageTravelPackages(travelPackagesController) {
  let parentDomElement = document.getElementById('list-travel-cards');

  travelPackagesController.packages.forEach(travelPackage => {
    const bootstrapCard = createTravelPackageCard(travelPackage);
    parentDomElement.innerHTML += bootstrapCard;
  });
}

const FIRST_PACKAGE_ID = 0;
const controller = new TravelPackagesController(FIRST_PACKAGE_ID);

controller.initializeStorageWithSampleData();
controller.loadTravelPackagesFromLocalStorage();
renderHomePageTravelPackages(controller);