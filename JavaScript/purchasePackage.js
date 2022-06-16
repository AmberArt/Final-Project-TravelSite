//TODO Load picture from selection on home page

const firstNameElement = document.getElementById("fname");
const lastNameElement = document.getElementById("lname");
const phoneNumberElement = document.getElementById("phoneNumber");
const creditCardNumberElement = document.getElementById("creditCardNumber");
const emailAddressElement = document.getElementById("emailAddress");

validateData();

function purchaseSubmitButtonHandler() {
  const firstName         = firstNameElement.value;
  const lastName          = lastNameElement.value;
  const phoneNumber       = phoneNumberElement.value;
  const creditCardNumber  = creditCardNumberElement.value;
  const emailAddress      = emailAddressElement.value;

  validateData(firstName, lastName, phoneNumber, creditCardNumber, emailAddress);
}
