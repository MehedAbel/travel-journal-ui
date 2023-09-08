
console.log("CONDITIONAL STATEMENTS");

const conditionalStatement1 = () => {
    if (new Date().getHours() < 21) {
        console.log("Today is special!");
    } else if (new Date().getHours() < 22) {
        console.log("Don't waste today's opportunities!");
    } else if (new Date().getHours() < 23) {
        console.log("Fear obscures the eyes of glorious opportunities!");
    } else {
        console.log("Last minutes embodies great opportunities!");
    }
}
conditionalStatement1();

const conditionalStatement2 = () => {
    const currentHour = new Date().getHours();

    switch (currentHour) {
      case 9:
        console.log("Today is special!");
        break;
      case 15:
        console.log("Don't waste today's opportunities!");
        break;
      case 21:
        console.log("Fear obscures the eyes of glorious opportunities!");
        break;
      default:
        console.log("Last minutes embodies great opportunities!");
    }
}
conditionalStatement2();


// Define three variables:
const color1 = "Blue";
const color2 = "White";
const color3 = "Yellow";

// Define a function:
function getColor(color) {
  switch (color) {
    case "Blue":
      console.log("Blue color value");
      break;
    case "White":
      console.log("White color value");
      break;
    case "Yellow":
      console.log("Yellow color value");
      break;
    default:
      console.log("Got no color value");
  }
}

// Invoke the getColor() function:
getColor(color1); // "Blue color value"
getColor(color2); // "White color value"
getColor(color3); // "Yellow color value"


console.log("ITERATION STATEMENTS");

const iterationStatement1 = () => {
    let currentDigit = 1;

    while (currentDigit < 5) {
      console.log(currentDigit);
      ++currentDigit;
    }
}
iterationStatement1();

const iterationStatement2 = () => {
    for (let currentDigit = 1; currentDigit < 5; ++currentDigit) {
        console.log(currentDigit);
    }
}
iterationStatement2();