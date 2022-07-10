const ORDERS_STORAGE_ID = "purchaseOrders";
const NEXT_ORDER_ID_KEY = "purchaseOrdersNextId";   //TODO Consider storing this in a JSON object that also contains the orders

//TODO Rename to capital first letter (Pascal case)
class purchaseOrdersController {
    constructor() {
        this.orderMap = new Map();
    }

    saveOrdersToDataStore() {
        localStorage.setItem(NEXT_ORDER_ID_KEY, this.currentId);

        const valuesArray = Array.from(this.orderMap.values());
        localStorage.setItem(ORDERS_STORAGE_ID, JSON.stringify(valuesArray));
    }

    // returns the new order id
    addPurchaseOrder(firstName, lastName, phoneNumber, creditCardNumber, emailAddress, travelPackageId) {
        const purchaseOrder = {
            id: this.currentId++,
            _firstName: firstName,
            _lastName: lastName,
            _phoneNumber: phoneNumber,
            _creditCardNumber: creditCardNumber,
            _emailAddress: emailAddress,
            _travelPackageId: travelPackageId
        };

        localStorage.setItem(NEXT_ORDER_ID_KEY, JSON.stringify(this.id));

        this.orderMap.set(purchaseOrder.id, purchaseOrder);
        return purchaseOrder.id;
    }

    getPurchaseOrder(orderIdNumber){
        return this.orderMap.get(orderIdNumber);
    }

    //TODO Must change from the travel package code to orders
    loadPurchaseOrdersFromLocalStorage() {
        const INITIAL_CURRENT_ID_VALUE = 0;
        const resultId = localStorage.getItem(NEXT_ORDER_ID_KEY);
        this.currentId = resultId >= 0 ? resultId : INITIAL_CURRENT_ID_VALUE;

        const stringifiedOrders = localStorage.getItem(ORDERS_STORAGE_ID);

        if (stringifiedOrders) {
            this.orderMap.clear();
            const travelPackages = JSON.parse(stringifiedOrders)
            travelPackages.forEach(order => this.orderMap.set(order.id, order));    
        }
    }

    // Remove stored data to prevent duplicates from being stored when a
    // user hits button "Load Sample Data" multiple times.
    removeAllPurchaseOrdersFromDataStore() {
        this.orderMap.clear();
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

