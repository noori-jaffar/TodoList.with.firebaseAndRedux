import React from 'react';
import Items from './Items';

export default function Box(props) {


  return (
    <div className="box">
      {props.data.map((item) => (
        
        <Items
          key={item.id}
          id={item.id}
          item={item.todos}
          time={item.timestamp.toDate().toLocaleTimeString()}
          removeHandler={props.removeHandler}
          updateHandler={props.updateHandler}
          checkHandler={props.checkHandler} 
          completed={item.completed}
        />
      ))}
    </div>
  );
}
