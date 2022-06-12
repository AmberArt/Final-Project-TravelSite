const TRAVEL_PACKAGES_STORAGE_ID = "travelPackages";
class TravelPackagesController {
    constructor(currentId = 0) {
        this.packages = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addTravelPackage(tripName, description, imageUrl) {
        const travelPackage = {
            id: this.currentId++,
            tripName: tripName,
            description: description,
            imageUrl: imageUrl
        };

        this.packages.push(travelPackage);
    }

    loadTravelPackagesFromLocalStorage() {
        const storageItems = localStorage.getItem(TRAVEL_PACKAGES_STORAGE_ID);

        if (storageItems) {
            const travelPackages = JSON.parse(storageItems)
            travelPackages.forEach(travelPackage => {
                this.packages.push(travelPackage);
                // controller.addTravelPackage(travelPackage.tripName, travelPackage.description, travelPackage.imageUrl); //TODO delete
            });

            return controller;         
        } 
    }

    initializeStorageWithSampleData() {
        if (!localStorage.getItem(TRAVEL_PACKAGES_STORAGE_ID)) {
          const travelPackages = [
            { id: "0", tripName: "Denver", description: "3 day vacation to the mile high city", imageUrl: "https://placeholder.pics/svg/100x100"},
            {id: "1", tripName: "Colorado Springs", description: "3 day getaway. Includes hiking and water rafting.", imageUrl: "https://placeholder.pics/svg/100x100"},
            {id: "2", tripName: "St. Louis", description: "3 day trip with a great food tour.", imageUrl: "https://placeholder.pics/svg/100x100"}
          ];
        
          localStorage.setItem(TRAVEL_PACKAGES_STORAGE_ID, JSON.stringify(travelPackages));
        }
      }
};