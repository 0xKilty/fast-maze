import React, { useState, useEffect } from 'react';

function Player(props) {
    const padding = 10;
    const size = props.lengthProps.long - padding;

    const [coords, setCoords] = useState({
        x: props.x + padding - props.lengthProps.short,
        y: props.y + padding - props.lengthProps.short
    });

    const [entry, setEntry] = useState({
        x: props.x,
        y: props.y
    });

    const [currentWalls, setCurrentWalls] = useState(props.grid[0][0].walls);
 
    const movePlayer = (direction) => {
        const { grid, lengthProps } = props;
        const walls = grid[entry.y][entry.x].walls;
        console.log(walls, entry.y, entry.x)
        if (direction === 'ArrowUp' && !walls.top) {
            
        } else if (direction === 'ArrowDown' && !walls.bottom) {
            
        } else if (direction === 'ArrowLeft' && !walls.left) {
            
        } else if (direction === 'ArrowRight' && !walls.right) {
            
        }
    };

    const handleKeyDown = (event) => {
        switch (event.key) {
            case 'ArrowUp':
                setCoords((prevCoords) => ({ x: prevCoords.x, y: prevCoords.y - props.lengthProps.long }));
                setEntry((prevEntry) => ({ x: prevEntry.x, y: prevEntry.y - 1 }));
                break;
            case 'ArrowDown':
                setCoords((prevCoords) => ({ x: prevCoords.x, y: prevCoords.y + props.lengthProps.long }));
                setEntry((prevEntry) => ({ x: prevEntry.x, y: prevEntry.y + 1 }));
                break;
            case 'ArrowLeft':
                setCoords((prevCoords) => ({ x: prevCoords.x - props.lengthProps.long, y: prevCoords.y }));
                setEntry((prevEntry) => ({ x: prevEntry.x - 1, y: prevEntry.y }));
                break;
            case 'ArrowRight':
                setCoords((prevCoords) => ({ x: prevCoords.x + props.lengthProps.long, y: prevCoords.y }));
                setEntry((prevEntry) => ({ x: prevEntry.x + 1, y: prevEntry.y }));
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        console.log("Entry ", entry.x, entry.y)
        setCurrentWalls((prevWalls) => props.grid[entry.y][entry.x].walls)
    }, [entry]);

    useEffect(() => {
        console.log("Current Walls ", currentWalls)
    }, [currentWalls]);

    return (
        <div style={{
            height: `${size}px`,
            width: `${size}px`,
            left: `${coords.x}px`,
            top: `${coords.y}px`
        }} className='player'></div>
    );
}

export default Player;
