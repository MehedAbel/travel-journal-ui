function foo() {
    var x = 1;
}

const example2 = () => {
    foo();
    console.log(x); // ReferenceError: x is not defined
}

example2();
