let listInventoryTravelCards = document.getElementById("list-inventory-travel-cards");

const addTravelPackageInventoryCard = (parentDomElement, travelPackage) => {
  const card = `
  <div class="col-sm-12 col-md-4 col-lg-3 mb-5 me-5" data-id="${travelPackage.id}>
    <div class="card" style="width: 18rem">
      <img
        src="${travelPackage.imageUrl}"
        style="width: 100%; height: 100%"
        class="card-img-top"
        alt="Placeholder image for inspirational t-shirt."
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

  parentDomElement.innerHTML += card;
};

function renderTravelPackages(parentDomElement, travelPackagesController) {
  travelPackagesController.packages.forEach(travelPackage => addTravelPackageInventoryCard(parentDomElement, travelPackage));
}

const FIRST_PACKAGE_ID = 0;
const controller = new TravelPackagesController(FIRST_PACKAGE_ID);

controller.initializeStorageWithSampleData();
controller.loadTravelPackagesFromLocalStorage();
renderTravelPackages(listInventoryTravelCards, controller);
