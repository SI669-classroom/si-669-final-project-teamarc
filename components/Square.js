//Square.js - makeup of each of the square in tic tac toe


import { useState } from 'react';
import { Button } from "@rneui/base";

// function Square() {
//     const [value, setValue] = useState(null);
  
//     function handleClick() {
//       setValue('X');
//     }
  
//     return (
//       <button
//         className="square"
//         onClick={handleClick}>
//         {value}
//       </button>
//     );

// }

function Square({ value, onSquareClick }) {
  return (
    <Button 
      onPress={onSquareClick}
      title={value}
      />
  );
}


export default Square;