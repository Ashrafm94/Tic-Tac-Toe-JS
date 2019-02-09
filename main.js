var XTurn = true;
var wins = [];
var canClick = true;

var WinResults = {
    WIN : 1,
    LOSE : 2,
    DRAW : 3
};

$(document).ready(function(){
    StartGame();
});

var NewGame = function(){
    wins = [];
    StartGame();
}

var StartGame = function(){
    BuildBoard();
    XTurn = true;
    canClick = true;
    if($("#game_result").hasClass('active')){
        $("#game_result").removeClass('active');
    }
}

//Build the Dynamic Board
var BuildBoard = function(){

    //Get Board
    var parent = document.getElementById("game_board");

    //In Case We Don't Have Board Handle
    if(parent === null){
        return;
    }

    //Remove All Elements
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }

    //Create Board
    //Create Three Rows
    for(let i = 0; i < 3; i++){

        var row = document.createElement('div');
        row.classList.add('row');

        //Create 3 Columns Inside Each Row
        for (let j = 0; j < 3; j++){
            var col = document.createElement('div');
            col.classList.add('col');

            if(j > 0){
                col.classList.add('no-border-left');
            }

            if(i > 0){
                col.classList.add('no-border-top');
            }

            var id = ( (3 * i) + (j + 1));

            //create span
            var span = document.createElement('span');
            span.classList.add('middle_screen');
            span.id = "sp_" + id;
            
            //add span the column
            col.appendChild(span);
            //add the column to the row
            row.appendChild(col);
        }

        //add the row to the board
        parent.appendChild(row);
    }

    //Add Action Listener For Each Column With ID
    var lst = parent.getElementsByClassName('col');
    
    for(let i = 0; i < lst.length; i++) {
        lst[i].addEventListener('click', function(){
            Play(i + 1);
        });
    }

}

var Play = function(id){

    var span = document.getElementById("sp_" + id);

    if(span === null || canClick === false){
        return;
    }

    if(span.innerHTML.length === 0){
        if(XTurn){
            span.innerHTML = "X";
        }else{
            span.innerHTML = "O";
        }

        XTurn = !XTurn; //Swap Turn
    }
    
    var winResult = CheckForWinner();

    if(winResult === WinResults.WIN || winResult === WinResults.DRAW){
        canClick = false;
        if(!($("#game_result").hasClass('active'))){
            $("#game_result").addClass('active');
        }

        var res = "";

        if(winResult === WinResults.WIN){
            if(!XTurn)
                res = "X ";
            else
                res = "O ";
            
            res = res + "Wins!";
        }else{
            res = "Draw!";
        }

        document.getElementById("currResult").innerHTML = res;
        wins.push(res);
    }
}

//Check For Winner
var CheckForWinner = function(){

    var lst = GetListOfValues();
    
    //Check For Rows
    if(isWinner(lst, [0,1,2]) || isWinner(lst, [3,4,5]) || isWinner(lst, [6,7,8]) )
        return WinResults.WIN;

    //Check For Columns
    if(isWinner(lst, [0,3,6]) || isWinner(lst, [1,4,7]) || isWinner(lst, [2,5,8]) )
        return WinResults.WIN;

    //Check for Diagonals
    if(isWinner(lst, [0,4,8]) || isWinner(lst, [2,4,6]))
        return WinResults.WIN;

    if(isBoardFull(lst))
        return WinResults.DRAW;
        
    return WinResults.LOSE;
}

//Check For Winner With the Given Indexes
var isWinner = function(lst, indexes){
    if(indexes.length !== 3)
        return false;
    
    return (lst[indexes[0]] === lst[indexes[1]] && lst[indexes[0]] === lst[indexes[2]] && lst[indexes[0]].length > 0);
}

//Get List Of Values (X,O, OR EMPTY)
var GetListOfValues = function(){

    var lst = [];

    for(var i = 1; i <= 9; i++){
        
        var val = document.getElementById("sp_" + i).innerHTML;
        lst.push(val);
    }

    return lst;
}

//Check if the Board is Full OR NOT
var isBoardFull = function(lst){
    for(var i = 0; i < lst.length; i++)
        if(lst[i].length === 0)
            return false;

    return true;
}