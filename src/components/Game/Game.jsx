import "./Game.css";

function Game({ fieldSize, onHover, hoveredCells }) {
    return (
        <div className="game">
            {[...Array(fieldSize)].map((_el, rowNumber) => (
                <div key={`row ${rowNumber}`} className="row">
                    {[...Array(fieldSize)].map((_el, colNumber) => (
                        <div
                            key={`col ${colNumber}`}
                            className={`cell ${!!hoveredCells.find((cell) => cell.row === rowNumber && cell.col === colNumber) ? 'hovered' : ''}`}
                            onMouseEnter={() =>
                                onHover({ row: rowNumber, col: colNumber })
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Game;
