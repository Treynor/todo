import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";   // Import the initializeApp function
import { getDatabase, ref, set, get, child, update, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js"; // Import the database functions


const appSettings = {
    databaseURL: "https://playground-89413-default-rtdb.europe-west1.firebasedatabase.app/",
}

const app = initializeApp(appSettings); // Initialize the app with the app settings
const database = getDatabase(app); // Get the database instance
const dbRef = ref(database, "shoppingList"); // Get a reference to the database


let input = document.getElementById('input-field'); // Get the input field
let add = document.getElementById('add-button'); // Get the add button
let cartList = document.getElementById('cart-list'); // Get the cart list

add.addEventListener('click', function() {
    if (input.value === '') return; // If the input field is empty, return
    else {
        let inputValue = input.value; // Get the value of the input field
        push(dbRef, inputValue) // Push the value to the database
        consoleLogAddedItem(inputValue); // Log the value of the input field
        clearInputField(); // Clear the input field
    }
});


onValue(dbRef, function(snapshot) {
    
    if (snapshot.exists()) {
        let itemArray = Object.entries(snapshot.val());

        clearCartList()
    
        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i];
            let currentItemID = currentItem[0];
            let currentItemValue = currentItem[1];
            appendItemsToShoppingList(currentItem);
        } 
    } else {
        cartList.innerHTML = 'No items in the database';

    }
});
    
function clearCartList() {
cartList.innerHTML = '';
    }
    
function clearInputField() {
    input.value = ''; // Clear the input field
}
    
function consoleLogAddedItem(addedItem) {
    console.log(`${addedItem} added to database`);
}
    
function appendItemsToShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement('li');
    newEl.textContent  = itemValue;

    cartList.append(newEl);

    newEl.addEventListener('dblclick', function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
        remove(exactLocationOfItemInDB);
    });
}
    
