

import React from 'react'

/*For tab title */
const Helmet = (props) => {
    document.title = 'ShopEase - ' + props.title
   return <div className="w-100">{props.children}</div>;
}

export default Helmet