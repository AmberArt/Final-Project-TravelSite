// TODO This file needs to be refactored to save and load purchase orders. The content was originally copied
//      from "itemsController.js". Travis started refactoring the uncommented code but it has not been tested
//      and might yet need more work. The commented code has not been refactored.

const ORDERS_STORAGE_ID = "purchaseOrders";
const NEXT_ORDER_ID_KEY = "purchaseOrdersNextId";   //TODO Consider storing this in a JSON object that also contains the orders

class purchaseOrdersController {
    constructor() {
        this.orders = [];
    }

    saveOrdersToDataStore() {
        localStorage.setItem(NEXT_ORDER_ID_KEY, this.currentId);
        localStorage.setItem(ORDERS_STORAGE_ID, JSON.stringify(this.orders));
    }

    addPurchaseOrder(firstName, lastName, phoneNumber, creditCardNumber, emailAddress, travelPackageId) {
        const travelPackage = {
            id: this.currentId++,
            _firstName: firstName,
            _lastName: lastName,
            _phoneNumber: phoneNumber,
            _creditCardNumber: creditCardNumber,
            _emailAddress: emailAddress,
            _travelPackageId: travelPackageId
        };

        localStorage.setItem(NEXT_ORDER_ID_KEY, JSON.stringify(this.id));

        this.orders.push(travelPackage);
    }

    //TODO Must change from the travel package code to orders
    // loadPurchaseOrdersFromLocalStorage() {
    //     this.currentId = localStorage.getItem(NEXT_ORDER_ID_KEY);

    //     const stringifiedPackages = localStorage.getItem(ORDERS_STORAGE_ID);

    //     if (stringifiedPackages) {
    //         this.orders = [];
    //         const travelPackages = JSON.parse(stringifiedPackages)
    //         travelPackages.forEach(travelPackage => this.orders.push(travelPackage));    
    //     }
    // }

    //TODO Must change from the travel package code to orders
    // initializeStorageWithSampleData() {
    //     if (!localStorage.getItem(ORDERS_STORAGE_ID))
    //     {
    //       const travelPackages = [
    //         {id: "0", tripName: "Denver", description: "3 day vacation to the mile high city", image: "./photos/denver-colorado-red-rocks-amphitheatre-summer-day-joggers-1440x810.jpg"},
    //         {id: "1", tripName: "Colorado Springs", description: "3 day getaway. Includes hiking and water rafting.", image: "./photos/colorado sunrise.jpg"},
    //         {id: "2", tripName: "St. Louis", description: "3 day trip with a great food tour.", image: "./photos/st louis sunset.jpg"},
    //         {id: "3", tripName: "Seattle", description: "3 day tour of Seattle attractions.", image: "./photos/seattle-dusk.jpg"},
    //       ];
        
    //       localStorage.setItem(ORDERS_STORAGE_ID, JSON.stringify(travelPackages));
    //     }
    //   }
};