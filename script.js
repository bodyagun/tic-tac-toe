const Gameboard = (() => {
    let board = []

    function placeMarker(index, marker) {
        board[index] = marker
    }

    function getBoard() {
        return board
    }

    function reset() {
        board = []
    }

    return {placeMarker, getBoard, reset}
})()

function Player(name, marker) {
    return {name, marker}
}

const GameController = (() => {

// nextTurn = false is the default value (x placement)
let nextTurn = false
let activePlayer = "x"

    function playRound(index) {
        if (Gameboard.getBoard()[index]) {
            return
        } else {
            Gameboard.placeMarker(index, activePlayer)
            switchTurn()
        }
    }

    function switchTurn() {
        if (nextTurn === false) {
            nextTurn = true
            activePlayer = "o"
        } else if (nextTurn === true) {
            nextTurn = false
            activePlayer = "x"
        }
    }

    function getActivePlayer () {
        return activePlayer
    }

    function checkWinner() {

    }

    function checkTie() {
        
    }

    return {}

})()