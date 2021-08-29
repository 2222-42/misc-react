import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { /* 関数コンポーネント: 
                                自分の state を持たないコンポーネントを、よりシンプルに書くための方法 
                                React.Component を継承するクラスを定義する代わりに、props を入力として受け取り表示すべき内容を返す関数を定義*/
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button >
    );
}

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice(); /* 現在の配列を直接変更する代わりに、square 配列のコピーを作成し、それを変更する
                                                       直接データのミューテート（すなわち内部データの書き換え）をしないことの利点
                                                        1. 複雑な機能が簡単に実装できる
                                                        2. 変更の検出
                                                        3. React の再レンダータイミングの決定 */
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }
    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />;
    }

    render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
