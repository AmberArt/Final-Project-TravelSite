const TRAVEL_PACKAGES_STORAGE_ID = "travelPackages";
class TravelPackagesController {
    constructor(currentId = 0) {
        this.packages = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addTravelPackage(tripName, description, image) {
        const travelPackage = {
            id: this.currentId++,
            tripName: tripName,
            description: description,
            image: image
        };

        this.packages.push(travelPackage);
    }

    loadTravelPackagesFromLocalStorage() {
        const stringifiedPackages = localStorage.getItem(TRAVEL_PACKAGES_STORAGE_ID);

        if (stringifiedPackages) {
            const travelPackages = JSON.parse(stringifiedPackages)
            travelPackages.forEach(travelPackage => this.packages.push(travelPackage));    
        } 
    }

    initializeStorageWithSampleData() {
        if (!localStorage.getItem(TRAVEL_PACKAGES_STORAGE_ID))
        {
          const travelPackages = [
            {id: "0", tripName: "Denver", description: "3 day vacation to the mile high city", image: "./photos/denver-colorado-red-rocks-amphitheatre-summer-day-joggers-1440x810.jpg"},
            {id: "1", tripName: "Colorado Springs", description: "3 day getaway. Includes hiking and water rafting.", image: "./photos/colorado sunrise.jpg"},
            {id: "2", tripName: "St. Louis", description: "3 day trip with a great food tour.", image: "./photos/st louis sunset.jpg"},
            {id: "3", tripName: "Seattle", description: "3 day tour of Seattle attractions.", image: "./photos/seattle-dusk.jpg"},
          ];
        
          localStorage.setItem(TRAVEL_PACKAGES_STORAGE_ID, JSON.stringify(travelPackages));
        }
      }
};