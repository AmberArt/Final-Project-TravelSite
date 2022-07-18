const controller = new TravelPackagesController();

const TRIP_IMAGE_ELEMENT_ID = "tripImage";
const TRIP_NAME_ELEMENT_ID = "tripName";
const TRAVEL_PACKAGE_IMAGES_ELEMENT_ID = "travelPackageImagesDropDown";
const PRODUCT_DESCRIPTION_ELEMENT_ID = "productDescription";

const DEFAULT_TRAVEL_PACKAGE_PLACEHOLDER_IMAGE_URL = "https://placeholder.pics/svg/100x100";

const imageDropdownElement = document.getElementById(TRAVEL_PACKAGE_IMAGES_ELEMENT_ID);
const tripNameElement = document.getElementById(TRIP_NAME_ELEMENT_ID);
const descriptionElement = document.getElementById(PRODUCT_DESCRIPTION_ELEMENT_ID);
const errorMsgElement = document.getElementById("errorMessage");

// true if editing a package. false if adding a new package.
let isEditMode = null;

function cancelButtonOnClickHandler() {
  // Article: How to "Create confirmation dialog with Yes and No buttons"
  //    https://sebhastian.com/javascript-confirmation-yes-no/#:~:text=You%20can%20create%20a%20JavaScript,can%20specify%20as%20its%20argument.
  if (confirm("Do you want to clear your changes?")) {
    resetFormData(tripNameElement, descriptionElement, errorMsgElement);
  }
}

function getImagePath(imageFileName) {
  const relativePathToTravelPackageImageFiles = "../photos/";
  return `${relativePathToTravelPackageImageFiles}${imageFileName}`;
}

function validateData(imageFilePath, tripName, description, errorMsgElement) {
  //TODO: Put correct values for production. These value are for testing only.
  const MINIMUM_TRIP_NAME_LENGTH = 1;
  const MINIMUM_TRIP_DESCRIPTION_LENGTH = 1;

  if (!imageFilePath || imageFilePath === DEFAULT_TRAVEL_PACKAGE_PLACEHOLDER_IMAGE_URL) {
    errorMsgElement.innerHTML = "Please select an image for the travel package";
    return false;
  }
  else if (!tripName || tripName.length < MINIMUM_TRIP_NAME_LENGTH) {
    errorMsgElement.innerHTML = `Please enter a trip name of at least ${MINIMUM_TRIP_NAME_LENGTH} characters.`;
    return false;
  }
  else if (!description || description.length < MINIMUM_TRIP_DESCRIPTION_LENGTH) {
    errorMsgElement.innerHTML = `Please enter a description of at least ${MINIMUM_TRIP_DESCRIPTION_LENGTH} characters.`;
    return false;
  }

  return true;
}

function resetFormData(tripNameElement, descriptionElement, errorMsgElement) {
  displayImage(DEFAULT_TRAVEL_PACKAGE_PLACEHOLDER_IMAGE_URL);
  tripNameElement.value = "";
  descriptionElement.value = "";
  errorMsgElement.innerHTML = "";
}

function submitHandler(e) {
  // Default behavior not needed because we handle our own data validation
  e.preventDefault();

  const imageFilePath = imageDropdownElement.value;
  if(isEditMode && validateData(imageFilePath, tripNameElement.value, descriptionElement.value, errorMsgElement)){
    const travelPackageId = getTravelPackageIdFromUrl();
    controller.updatePackage(travelPackageId, tripNameElement.value, descriptionElement.value, imageFilePath);
    location.replace("../HTML/product-inventory.html");
  } else {
    validateData(imageFilePath, tripNameElement.value, descriptionElement.value, errorMsgElement)
      controller.saveToDatabase(tripNameElement.value, descriptionElement.value, imageFilePath)
        resetFormData(tripNameElement, descriptionElement, errorMsgElement);
      }
}

function createTravelPackageImageSelectDropdownOption(
  imageName,
  imageDisplayName
) {
  const html = `<option value="${imageName}">${imageDisplayName}</option>`;
  return html;
}

// Display the selected image
function travelPackageImageListItemHandler(e) {
  // Default behavior doesn't add anything we need
  e.preventDefault();

  const imageFilePath = e.target.value;
  document.getElementById(TRIP_IMAGE_ELEMENT_ID).setAttribute("src", imageFilePath);
}

function renderDropdownList(parentDropdownElement) {
  const imageNames = [
    { imageName: DEFAULT_TRAVEL_PACKAGE_PLACEHOLDER_IMAGE_URL, displayName: "" },
    { imageName: getImagePath("colorado sunrise.jpg"), displayName: "Colorado Sunrise" },
    {
      imageName:
      getImagePath("denver-colorado-red-rocks-amphitheatre-summer-day-joggers-1440x810.jpg"),
      displayName: "Denver Colorado Red Rocks Amphitheatre Summer Day Joggers",
    },
    { imageName: getImagePath("seattle-dusk.jpg"), displayName: "Seattle Dusk" },
    { imageName: getImagePath("st louis sunset.jpg"), displayName: "St Louis Sunset" },
  ];

  imageNames.forEach((imageData) => {
    parentDropdownElement.innerHTML +=
      createTravelPackageImageSelectDropdownOption(
        imageData.imageName,
        imageData.displayName
      );
  });
}

const getTravelPackageIdFromUrl = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const travelPackageIdAsString = urlParams.get('travelPackageId'); // TODO: Put make travelPackageId a constant
  const travelPackageId = parseInt(travelPackageIdAsString);
  return travelPackageId;
}

const getTravelPackage = async (travelPackageId) => {
  let response = await fetch(`http://localhost:8080/travelpackage/${travelPackageId}`);

  if(!response.ok){
      throw new Error(`There is an error with status ${response.status}`)
  }

  let travelPackageJson = response.json();
  return travelPackageJson;
}

window.onload = async (event) => {
  const travelPackageId = getTravelPackageIdFromUrl();

  if (travelPackageId) {
    isEditMode = true;
    // We're in edit mode
    travelPackage = await getTravelPackage(travelPackageId);
    renderPackageData(travelPackage);
  } else {
    isEditMode = false;
    // We're in add a package mode
    displayImage(DEFAULT_TRAVEL_PACKAGE_PLACEHOLDER_IMAGE_URL);
  }
};

function renderImage (imageURN) {
  imageDropdownElement.value = imageURN;

  //Use the event to display the image
  imageDropdownElement.dispatchEvent(new Event('click'));
}

function displayImage(imageFilePath) {
  renderImage (imageFilePath);
}

const renderPackageData = (travelPackage) => {
  displayImage(travelPackage.imageFilePath);
  tripNameElement.value = travelPackage.tripName;
  descriptionElement.value = travelPackage.description;
}

renderDropdownList(imageDropdownElement);