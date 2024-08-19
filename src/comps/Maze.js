import Cell from './Cell';
import Player from './Player';

function generateGrid(rows, cols) {
    const grid = [];
    for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
            row.push({
                x, y,
                visited: false,
                walls: { top: true, right: true, bottom: true, left: true }
            });
        }
        grid.push(row);
    }
    return grid;
}

const DIRECTIONS = [
    { dx: 0, dy: 1, wall: 'top' },
    { dx: -1, dy: 0, wall: 'right' },
    { dx: 0, dy: -1, wall: 'bottom' },
    { dx: 1, dy: 0, wall: 'left' }
];


function randomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function inBounds(x, y, rows, cols) {
    return x >= 0 && x < cols && y >= 0 && y < rows;
}

function dfsMaze(grid, rows, cols, x, y) {
    const stack = [];
    const start = grid[y][x];
    start.visited = true;
    stack.push(start);

    while (stack.length > 0) {
        const current = stack.pop();
        const { x, y } = current;
        const neighbors = [];

        for (const { dx, dy, wall } of DIRECTIONS) {
            const nx = x + dx;
            const ny = y + dy;

            if (inBounds(nx, ny, rows, cols) && !grid[ny][nx].visited) {
                neighbors.push({ cell: grid[ny][nx], wall });
            }
        }

        if (neighbors.length > 0) {
            stack.push(current);
            const { cell: next, wall } = randomElement(neighbors);

            const oppositeWall = {
                top: 'bottom',
                right: 'left',
                bottom: 'top',
                left: 'right'
            };

            current.walls[wall] = false;
            next.walls[oppositeWall[wall]] = false;

            next.visited = true;
            stack.push(next);
        }
    }
}

function generateMaze(rows, cols) {
    const grid = generateGrid(rows, cols);
    dfsMaze(grid, rows, cols, 0, 0);
    return grid;
}

function Maze() {
    const rows = 25;
    const cols = 45;
    const lengthProps = {
        long: 25,
        short: 3
    };
    const grid = generateMaze(rows, cols);
    return (
        <>
            <Player x={0} y={0} lengthProps={lengthProps} grid={grid} />
            {grid.map((row, rowIndex) => (
                <>
                    {row.map((cell, cellIndex) => (
                        <Cell walls={cell.walls}
                            x={cellIndex * lengthProps.long}
                            y={rowIndex * lengthProps.long}
                            lengthProps={lengthProps}
                        />
                    ))}
                </>
            ))}
        </>
    );
}

export default Maze;
