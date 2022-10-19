import React from 'react';

function Img({url, width, height, ...rest}) {
    return (
        <img src={url} width={width} height={height} {...rest}  alt="loi"/>
    );
}

export default Img;