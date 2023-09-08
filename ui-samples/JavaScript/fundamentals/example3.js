function foo() {
    let y = 2;
    const z = 3;
}
   
const example3 = () => {
    foo();
    console.log(y); // ReferenceError: y is not defined 
    console.log(z); // ReferenceError: z is not defined
}

example3();