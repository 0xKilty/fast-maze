
function Trail(props) {
    const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    return (
        <>
            {props.trail.map((trailEntry, trailEntryIndex) => {
                const { x, y } = trailEntry.entry
                const direction = trailEntry.direction
                const height = direction === 'ArrowUp' || direction === 'ArrowDown' ? '29px' : '5px';
                const width = direction === 'ArrowRight' || direction === 'ArrowLeft' ? '29px' : '5px';
                const xshift = direction === 'ArrowRight' ? -12 : 12;
                const yshift = direction === 'ArrowDown' ? -12 : 12;
                return (
                    <div style={{
                        height,
                        width,
                        left: `${x * props.lengthProps.long + xshift}px`,
                        top: `${y * props.lengthProps.long + yshift}px`,
                        backgroundColor: `red`
                    }} className='trail'></div>
                )
            })}
            
        </>
    );
}

export default Trail;