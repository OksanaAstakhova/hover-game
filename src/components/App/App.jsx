import { useState, useEffect } from "react";

import Game from "../Game/Game";
import Results from "../Results/Results";
import "./App.css";

const modesUrl = "http://demo1030918.mockable.io/";

function App() {
    const [modes, setModes] = useState();
    const [selectedMode, setSelectedMode] = useState();
    const [modeName, setModeName] = useState("default");
    const [hoveredCells, setHoveredCells] = useState([]);

    const buttonIsDisabled = modeName === "default";

    const handleStart = () => {
        setSelectedMode(modes.find(({ name }) => name === modeName));
        setHoveredCells([]);
    };

    const handleChange = (e) => setModeName(e.target.value);
    const handleHover = ({ row, col }) => {
        const hovered = !!hoveredCells.find(
            (cell) => cell.row === row && cell.col === col
        );
        setHoveredCells(
            hovered
                ? hoveredCells.filter(
                      (cell) => cell.row !== row || cell.col !== col
                  )
                : [...hoveredCells, { row, col }]
        );
    };

    useEffect(() => {
        fetch(modesUrl)
            .then((response) => response.json())
            .then((data) => {
                setModes(
                    Object.keys(data).map((mode) => ({
                        name: mode,
                        ...data[mode],
                    }))
                );
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="App">
            <div className="main">
                <div className="controls">
                    <select defaultValue={modeName} onChange={handleChange}>
                        <option value="default" disabled hidden>
                            Pick mode
                        </option>
                        {modes?.map((mode) => (
                            <option key={mode.name} value={mode.name}>
                                {mode.name}
                            </option>
                        ))}
                    </select>
                    <button
                        disabled={buttonIsDisabled}
                        onClick={handleStart}
                        className="start"
                    >
                        START
                    </button>
                </div>
                {selectedMode && (
                    <Game
                        fieldSize={selectedMode?.field}
                        onHover={handleHover}
                        hoveredCells={hoveredCells}
                    />
                )}
            </div>
            <Results hoveredCells={hoveredCells} />
        </div>
    );
}

export default App;
