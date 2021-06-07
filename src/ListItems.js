import React from 'react';
import './ListItem.css';

function ListItems(props) {
    const items = props.items;
    if (props.items) {
        const listItems = items.map(item =>
            { 
                return (
                  <div className="list" key={item.key}>
                    <p>
                      <input
                        type="text"
                        id={item.key}
                        value={item.text}
                        onChange={(e) => {
                          props.setUpdate(e.target.value, item.key);
                        }}
                      />
                      <span>
                      <button type="button" onClick={(e)=>{props.deleteItem(item.key)}}>Delete</button>
                      </span>
                    </p>
                  </div>
                ); 
           })
       return (<div className="list-items">{listItems}</div>)
    } else {
        return (<p>No data :-)</p>)
    }
}
export default ListItems