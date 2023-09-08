// empty array
const myList = [ ];

// array of numbers
const numberArray = [ 2, 4, 6, 8];

// array of strings
const stringArray = [ 'eat', 'work', 'sleep'];

// array with mixed data types
const newData = ['work', 'exercise', 1, true];

// store arrays, functions and other objects inside an array
const newCustomData = [
    {'task1': 'exercise'},
    [1, 2 ,3],
    function hello() { console.log('hello')}
];

console.log("---------------------ADD AN ELEMENT TO AN ARRAY---------------------");

let dailyActivities = ['eat', 'sleep'];

// add an element at the end
dailyActivities.push('exercise');
console.log(dailyActivities); //  ['eat', 'sleep', 'exercise']

//add an element at the start
dailyActivities.unshift('work'); 
console.log(dailyActivities); // ['work', 'eat', 'sleep', 'exercise']


console.log("---------------------CHANGE THE ELEMENTS OF AN ARRAY---------------------");
dailyActivities = [ 'eat', 'sleep'];

// this will add the new element 'exercise' at the 2 index
dailyActivities[2] = 'exercise';
console.log(dailyActivities); // ['eat', 'sleep', 'exercise']

// this will add the new element 'exercise' at the 3 index
dailyActivities[4] = 'work';
console.log(dailyActivities); // ["eat", "sleep", "exercise", undefined, "work"]


console.log("---------------------REMOVE AN ELEMENT FROM AN ARRAY---------------------");

dailyActivities = ['work', 'eat', 'sleep', 'exercise'];

// remove the last element
dailyActivities.pop();
console.log(dailyActivities); // ['work', 'eat', 'sleep']

// remove the last element from ['work', 'eat', 'sleep']
const removedElement = dailyActivities.pop();

//get removed element
console.log(removedElement); // 'sleep'
console.log(dailyActivities);  // ['work', 'eat']

// remove the first element
dailyActivities.shift();
console.log(dailyActivities); // ['eat']


console.log("---------------------ARRAY LENGTH---------------------");

dailyActivities = [ 'eat', 'sleep'];

// this gives the total number of elements in an array
console.log(dailyActivities.length); // 2


console.log("---------------------ARRAY METHODS---------------------");

const playing = () => {
    let dailyActivities = ['sleep', 'work', 'exercise']
    let newRoutine = ['eat'];

    // sorting elements in the alphabetical order
    dailyActivities.sort();
    console.log(dailyActivities); // ['exercise', 'sleep', 'work']

    //finding the index position of string
    const position = dailyActivities.indexOf('work');
    console.log(position); // 2

    // slicing the array elements
    const newDailyActivities = dailyActivities.slice(1);
    console.log(newDailyActivities); // [ 'sleep', 'work']

    // concatenating two arrays
    const routine = dailyActivities.concat(newRoutine);
    console.log(routine); // ["exercise", "sleep", "work", "eat"]
}

playing();