// Returns travel package HTML ready to display on the home page 
const createTravelPackageCard = (travelPackage) => {
  const bootstrapCard = 
  `
<div class="col-lg-4 col-md-6 mt-3 gx-5 card-package" data-id="${travelPackage.id}">
    <div class="card" style="width: 19rem;">
      <img src="${travelPackage.imageFilePath}"
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
  let parentDomElement = document.getElementById('list-travel-cards');
  // handle promise from the makeRequest function
  let users = await makeRequest();
  // this just makes it so that I can access the array of users directly instead of having to do users.data every time.
  let usersArr = users.data;
    users.forEach(travelPackage => {
    const bootstrapCard = createTravelPackageCard(travelPackage);
    parentDomElement.innerHTML += bootstrapCard;
  })
}

renderCards();

// OLD
// function renderHomePageTravelPackages(travelPackagesController) {
//   let parentDomElement = document.getElementById('list-travel-cards');

//   travelPackagesController.packageMap.forEach(travelPackage => {
//     const bootstrapCard = createTravelPackageCard(travelPackage);
//     parentDomElement.innerHTML += bootstrapCard;
//   });

  // OLD
  // travelPackagesController.packages.forEach(travelPackage => {
  //   const bootstrapCard = createTravelPackageCard(travelPackage);
  //   parentDomElement.innerHTML += bootstrapCard;
  // });
// }

// const controller = new TravelPackagesController();
// controller.loadTravelPackagesFromLocalStorage();
// renderHomePageTravelPackages(controller);