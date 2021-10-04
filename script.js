/* 
             _1_|_2_|_3_
             _4_|_5_|_6_
              7 | 8 | 9

Each box is uniquely identified as box-1, box-2 ....
*/


// One time declared variables-------------------------------
const boxes = document.querySelectorAll(".small-box");
const resetBtn = document.querySelector(".button-reset");
const winnerTxt = document.querySelector(".winner-text");
const bigBox = document.querySelector(".big-box");
const modal = document.querySelector(".modal");
const arr = new Array(9).fill(0);


//Switch variable to toggle between players--------------------------
let togglePlayer = true;


// Functions used in the code
let findWinner, resetGrid, toggler, findClass;


// Logic to Find the Winner of the game.
findWinner = () =>{

    // if X wins
    const x_win = (arr[0] === 1 && arr[1] === 1 && arr[2] === 1) || (arr[3] === 1 && arr[4] === 1 && arr[5] === 1)
                || (arr[6] === 1 && arr[7] === 1 && arr[8] === 1) || (arr[0] === 1 && arr[3] === 1 && arr[6] === 1) 
                || (arr[1] === 1 && arr[4] === 1 && arr[7] === 1) || (arr[2] === 1 && arr[5] === 1 && arr[8] === 1)
                || (arr[0] === 1 && arr[4] === 1 && arr[8] === 1) || (arr[2] === 1 && arr[4] === 1 && arr[6] === 1);

    // if O wins
    const y_win = (arr[0] === 2 && arr[1] === 2 && arr[2] === 2) || (arr[3] === 2 && arr[4] === 2 && arr[5] === 2) 
                || (arr[6] === 2 && arr[7] === 2 && arr[8] === 2) || (arr[0] === 2 && arr[3] === 2 && arr[6] === 2)
                || (arr[1] === 2 && arr[4] === 2 && arr[7] === 2) || (arr[2] === 2 && arr[5] === 2 && arr[8] === 2)
                || (arr[0] === 2 && arr[4] === 2 && arr[8] === 2) || (arr[2] === 2 && arr[4] === 2 && arr[6] === 2);

    // X - > 
    if(x_win === true){
        winnerTxt.setAttribute("value", "Winner X");
        bigBox.style.backgroundColor = "red";
        modal.style.backgroundColor = "red";
        bigBox.style.visibility = "hidden";
        
    }

    // O - > 
    else if(y_win === true){
        winnerTxt.setAttribute("value", "Winner O");
        bigBox.style.backgroundColor = "green";
        modal.style.backgroundColor = "green";
        bigBox.style.visibility = "hidden";
        
    }

    // Draw condition.
    else{
        if(arr.includes(0) === false){
            winnerTxt.setAttribute("value", "Draw!");
        }
    }
    
}

// To reset the board so that new game can start -------------------------------
resetGrid = () => {

    //Clear every box on the board
    for(let i = 0; i < boxes.length; i++){
        boxes[i].innerHTML = "";
        arr[i] = 0;
        boxes[i].style.borderColor = "black";        
    }

    // Changing all the values to default
    togglePlayer = true;
    modal.style.backgroundColor = "aliceblue";
    bigBox.style.backgroundColor = "";
    winnerTxt.setAttribute("value", "");
    bigBox.style.visibility = "visible";
}

//Function to add X or O one after another -------------------------------------
toggler = (e) => {
    const ch = String(e).charAt(e.length-1);
    const num = Number(ch);
    const element = document.querySelector("."+e);

// for X -> Player 1 ---------------------------------------
    if(arr[num-1] == 0){
        if(togglePlayer == true){
            togglePlayer = false;
            arr[num-1] = 1;
            element.innerHTML = `</i><i class="fas fa-times">`;
            boxes.forEach((box) => {
                box.style.borderColor = 'green';
            });
        }

// for O -> player 2 ----------------------------------------
        else{
            arr[num-1] = 2;
            togglePlayer = true;
            element.innerHTML = `<i class="far fa-circle"></i>`;
            boxes.forEach((box) => {
                box.style.borderColor = 'red';
            })
        }
    }
}

//function to find the position of the click on the board to add either X or O -------------------
findClass = (e) => {
    const className = e.target.className.split(" ");
    const myBox = document.querySelector("."+className[1]);
    myBox.addEventListener("click", toggler(className[1]))
    findWinner();
    
}

//Event listner on Big-Box to find the click event.
bigBox.addEventListener("click", findClass);

// Reset Button event listner ----------------------------------
resetBtn.addEventListener("click", resetGrid);