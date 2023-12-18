import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { addItem, updateItem } from "./redux/actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DragAndDropList: React.FC = () => {
  const [item, setItem] = useState("");
  const [filtered, setFilter] = useState("");
  const [isEdit, setEdit] = useState<{ edit: boolean; id: string }>({
    edit: false,
    id: "",
  });

  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.content.items);
  const [filteredList, setFilteredList] = useState([...items]);

  const addData = () => {
    if (isEdit.edit) {
      dispatch(updateItem([{ id: isEdit.id, name: item }]));
    } else {
      dispatch(addItem([{ id: items.length.toString(), name: item }]));
    }
    setEdit({ edit: false, id: "" });
    setItem("");
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setEdit({ edit: false, id: "" });
    setFilteredList([...newItems]);
  };

  const filterList = () => {
    let list = items;
    if (filtered === "Incomplete") {
      list = list.filter((a: any) => a.complete === false);
    } else if (filtered === "Complete") {
      list = list.filter((a: any) => a.complete === true);
    }
    setEdit({ edit: false, id: "" });
    setFilteredList([...list]);
  };

  const editValue = (id: string) => {
    let list = items.filter((a: any) => a.id === id)[0];
    setItem(list.name);
    setEdit({ edit: true, id: list.id });
  };

  useEffect(() => {
    filterList();
    setItem("");
    setEdit({ edit: false, id: "" });
  }, [filtered, items]);

  useEffect(() => {
    setItem("");

    setEdit({ edit: false, id: "" });
    filterList();
  }, [items]);
  return (
    <div className="todo-app">
      <div className="title">Todo List Application</div>
      <div className="todo-list">
        <div className="top-options">
          <select
            className="dropdown"
            value={filtered}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFilter(e.target.value)
            }
          >
            {filtered === "" &&
            <option className="dropdown-content" value="">
              Filter By
            </option>}
            <option className="dropdown-content" value="Incomplete">
              Incomplete
            </option>
            <option className="dropdown-content" value="Complete">
              Complete
            </option>
            <option className="dropdown-content" value="Both">
              Both
            </option>
          </select>
          <div className="row search">
            <input
              type="text"
              value={item}
              id="input-box"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setItem(e.target.value)
              }
              placeholder="add your tasks"
            />
            {item !== "" && (
              <button onClick={() => addData()}>
                {isEdit.edit ? "Update" : "add"}
              </button>
            )}
          </div>
        </div>
       
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {filteredList.map((item: any, index: number) => (
                  <Draggable
                    key={item.id}
                    draggableId={`row-item-${item.id} row-item`}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem
                          key={item.id}
                          task={item}
                          editValue={editValue}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default DragAndDropList;
