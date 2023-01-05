import React from 'react';
import Img from "./Img";

const cardStyle = {
    padding: '26px 10px 0',
}
const AntCard = ({children, url, heightUrl, widthUrl, ...rest}) => {

    return <div {...rest}>
        {url && <Img url={url} height={heightUrl} width={widthUrl}/>}
        <div style={cardStyle}>
            {children}
        </div>
    </div>
}
export default AntCard