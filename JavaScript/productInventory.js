// Returns travel package HTML ready to display on the product inventory page
const createTravelPackageInventoryCardHtml = (travelPackage) => {
  const bootstrapCard = `
  <div id="found-a-card" class="col-sm-12 col-md-4 col-lg-3 mb-5 me-5" mydata-id="${travelPackage.id}">
    <div class="card" style="width: 19rem">
      <img
        src="${travelPackage.imageFilePath}"
        style="width: 100%; height: 50%"
        class="card-img-top"
        alt="Picture representing a travel package."
      />
      <div class="card-body border border-dark">
        <h5 class="card-title">${travelPackage.tripName}</h5>
        <p class="card-text mb-5 description-container">${travelPackage.description}</p>
        <br>
        <a href="../HTML/update-travel-package.html" onclick="updateButtonHandler(event)" class="btn btn-primary">Edit</a>
        <button type="button" class="btn btn-primary" data-id="${travelPackage.id}" onclick="deleteButtonHandler(event)">Delete</button>
      </div>
    </div>
  </div>
  `;

  return bootstrapCard;
};

const travelPackagesController = new TravelPackagesController();

function updateButtonHandler(event){
  event.preventDefault;
  let dataIdElement = event.target.getAttribute("data-id");
  console.log(dataIdElement);
  travelPackagesController.updatePackage(dataIdElement, )

}

function clearRenderingOfDeletedTravelPackage(travelPackageId) {
//    const selector = `#travel-package-card [data-id="${travelPackageId}"]`;
    const selector = `[mydata-id="${travelPackageId}"]`;
    const cardElement = document.querySelector(selector);
    cardElement.remove();
  }

function deleteButtonHandler(event) {
  let travelPackageId = event.target.getAttribute("data-id");
  travelPackagesController.delete(travelPackageId);
  clearRenderingOfDeletedTravelPackage(travelPackageId);
}

// renders cards in inventory from database
const makeRequest = async () => {
  let response = await fetch("http://localhost:8080/travelpackage");
  // if the response is bad
  if(!response.ok){
      throw new Error(`There is an error with status ${response.status}`)
  }
  let usersJson = response.json();
  return usersJson;
}

const renderCards = async () => {
  let parentDomElement = document.getElementById('list-inventory-travel-cards');
  // handle promise from the makeRequest function
  let users = await makeRequest();
  // this can access the array of users directly instead of having to do users.data every time. Doesn't work.
  let usersArr = users.data;
    users.forEach(travelPackage => {
    const bootstrapCard = createTravelPackageInventoryCardHtml(travelPackage);
    parentDomElement.innerHTML += bootstrapCard;
  })
}

function clearRenderedTravelPackages() {
  const parentDomElement = document.getElementById(
    "list-inventory-travel-cards"
  );

  parentDomElement.innerHTML = "";
}

renderCards();
