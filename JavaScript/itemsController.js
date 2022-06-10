// Create a ItemsController class

class TravelPackageController {
    // Set up the items and currentId property in the contructor
    constructor(currentId = 0) {
        this.packages = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addTravelPackage(tripName, description, imageUrl) {
        const travelPackage = {
            // Increment the currentId property
            id: this.currentId++,
            tripName: tripName,
            description: description,
            imageUrl: imageUrl
        };

        // Push the item to the items property
        this.packages.push(travelPackage);
    }


};

const loadTravelPackagesFromLocalStorage = () =>  {
    const controller = new TravelPackageController();
    
    const storageItems = localStorage.getItem("travelPackages")
    if (storageItems) {
        const travelPackages = JSON.parse(storageItems)
        //TODO load the items into the local items structure (this.items)  
        travelPackages.forEach(travelPackage => {
            controller.addTravelPackage(travelPackage.tripName, travelPackage.description, travelPackage.imageUrl); 
        });
        return controller;         
    } 
}


export {loadTravelPackagesFromLocalStorage};

