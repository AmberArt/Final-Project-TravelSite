const getPurchaseOrderFromUrl = () => {
  const poController =  new purchaseOrdersController();
  poController.loadPurchaseOrdersFromLocalStorage();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const orderId = urlParams.get('orderId');
  const orderIdNum = parseInt(orderId);
  const purchaseOrder = poController.getPurchaseOrder(orderIdNum);
  return purchaseOrder;
}

getOrderedTravelPackage = () => {
  const purchaseOrder = getPurchaseOrderFromUrl();
  const travelPackageId = purchaseOrder._travelPackageId; //TODO Use accessor. Create PurchaseOrder class

  const travelPackagesController = new TravelPackagesController(); 
  travelPackagesController.loadTravelPackagesFromLocalStorage();
  const travelPackage = travelPackagesController.getTravelPackage(travelPackageId);
  return travelPackage;
}

window.onload = (event) => {
  const packageNameElement = document.getElementById("package-name");
  const travelPackage = getOrderedTravelPackage();
  packageNameElement.innerHTML = travelPackage.tripName;

  const img = document.getElementById("travel-package-image");
  img.src = travelPackage.image;
};