const controller =  new purchaseOrdersController();

const firstNameElement = document.getElementById("fname");
const lastNameElement = document.getElementById("lname");
const phoneNumberElement = document.getElementById("phoneNumber");
const creditCardNumberElement = document.getElementById("creditCardNumber");
const emailAddressElement = document.getElementById("emailAddress");

const getCandidateTravelPackageFromUrl = () => {
  const travelPackagesController = new TravelPackagesController(); 
  travelPackagesController.loadTravelPackagesFromLocalStorage();
  const queryString = window.location.search;

  const urlParams = new URLSearchParams(queryString);
  const productId = urlParams.get('productId');
  const travelPackageId = parseInt(productId);
  const travelPackage = travelPackagesController.getTravelPackage(travelPackageId);
  return travelPackage;
}

// TODO: 
const isValidData = (firstName, lastName, phoneNumber, creditCardNumber, emailAddress) => {
  return true;
};

function cancelOrderButtonOnClickHandler() {
  // Using "window.location.replace", rather than "window.location.href", to prevent the browser
  // back arrow from navigating directly back to the purchase page.
  window.location.replace("index.html");
}

function purchaseSubmitButtonHandler(e) {
  e.preventDefault();
  const firstName         = firstNameElement.value;
  const lastName          = lastNameElement.value;
  const phoneNumber       = phoneNumberElement.value;
  const creditCardNumber  = creditCardNumberElement.value;
  const emailAddress      = emailAddressElement.value;

  let newOrderId;

  if(isValidData(firstName, lastName, phoneNumber, creditCardNumber, emailAddress)) {
    // TODO: find better design for getting current ID initialized and to not require loading all orders from database
    controller.loadPurchaseOrdersFromLocalStorage();
    const travelPackage = getCandidateTravelPackageFromUrl();
    newOrderId = controller.addPurchaseOrder(firstName, lastName, phoneNumber, creditCardNumber, emailAddress, travelPackage.id);
    controller.saveOrdersToDataStore();
  };

  // No need to create the entire URL as shown: `${window.location.origin}/confirmation.html?orderId=${newOrderId}`;
  const orderConfirmationPage = `confirmation.html?orderId=${newOrderId}`;

  // Using "window.location.replace", rather than "window.location.href", to prevent the browser back arrow from navigating
  // back to the purchase page. That's because a user hitting the Submit button again on the purchase page, would cause
  // a duplicate purchase in a new purchase order.
  window.location.replace(orderConfirmationPage);
}

/* TODO: Move to a developer page
const deleteAllPurchaseOrders = () => {
  // Remove travel packages from the data store, and the controller, to prevent duplicates from
  // being stored. Duplicates would otherwise occur when writing sample data below each time a
  // user clicks button "Load Sample Data".
  controller.removeAllPurchaseOrdersFromDataStore();
}

const testAddPurchaseOrder = () => {
  deleteAllPurchaseOrders();

  controller.loadPurchaseOrdersFromLocalStorage();
  controller.addPurchaseOrder("Amber", "Biggart", "123-456-7897", "987654321", "email@email.com");
  controller.addPurchaseOrder("Emma", "Biggart", "123-456-7897", "987654321", "email@email.com");
  controller.addPurchaseOrder("Cody", "Biggart", "123-456-7897", "987654321", "email@email.com");
  controller.saveOrdersToDataStore();
}
testAddPurchaseOrder();
*/

window.onload = (event) => {
  const travelImageElement = document.getElementById("travelPackageImage");
  const travelPackage = getCandidateTravelPackageFromUrl();
  travelImageElement.setAttribute("src", travelPackage.image);
  const travelPurchaseHeading = document.getElementById("purchaseHeading");
  travelPurchaseHeading.innerHTML = travelPackage.tripName;
};