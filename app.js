const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');

let currentPlayer;
let gameGrid;
const winningPositions=[
    [0 ,1 ,2],
    [3 ,4 ,5],
    [6 ,7 ,8],
    [0 ,3 ,6],
    [1 ,4 ,7],
    [2 ,5 ,8],
    [0 ,4 ,8],
    [2 ,4 ,6]
];

function initGame(){
    currentPlayer="O";
    gameGrid=["","","","","","","","",""];
    //to ui-
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents='all';
        box.classList=`box box${index+1}`;//to reset the color when new game is pressed
    });
    newGameBtn.classList.remove("active");

    gameInfo.innerText=`Current Player- ${currentPlayer}`;
};
initGame();

function swapTurn(){
    if(currentPlayer==='X'){
        currentPlayer='O';
    }
    else {
        currentPlayer='X';

    };

    //update the ui
    gameInfo.innerText=`Current Player- ${currentPlayer}`;
};


function checkGameOver(){
    let winner="";
    winningPositions.forEach((position)=>{
        //all three boxes should be non empty and have same value
        if((gameGrid[position[0]]!==""|| gameGrid[position[1]]!==""||gameGrid[position[2]]!=="")
        && (gameGrid[position[0]]===gameGrid[position[1]]) && (gameGrid[position[1]]===gameGrid[position[2]]))
    {
        //Checking the winner
        if(gameGrid[position[0]]==="X"){
            winner="X";
        }
        else
        winner="O";
        
        //disable pointer events because we have the winner now
        boxes.forEach((box)=>{
            box.style.pointerEvents="none";
        });

        //now we know the winner so green color :
        boxes[position[0]].classList.add("win");
        boxes[position[1]].classList.add("win");
        boxes[position[2]].classList.add("win");
    };
    });

    // now we have a winner
    if(winner!==""){
        gameInfo.innerText=`Winner Player- ${winner}`;
        newGameBtn.classList.add("active");
        return;
    }
;

    //checking for tie
    let fillCount=0;
    gameGrid.forEach((box)=>{
        if(box!=="")
            fillCount++;
    });

    if(fillCount===9){
        gameInfo.innerText="Game is tied";
        newGameBtn.classList.add("active");
    };
    
};

function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText=currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents='none';
        gameInfo.textContent = `Current Player : ${currentPlayer}`;
        //swap the turn
        swapTurn();

        //chech if win
        checkGameOver();


    };
};

boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClick(index);
    });
});

newGameBtn.addEventListener('click',initGame);


//netifly