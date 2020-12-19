import React, {Text} from 'react';

const MyTextCustomFont = (props) => {
    return (
         <Text style={{fontFamily:'Roboto'}} {...props} >{props.children}</Text>
    )
 }

 export default MyTextCustomFont;