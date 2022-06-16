const controller = new TravelPackagesController();

const TRIP_IMAGE_ELEMENT_ID = "tripImage";
const TRIP_NAME_ELEMENT_ID = "tripName";
const TRAVEL_PACKAGE_IMAGES_ELEMENT_ID = "travelPackageImagesDropDown";
const PRODUCT_DESCRIPTION_ELEMENT_ID = "productDescription";

const TRAVEL_PACKAGE_IMAGE_PLACEHOLDER_URL = "https://placeholder.pics/svg/100x100";

const imageDropdownElement = document.getElementById(TRAVEL_PACKAGE_IMAGES_ELEMENT_ID);
const tripNameElement = document.getElementById(TRIP_NAME_ELEMENT_ID);
const descriptionElement = document.getElementById(PRODUCT_DESCRIPTION_ELEMENT_ID);
const errorMsgElement = document.getElementById("errorMessage");

function cancelButtonOnClickHandler() {
  console.log(`cancelButtonOnClickHandler():: entered`);
  if (confirm("Do you want to clear your changes?")) {
    resetFormData(tripNameElement, descriptionElement, errorMsgElement);
  }
}

function getImagePath(imageFileName) {
  const relativePathToTravelPackageImageFiles = "./photos/";
  return `${relativePathToTravelPackageImageFiles}${imageFileName}`;
}

function validateData(imageFilePath, tripName, description, errorMsgElement) {
  //TODO: Put correct values for production. These value are for testing only.
  const MINIMUM_TRIP_NAME_LENGTH = 1;
  const MINIMUM_TRIP_DESCRIPTION_LENGTH = 1;

  if (!imageFilePath || imageFilePath === TRAVEL_PACKAGE_IMAGE_PLACEHOLDER_URL) {
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
  displayPlaceholderAsDefaultImage();
  tripNameElement.value = "";
  descriptionElement.value = "";
  errorMsgElement.innerHTML = "";
}

function submitHandler(e) {
  // Default behavior not needed because we handle our own data validation
  e.preventDefault();

  const imageFilePath = imageDropdownElement.value;
  if (validateData(imageFilePath, tripNameElement.value, descriptionElement.value, errorMsgElement)) {
    controller.loadTravelPackagesFromLocalStorage();
    controller.addTravelPackage(tripNameElement.value, descriptionElement.value, imageFilePath);
    controller.savePackagesToDataStore();
  
    resetFormData(tripNameElement, descriptionElement, errorMsgElement);
  }

  // if (productTitle && productDescription && imageFile) {
  //   location.replace("./product-inventory.html"); // Doesn't allow use of browser back button from new page?
  // }
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
    { imageName: TRAVEL_PACKAGE_IMAGE_PLACEHOLDER_URL, displayName: "" },
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

function displayPlaceholderAsDefaultImage() {
  imageDropdownElement.value = TRAVEL_PACKAGE_IMAGE_PLACEHOLDER_URL;

  //Use the event to display the image
  imageDropdownElement.dispatchEvent(new Event('click'));
}

renderDropdownList(imageDropdownElement);
displayPlaceholderAsDefaultImage();