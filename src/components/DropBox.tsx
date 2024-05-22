import { useState } from "react";
import DragItem from "./DragItem";
// DropBox 컴포넌트 타입 정의

interface ViewDragItemProps {
  id: string;
  name: string;
}

interface DropBoxProps {
  onDrop: (name: string) => void;
  droppedItems: ViewDragItemProps[];
}

const DropBox = ({ onDrop, droppedItems }: DropBoxProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const name = e.dataTransfer.getData("text/plain");
    console.log(name);
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
        display: "block",
        margin: "20px",
        backgroundColor: isDragging ? "black" : "red",
        transition: "background-color 0.3s ease",
      }}
    >
      {droppedItems.map((item) => (
        <div>{item.name}</div>
      ))}
      {droppedItems.length === 0 && <>Drop here</>}
    </div>
  );
};

export default DropBox;
