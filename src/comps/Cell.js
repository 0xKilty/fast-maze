import Wall from './Wall'

function Cell(props) {
    return (
        <>
            {props.walls.top && <Wall position='top' {...props} />}
            {props.walls.bottom && <Wall position='bottom' {...props} />}
            {props.walls.left && <Wall position='left' {...props} />}
            {props.walls.right && <Wall position='right' {...props} />}
        </>
    );
}

export default Cell;