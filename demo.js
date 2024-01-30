const readlineSync = require('readline-sync');

// Prompt the user to enter their name
var userName = readlineSync.question("Enter your name: ");

// Check if the user entered a name
if (userName.trim() !== "") {
    // Display a greeting in the console
    console.log("Hello, " + userName + "! Welcome!");
} else {
    // Handle the case where the user did not enter a name
    console.log("You did not enter a valid name. Please try again.");
}
