// Returns travel package HTML ready to display on the home page 
const createTravelPackageCard = (travelPackage) => {
  const bootstrapCard = 
  `
<div class="col-lg-4 col-md-6 mt-3 gx-5 card-package" data-id="${travelPackage.id}">
    <div class="card" style="width: 19rem;">
      <img src="${travelPackage.image}"
      style="width: 100%; height: 50%"
       class="card-img-top" alt="Picture representing a travel package.">
      <div class="card-body">
        <h5 class="card-title">${travelPackage.tripName}</h5>
        <p class="card-text mb-3 description-container">${travelPackage.description}</p>
      </div>
      <div class="card-body">
      <a href="./purchase-package.html?productId=${travelPackage.id}" class="btn btn-primary">Purchase</a>

      </div>
    </div>
</div>
  `;
  return bootstrapCard;
}


function renderHomePageTravelPackages(travelPackagesController) {
  let parentDomElement = document.getElementById('list-travel-cards');

  travelPackagesController.packages.forEach(travelPackage => {
    const bootstrapCard = createTravelPackageCard(travelPackage);
    parentDomElement.innerHTML += bootstrapCard;
  });
}

const controller = new TravelPackagesController();
controller.loadTravelPackagesFromLocalStorage();
renderHomePageTravelPackages(controller);