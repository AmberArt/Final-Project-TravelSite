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

    // returns the new order id
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
        return travelPackage.id;
    }

    //TODO Must change from the travel package code to orders
    loadPurchaseOrdersFromLocalStorage() {
        const INITIAL_CURRENT_ID_VALUE = 0;
        const resultId = localStorage.getItem(NEXT_ORDER_ID_KEY);
        this.currentId = resultId >= 0 ? resultId : INITIAL_CURRENT_ID_VALUE;

        const stringifiedOrders = localStorage.getItem(ORDERS_STORAGE_ID);

        if (stringifiedOrders) {
            this.orders = [];
            const travelPackages = JSON.parse(stringifiedOrders)
            travelPackages.forEach(order => this.orders.push(order));    
        }
    }

    // Remove stored data to prevent duplicates from being stored.
    //  TODO: fix comment; when a user hits button "Load Sample Data" multiple times.
    removeAllPurchaseOrdersFromDataStore() {
        this.orders = [];
        localStorage.removeItem(ORDERS_STORAGE_ID);
        localStorage.removeItem(NEXT_ORDER_ID_KEY);
    }



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

