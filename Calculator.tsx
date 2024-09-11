import React, { useState } from 'react';
import Button from './Button';
import './calculator.css';

const Calculator: React.FC = () => {
    const initMatrix = () => Array(3).fill(null).map(() => Array(3).fill(0));
    const [matrixA, setMatrixA] = useState(initMatrix);
    const [matrixB, setMatrixB] = useState(initMatrix);
    const [result, setResult] = useState(initMatrix);

    const handleInputChange = (matrixSetter, i, j, event) => {
        const value = event.target.value;
        matrixSetter(prev => {
            const newMatrix = prev.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    if (rowIndex === i && colIndex === j) {
                        return Number(value);
                    }
                    return cell;
                });
            });
            return newMatrix;
        });
    };

    const addMatrices = () => {
        const newResult = matrixA.map((row, i) =>
            row.map((cell, j) => cell + matrixB[i][j])
        );
        setResult(newResult);
    };

    const subtractMatrices = () => {
        const newResult = matrixA.map((row, i) =>
            row.map((cell, j) => cell - matrixB[i][j])
        );
        setResult(newResult);
    };

    const multiplyMatrices = () => {
        const newResult = initMatrix();
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 3; k++) {
                    newResult[i][j] += matrixA[i][k] * matrixB[k][j];
                }
            }
        }
        setResult(newResult);
    };

    return (
        <div className="calculator-container">
            <h2>Calculadora de Matrices</h2>
            <div className="matrix-container">
                <div className="matrix-grid">
                    {matrixA.map((row, i) => row.map((val, j) => (
                        <input
                            type="number"
                            value={val}
                            className="matrix-cell"
                            onChange={(e) => handleInputChange(setMatrixA, i, j, e)}
                        />
                    )))}
                </div>
                <div className="operations-container">
                    <Button label="A + B" onClick={addMatrices} />
                    <Button label="A - B" onClick={subtractMatrices} />
                    <Button label="A x B" onClick={multiplyMatrices} />
                </div>
                <div className="matrix-grid">
                    {matrixB.map((row, i) => row.map((val, j) => (
                        <input
                            type="number"
                            value={val}
                            className="matrix-cell"
                            onChange={(e) => handleInputChange(setMatrixB, i, j, e)}
                        />
                    )))}
                </div>
            </div>
            <div className="result-grid">
                {result.map(row => row.map(val => (
                    <div className="matrix-cell">{val}</div>
                )))}
            </div>
        </div>
    );
}

export default Calculator;
