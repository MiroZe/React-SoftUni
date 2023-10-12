import { useEffect, useState } from "react";
import Loading from "./Loading";

import Todos from "./Todos";

const Table = () => {
  const [todo, setTodos] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3030/jsonstore/todos`)
      .then((res) => res.json())
      .then((data) => {
        const result = Object.values(data);

        setTodos(result);
        setIsloading(true);
      });
  }, []);

  return (
    <div className="table-wrapper">
        {
            !isLoading ? <Loading /> : 
        
      <table className="table">
        <thead>
          <tr>
            <th className="table-header-task">Task</th>
            <th className="table-header-status">Status</th>
            <th className="table-header-action">Action</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((t) => 
            <Todos key={t._id} {...t} />
          )}k
        </tbody>
      </table>
      }
    </div>
  );
};

export default Table;
