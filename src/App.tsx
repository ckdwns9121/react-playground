import { useState } from "react";

import "./App.css";

// DragItem 컴포넌트 타입 정의
interface DragItemProps {
  name: string;
  id: string;
}

// DragItem 컴포넌트
const DragItem: React.FC<DragItemProps> = ({ name, id }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: "lightgray",
        border: "1px solid black",
        cursor: "grab",
      }}
    >
      {name}
    </div>
  );
};

// DropBox 컴포넌트 타입 정의
interface DropBoxProps {
  onDrop: (name: string) => void;
  droppedItems: DragItemProps[];
}

// DropBox 컴포넌트
const DropBox: React.FC<DropBoxProps> = ({ onDrop, droppedItems }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const name = e.dataTransfer.getData("text/plain");
    onDrop(name);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        width: "200px",
        height: "200px",
        border: "2px dashed black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "20px",
        backgroundColor: isDraggingOver ? "red" : "white",
        transition: "background-color 0.3s ease",
      }}
    >
      {droppedItems.map((item) => (
        <DragItem key={item.id} name={item.name} id={item.id} />
      ))}
      Drop here
    </div>
  );
};

function App() {
  const [dropItems, setDropItems] = useState<DragItemProps[]>([]);
  const dragItems = [
    { id: "1", name: "Item 1" },
    { id: "2", name: "Item 2" },
    { id: "3", name: "Item 3" },
  ];

  const handleDrop = (id: string) => {
    console.log("drop drop");
    const item = dragItems.find((item) => item.id === id);
    if (item) {
      setDropItems((prevItems) => [...prevItems, item]);
    }
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3>Drag Items</h3>
          {dragItems.map((item) => (
            <DragItem key={item.id} name={item.name} id={item.id} />
          ))}
        </div>
        <DropBox onDrop={handleDrop} droppedItems={dropItems} />
      </div>
    </div>
  );
}

export default App;
