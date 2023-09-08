const example1 = () => {
    var x = 1;
    let y = 2;
    const z = 3;
 
    x = 4; //OK 
    y = 5; //OK 
    z = 6; //Error
}

example1();