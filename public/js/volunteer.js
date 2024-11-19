const form = document.querySelector(".form"),
  nextBtn = document.querySelector(".nextBtn"),
  backBtn = document.querySelector(".backBtn"),
  allInput = document.querySelectorAll(".first input");
console.log(allInput);
const firstForm = document.querySelector(".first");
const secondForm = document.querySelector(".second");
console.log(firstForm);
console.log(secondForm);
let isValid=false;
console.log(firstForm.classList);
nextBtn.addEventListener("click", () => {
  
  allInput.forEach((input) => {
    console.log(input.value);
    if (input.value.trim() === "") {
      isValid = false;
      return;
    }
    else{
      isValid=true;
    }
  });
  console.log(isValid);
  
  if (isValid) {
    firstForm.classList.add("secActive");
    firstForm.style.transform = "translateX(-100%)";
    secondForm.classList.add("secActive");
    secondForm.style.opacity = "1";
    secondForm.style.transform = "translateX(0%)";
    
    
  }console.log(firstForm.classList);
});

backBtn.addEventListener("click", () => {
  console.log("button clicked");
  firstForm.classList.remove("secActive");
  firstForm.style.transform = "translateX(0%)";
  secondForm.classList.remove("secActive");
  secondForm.style.opacity = "0";
  secondForm.style.transform = "translateX(100%)";
});
