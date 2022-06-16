const TRAVEL_PACKAGES_STORAGE_ID = "travelPackages";
const NEXT_ID_KEY = "TravelPackagesNextId"; //TODO Consider storing this in a JSON object that also contains the travel packages
class TravelPackagesController {
    constructor() {
        this.packages = [];
    }

    savePackagesToDataStore() {
        localStorage.setItem(NEXT_ID_KEY, this.currentId);
        localStorage.setItem(TRAVEL_PACKAGES_STORAGE_ID, JSON.stringify(this.packages));
    }

    addTravelPackage(tripName, description, image) {
        const travelPackage = {
            id: this.currentId++,
            tripName: tripName,
            description: description,
            image: image
        };

        localStorage.setItem(NEXT_ID_KEY, JSON.stringify(this.id));

        this.packages.push(travelPackage);
    }

    loadTravelPackagesFromLocalStorage() {
        this.currentId = localStorage.getItem(NEXT_ID_KEY);

        const stringifiedPackages = localStorage.getItem(TRAVEL_PACKAGES_STORAGE_ID);

        if (stringifiedPackages) {
            this.packages = [];
            const travelPackages = JSON.parse(stringifiedPackages)
            travelPackages.forEach(travelPackage => this.packages.push(travelPackage));    
        }
    }

    // Remove stored data to prevent duplicates from being stored when a
    // user hits button "Load Sample Data" multiple times.
    removeAllTravelPackagesFromDataStore() {
        this.packages = [];
        localStorage.removeItem(TRAVEL_PACKAGES_STORAGE_ID);
        localStorage.removeItem(NEXT_ID_KEY);
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

          const NEXT_TRAVEL_PACKAGE_ID_AFTER_THE_SAMPLE_DATA = "4";
          localStorage.setItem(NEXT_ID_KEY, NEXT_TRAVEL_PACKAGE_ID_AFTER_THE_SAMPLE_DATA);
          localStorage.setItem(TRAVEL_PACKAGES_STORAGE_ID, JSON.stringify(travelPackages));
        }
      }
};