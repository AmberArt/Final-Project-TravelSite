// Returns travel package HTML ready to display on the product inventory page
const createTravelPackageInventoryCardHtml = (travelPackage) => {
  const bootstrapCard = `
  <div class="col-sm-12 col-md-4 col-lg-3 mb-5 me-5" data-id="${travelPackage.id}>
    <div class="card" style="width: 19rem">
      <img
        src="${travelPackage.image}"
        style="width: 100%; height: 50%"
        class="card-img-top"
        alt="Picture representing a travel package."
      />
      <div class="card-body border border-dark">
        <h5 class="card-title">${travelPackage.tripName}</h5>
        <p class="card-text mb-5 description-container">${travelPackage.description}</p>
        <br>
        <button type="button" class="btn btn-primary" onclick="deleteButtonHandler()">Delete</button>
      </div>
    </div>
  </div>
  `;

  // TODO: We'll want to add an Edit button that navigates to a page to edit a package.
  //       So keep this code as a working example of such.
  //         <a href="./add-travel-package.html?travelPackageId=2" class="btn btn-primary">Edit</a>

  return bootstrapCard;
};

const travelPackagesController = new TravelPackagesController();

function deleteTravelPackage(id) {
  // TODO Delete a single package from the data store.
  // See this for a starter example:     travelPackagesController.removeAllTravelPackagesFromDataStore();

  // To refresh the user interface
  clearRenderedTravelPackages();
  renderInventoryTravelPackages(travelPackagesController);
}

function deleteButtonHandler() {
  deleteTravelPackage(id);
}

function renderInventoryTravelPackages(travelPackagesController) {
  const parentDomElement = document.getElementById("list-inventory-travel-cards");

  travelPackagesController.packageMap.forEach((travelPackage) => {
    const card = createTravelPackageInventoryCardHtml(travelPackage);
    parentDomElement.innerHTML += card;
  });
}

function clearRenderedTravelPackages() {
  const parentDomElement = document.getElementById(
    "list-inventory-travel-cards"
  );

  parentDomElement.innerHTML = "";
}

travelPackagesController.loadTravelPackagesFromLocalStorage();
renderInventoryTravelPackages(travelPackagesController);