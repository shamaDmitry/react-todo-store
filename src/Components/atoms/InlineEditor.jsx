import PropTypes from "prop-types";
import { PencilIcon, CheckIcon } from '@heroicons/react/24/solid';
import classNames from 'classnames';
import { useState } from 'react';
import { useRef } from 'react';

const InlineEditor = ({ todo, handleUpdate }) => {
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef(null);

  const onUpdate = () => {
    if (todo.title !== inputRef.current.value) {
      handleUpdate({
        ...todo,
        title: inputRef.current.value,
      });
    }
  }

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsEdit(false);
      event.target.blur();
    }
    if (event.key === "Enter") {
      setIsEdit(false);
      event.target.blur();
      onUpdate();
    }
  }

  if (isEdit) {
    return (
      <>
        <input
          type="text"
          className="w-full h-8 px-2 border"
          defaultValue={todo.title}
          ref={(el) => inputRef.current = el}
          onKeyDown={onKeyDown}
          onChange={event => inputRef.current.value = event.target.value}
        />

        <button
          className="self-center px-2 py-1 text-green-500"
          onClick={() => {
            setIsEdit(false);
            onUpdate();
          }}
        >
          <CheckIcon className="w-4 pointer-events-none" />
        </button>
      </>
    )
  }

  return (
    <>
      <span className={classNames("flex items-center w-full h-8 px-2 overflow-hidden text-ellipsis", {
        "line-through": todo.isDone
      })}>
        {todo.title}
      </span>

      <button
        className="px-2 py-1 text-slate-500"
        onClick={() => {
          setIsEdit(true);
          setTimeout(() => {
            inputRef.current.focus();
          }, 0)
        }}
      >
        <PencilIcon className="w-4 pointer-events-none" />
      </button>
    </>
  );
}

InlineEditor.propTypes = {
  todo: PropTypes.object.isRequired,
  handleUpdate: PropTypes.func.isRequired,
}

export default InlineEditor;
