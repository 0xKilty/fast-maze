import React, { useState, useEffect } from 'react';
import Trail from './Trail';

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

    const [trail, setTrail] = useState([]);

    const notBounded = ({ x, y }, direction) => {
        if (y < 0 || x < 0 || x >= props.dimensionProps.cols || y >= props.dimensionProps.rows) {
            return false
        }
        const { top, right, left, bottom } = props.grid[y][x].walls;

        switch (direction) {
            case 'ArrowUp':
                return !top;
            case 'ArrowRight':
                return !right;
            case 'ArrowLeft':
                return !left;
            case 'ArrowDown':
                return !bottom;
            default:
                return true;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            let newCoords = { ...coords };
            let newEntry = { ...entry };

            switch (event.key) {
                case 'ArrowUp':
                    newCoords.y -= props.lengthProps.long;
                    newEntry.y -= 1;
                    break;
                case 'ArrowDown':
                    newCoords.y += props.lengthProps.long;
                    newEntry.y += 1;
                    break;
                case 'ArrowLeft':
                    newCoords.x -= props.lengthProps.long;
                    newEntry.x -= 1;
                    break;
                case 'ArrowRight':
                    newCoords.x += props.lengthProps.long;
                    newEntry.x += 1;
                    break;
                default:
                    break;
            }

            if (notBounded(newEntry, event.key)) {
                setCoords(newCoords);
                setEntry(newEntry);
                setTrail((prevTrail) => [...prevTrail, { entry: newEntry, direction: event.key }])
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [coords, entry]);

    return (
        <>
            <Trail trail={trail} lengthProps={props.lengthProps} />
            <div style={{
                height: `${size}px`,
                width: `${size}px`,
                left: `${coords.x}px`,
                top: `${coords.y}px`
            }} className='player'></div>
        </>
    );
}

export default Player;
