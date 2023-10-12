import { useEffect, useState } from "react";

const Todos = ({ id, text, isCompleted }) => {
  const [isComplete, setComplete] = useState(isCompleted);

  function onCompleteHandler() {
    const newCompleted = !isComplete;
 
     setComplete(newCompleted);
  }


//   useEffect(() => {
//     setComplete(isCompleted);
//   }, [isCompleted]); // 
 

  return (
    <tr className={`todo ${isComplete ? "is-completed" : ""}`.trim()}>
      <td>{text}</td>

      <td>{isComplete ? "Completed" : "Uncompleted"}</td>
      <td className="todo-action">
        <button onClick={onCompleteHandler} className="btn todo-btn">
          Change status
        </button>
      </td>
    </tr>
  );
};

export default Todos;
