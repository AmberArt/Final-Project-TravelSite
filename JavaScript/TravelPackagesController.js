const TRAVEL_PACKAGES_STORAGE_ID = "travelPackages";
const NEXT_ID_KEY = "TravelPackagesNextId"; //TODO Consider storing this in a JSON object that also contains the travel packages
class TravelPackagesController {
    constructor() {
        // this.packageMap = new Map();
    }

    // save data to database
    saveToDatabase(tripName, description, imageFilePath){
        const data = { tripName, description, imageFilePath };

        fetch('http://localhost:8080/travelpackage/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    }

    getTravelPackage(travelPackageId){
        return this.packageMap.get(travelPackageId);
    }


    // update travel package
    updatePackage(packageId, tripName, description, imageFilePath){
        const data = { tripName, description, imageFilePath };

        fetch("http://localhost:8080/travelpackage/"+packageId,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success', data);
        })
        .catch((error) => {
            console.log('Error', error);
        })
    }


    // delete from database
    delete(packageId) {
        // console.warn(packageId);
        fetch("http://localhost:8080/travelpackage/"+packageId,{
            method:'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
               },
        })
    }

    initializeStorageWithSampleData() {
        if (!localStorage.getItem(TRAVEL_PACKAGES_STORAGE_ID))
        {
          const travelPackages = [
            {id: 0, tripName: "Denver", description: "3 day vacation to the mile high city", image: "../photos/denver-colorado-red-rocks-amphitheatre-summer-day-joggers-1440x810.jpg"},
            {id: 1, tripName: "Colorado Springs", description: "3 day getaway. Includes hiking and water rafting.", image: "../photos/colorado sunrise.jpg"},
            {id: 2, tripName: "St. Louis", description: "3 day trip with a great food tour.", image: "../photos/st louis sunset.jpg"},
            {id: 3, tripName: "Seattle", description: "3 day tour of Seattle attractions.", image: "../photos/seattle-dusk.jpg"},
          ];

          const NEXT_TRAVEL_PACKAGE_ID_AFTER_THE_SAMPLE_DATA = "4";
          localStorage.setItem(NEXT_ID_KEY, NEXT_TRAVEL_PACKAGE_ID_AFTER_THE_SAMPLE_DATA);
          localStorage.setItem(TRAVEL_PACKAGES_STORAGE_ID, JSON.stringify(travelPackages));
        }
      }
};