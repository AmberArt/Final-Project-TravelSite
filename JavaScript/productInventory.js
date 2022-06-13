// Returns travel package HTML ready to display on the product inventory page
const createTravelPackageInventoryCardHtml = (travelPackage) => {
  const bootstrapCard = `
  <div class="col-sm-12 col-md-4 col-lg-3 mb-5 me-5" data-id="${travelPackage.id}>
    <div class="card" style="width: 18rem">
      <img
        src="${travelPackage.image}"
        style="width: 100%; height: 50%"
        class="card-img-top"
        alt="Picture representing a travel package."
      />
      <div class="card-body">
        <h5 class="card-title">${travelPackage.tripName}</h5>
        <p class="card-text">${travelPackage.description}</p>
        <a href="./edit-product.html?travelPackageId=2" class="btn btn-primary">
          Edit
        </a>
      </div>
    </div>
  </div>
  `;
  return bootstrapCard;
};

function renderInventoryTravelPackages(travelPackagesController) {
  const parentDomElement = document.getElementById(
    "list-inventory-travel-cards"
  );

  travelPackagesController.packages.forEach((travelPackage) => {
    const card = createTravelPackageInventoryCardHtml(travelPackage);
    parentDomElement.innerHTML += card;
  });
}

const FIRST_PACKAGE_ID = 0;
const controller = new TravelPackagesController(FIRST_PACKAGE_ID);

controller.initializeStorageWithSampleData();
controller.loadTravelPackagesFromLocalStorage();
renderInventoryTravelPackages(controller);