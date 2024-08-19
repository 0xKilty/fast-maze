function Wall(props) {
    const isVertical = props.position === 'top' || props.position === 'bottom';
    const height = isVertical ? `${props.lengthProps.short}px` : `${props.lengthProps.long}px`;
    const width = isVertical ? `${props.lengthProps.long + props.lengthProps.short}px` : `${props.lengthProps.short}px`;

    const x = props.position === 'left' ? props.x + props.lengthProps.long : props.x;
    const y = props.position === 'top' ? props.y + props.lengthProps.long : props.y;
    
    return (
        <div style={{
            height,
            width,
            left: `${x}px`,
            top: `${y}px`
        }} className='wall'></div>
    );
}

export default Wall;