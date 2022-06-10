// Create a ItemsController class
class itemsController {
    // Set up the items and currentId property in the contructor
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    // Create the addItem method
    addTravelPackage(tripName, description,imageUrl) {
        const travelPackage = {
            // Increment the currentId property
            id: this.currentId++,
            name: tripName,
            description: description,
            imageUrl: imageUrl
        };

        // Push the item to the items property
        this.items.push(travelPackage);
    }
}

const denver = new itemsController()

denver.addTravelPackage("Denver", "3 day vacation to the mile high city", "image")
console.log(denver);

denver.addTravelPackage("Colorado Springs", "3 day getaway. Includes hiking and water rafting.", "image2");

console.log(denver);