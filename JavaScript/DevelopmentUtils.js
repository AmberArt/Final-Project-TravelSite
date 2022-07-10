// TODO: Ideally, instantiate TravelPackagesController only once and import.
//       Perhaps instantiate it in file "TravelPackagesController.js".
const localTravelPackagesController = new TravelPackagesController();
const ordersController = new purchaseOrdersController();

function deleteAllTravelPackages() {
  // Remove travel packages from the data store, and the controller, to prevent duplicates from
  // being stored. Duplicates would otherwise occur when writing sample data below each time a
  // user clicks button "Load Sample Data".
  localTravelPackagesController.removeAllTravelPackagesFromDataStore();

  // Refresh the page so it can represent the current data available
  location.reload();
}

function devLoadSampleDataMenuOnclickHandler() {
  deleteAllTravelPackages();

  localTravelPackagesController.initializeStorageWithSampleData();
  localTravelPackagesController.loadTravelPackagesFromLocalStorage();

  // Refresh the page so it can represent the current data available
  location.reload();
}

function devDeleteAllTravelPackagesButtonOnclickHandler() {
  deleteAllTravelPackages();
}

function deleteAllOrdersMenuOnclickHandler() {
  ordersController.removeAllPurchaseOrdersFromDataStore();

  // Refresh the page so it can represent the current data available
  location.reload();
}