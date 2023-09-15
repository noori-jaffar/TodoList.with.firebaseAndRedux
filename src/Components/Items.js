import React, { useState, useEffect } from 'react';
import { BsTrash, BsCheckCircle, BsPencil } from "react-icons/bs";

export default function Items(props) {
  const [done, setDone] = useState(props.completed);
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.item);

  const handleCheck = () => {
    setDone(!done);
    // Call the checkHandler function if it's provided as a prop
    if (props.checkHandler) {
      props.checkHandler(props.id, !done);
    }
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Call the updateHandler function if it's provided as a prop
    if (props.updateHandler) {
      props.updateHandler(props.id, editedText);
    }
    setEditing(false);
  };

  useEffect(() => {
    if (!editing && editedText !== props.item) {
      // Call the updateHandler function if it's provided as a prop
      if (props.updateHandler) {
        props.updateHandler(props.id, editedText);
      }
    }
  }, [editing, editedText, props]);

  return (
    <div className={'select-none w-full border-b p-3 flex justify-between items-center'}>
      <div>
        <span className='pr-2 text-[10px] text-slate-400'>
          {props.time}
        </span>

        <span className={`${done ? 'line-through' : ''} text-[18px]`}>
          {editing ? (
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onBlur={handleSave}
              autoFocus
            />
          ) : (
            props.item
          )}
        </span>
      </div>

      <div>
        {editing ? (
          null
        ) : (
          <>
            <button className='p-3 button-complete task-button' onClick={handleCheck}>
              <BsCheckCircle className='fa fa-check-circle' />
            </button>
            <button className='p-3 button-edit task-button' onClick={handleEdit}>
              <BsPencil className='fa fa-edit' />
            </button>
            <button className='p-3 button-delete task-button' onClick={() => props.removeHandler(props.id)}>
              <BsTrash className='fa fa-trash' />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

