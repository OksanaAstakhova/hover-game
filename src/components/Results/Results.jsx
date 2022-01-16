import "./Results.css";

function Results({ hoveredCells }) {
    const sortedResults = hoveredCells
        .sort((cellA, cellB) => cellA?.col - cellB?.col)
        .sort((cellA, cellB) => cellA?.row - cellB?.row);
    return (
        <div className="results">
            <h2>Hover Squares</h2>
            <ul>
                {sortedResults.map((cell) => (
                    <li key={`row ${cell.row} col ${cell.col}`}>
                        row {cell.row + 1} col {cell.col + 1}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Results;
