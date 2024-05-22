import { useState } from "react";
import DragItem from "./components/DragItem";
import DropBox from "./components/DropBox";
import "./App.css";

function App() {
  const [dragItems, setDragItems] = useState<{ name: string; id: string }[]>([
    { id: "1", name: "Item 1❤" },
    { id: "2", name: "Item 2🧡" },
    { id: "3", name: "Item 3💘" },
  ]);
  const [dropItems, setDropItems] = useState<{ name: string; id: string }[]>([]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDrop = (id: string) => {
    const item = dragItems.find((item) => item.id === id);
    if (item) {
      setDropItems((prevItems) => [...prevItems, item]);
    }
  };

  const onDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const onDragEnter = (index: number) => {
    console.log("on DragEnter");
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newDragItems = [...dragItems];
    const [draggedItem] = newDragItems.splice(draggedItemIndex, 1);
    newDragItems.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setDragItems(newDragItems);
  };

  const onDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Drag Items</h3>
          {dragItems.map((item, index) => (
            <DragItem
              key={item.id}
              name={`${item.name}`}
              id={item.id}
              index={index}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
              isDragging={draggedItemIndex === index}
            />
          ))}
        </div>
        <DropBox onDrop={handleDrop} droppedItems={dropItems} />
      </div>
    </div>
  );
}

export default App;
