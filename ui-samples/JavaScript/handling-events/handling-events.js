const btn = document.querySelector("button");

const random = (number) => Math.floor(Math.random() * (number + 1));

const changeBackground = () => {
    const rndCol = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
    document.body.style.backgroundColor = rndCol;
}
  
btn.addEventListener("click", changeBackground);

// btn.removeEventListener("click", changeBackground);

