
console.log("------------REGULAR FUNCTIONS------------");

console.log("add(2, 3) =", add(2, 3));

// Function declaration
function add(a, b) {
    return a + b;
}

// Function expression
const sum = function(a, b) {
    return a + b;
}

console.log("sum(2, 3) =", sum(2, 3));

console.log("------------ARROW FUNCTIONS------------");

// Arrow function exression
const multiply = (a, b) => {
    return a * b;
}

//very simple and concise syntax
const multiplication = (a, b) => a * b;