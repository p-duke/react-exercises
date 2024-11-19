import { useState } from 'react';

function Square({ value, onSquareClick }) {
    return <button onClick={onSquareClick} className="square">{value}</button>;
}

export default function Board() {
    const emptyBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    const [squares, setSquares] = useState(emptyBoard);
    const [xIsNext, setXIsNext] = useState(true);

    const handleClick = (r,c) => {
        if (squares[r][c] || calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();

        if (xIsNext) {
            nextSquares[r][c] = 'X';
        } else {
            nextSquares[r][c] = 'O';
        }

        setXIsNext(!xIsNext);
        setSquares(nextSquares);
    };

    const calculateWinner = (board) => {
        const rows = board.length;
        const cols = board[0].length;
        let winner = '';

        // row major traversal
        for (let row = 0; row < rows; row++) {
            if (board[row][0] === 'X' && board[row][1] === 'X' && board[row][2] === 'X') {
                winner = 'X';
            }

            if (board[row][0] === 'O' && board[row][1] === 'O' && board[row][2] === 'O') {
                winner = 'O';
            }
        }

        // col major traversal
        for (let col = 0; col < cols; col++) {
            if (board[0][col] === 'X' && board[1][col] === 'X' && board[2][col] === 'X') {
                winner = 'X';
            }

            if (board[0][col] === 'O' && board[1][col] === 'O' && board[2][col] === 'O') {
                winner = 'O';
            }
        }

        // diag top-left-to-bottom
        if (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] == 'X') {
            winner = 'X';
        } else if (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] == 'O') {
            winner = 'O';
        }

        // diag top-right-to-bottom
        if (board[0][2] === 'X' && board[1][1] === 'X' && board[0][2] == 'X') {
            return 'X';
        } else if (board[0][2] === 'O' && board[1][1] === 'O' && board[0][2] == 'O') {
            winner = 'O';
        }

        return winner.length ? `Winner is ${winner}!` : '';
    }

    return (
        <>
            <p>Current Turn: {xIsNext ? 'X' : 'O'}</p>
            <div className="board-row">
                <Square onSquareClick={() => handleClick(0, 0)} value={squares[0][0]}/>
                <Square onSquareClick={() => handleClick(0, 1)} value={squares[0][1]}/>
                <Square onSquareClick={() => handleClick(0, 2)} value={squares[0][2]}/>
            </div>
            <div className="board-row">
                <Square onSquareClick={() => handleClick(1, 0)} value={squares[1][0]}/>
                <Square onSquareClick={() => handleClick(1, 1)} value={squares[1][1]}/>
                <Square onSquareClick={() => handleClick(1, 2)} value={squares[1][2]}/>
            </div>
            <div className="board-row">
                <Square onSquareClick={() => handleClick(2, 0)} value={squares[2][0]}/>
                <Square onSquareClick={() => handleClick(2, 1)} value={squares[2][1]}/>
                <Square onSquareClick={() => handleClick(2, 2)} value={squares[2][2]}/>
            </div>
            <p>{ calculateWinner(squares).length ? calculateWinner(squares) : null }</p>
        </>
    ); 
}
