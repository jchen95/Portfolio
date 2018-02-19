var numbSquares = 6
var colors = [];
var pickedColor;
var colorDisplay = document.getElementById("colorDisplay");
var statusDisplay = document.getElementById("statusDisplay");
var squares = document.querySelectorAll(".square")
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector('#hard');
var modeButtons = document.querySelectorAll(".mode");

init();

function init () {
  for (i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener ("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected")
      this.textContent === "Easy" ? numbSquares = 3: numbSquares = 6;
      reset();
    } )
  } 
  for (i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function () {
      var clickedColor = this.style.backgroundColor;
      if (clickedColor == pickedColor) {
        statusDisplay.textContent = "Correct!";
        resetButton.textContent = "Play Again?";
        clickedRight (pickedColor);
        document.querySelector("h1").style.backgroundColor = pickedColor;
      } else {
        this.style.background = "#232323";
        statusDisplay.textContent = "Try Again!";
      }
    });
  }
  reset();
}

for (i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener ("click", function () {
    modeButtons[0].classList.remove("selected");
    modeButtons[1].classList.remove("selected");
    this.classList.add("selected")
    this.textContent === "Easy" ? numbSquares = 3: numbSquares = 6;
    reset();
  } )
}

function reset() {
  colors = generateRandomColors(numbSquares);
  resetButton.textContent = "New Colors";
  statusDisplay.textContent = "";
  pickedColor = randomWinner();
  colorDisplay.textContent = pickedColor;
  for (i = 0; i < squares.length; i++) {
    squares[i].style.display = "block";
    if(colors[i]){
    squares[i].style.backgroundColor = colors[i];
  } else {
    squares[i].style.display = "none";
  }
}
  document.querySelector("h1").style.backgroundColor = "lightseagreen";
}


function randomWinner() {
 var random = Math.floor(Math.random() * colors.length)
 return colors[random];  
}

function generateRandomColors(num) {
var arr = [];
for (i = 0; i < num; i++) {
arr.push(randomColor());
}
return arr; 
}

function randomColor () {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  
  return "rgb(" + r + "," + " "  + g + ","+ " " + b + ")";
}

function clickedRight (color) {
  for(i = 0; i < squares.length; i++) {
    squares[i].style.background = color;
  }
};

for (i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function () {
    var clickedColor = this.style.background;
    if (clickedColor === pickedColor) {
      statusDisplay.textContent = "Correct!";
      resetButton.textContent = "Play Again?";
      clickedRight (pickedColor);
      document.querySelector("h1").style.backgroundColor = pickedColor;
    } else {
      this.style.background = "#232323";
      statusDisplay.textContent = "Try Again!";
    }
  });
}

resetButton.addEventListener("click", function() {
  reset();
} )

// easyButton.addEventListener("click", function () {
//  easyButton.classList.add("selected");
//  hardButton.classList.remove("selected")
//  numbSquares = 3;
//  colors = generateRandomColors(numbSquares);
//  pickedColor = randomWinner();
//  colorDisplay.textContent = pickedColor;
//  document.querySelector("h1").style.backgroundColor = "lightseagreen";
//  for (i = 0; i < squares.length; i++) {
//    if (colors[i]) {
//      squares[i].style.background = colors[i];
//    } else {
//      squares[i].style.display = "none";
//    }
//  }
// });


 
// hardButton.addEventListener("click", function () {
//   hardButton.classList.add("selected");
//   easyButton.classList.remove("selected")
//   numbSquares = 6
//   colors = generateRandomColors(numbSquares);
//  pickedColor = randomWinner();
//  colorDisplay.textContent = pickedColor;
//  document.querySelector("h1").style.backgroundColor = "lightseagreen";
//  for (i = 0; i < squares.length; i++) {
//      squares[i].style.background = colors[i];
//      squares[i].style.display = "block";
//    }
//  });