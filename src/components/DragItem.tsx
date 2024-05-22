import { FC } from "react";

export interface DragItemProps {
  name: string;
  id: string;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const DragItem: FC<DragItemProps> = ({ name, id, index, onDragStart, onDragEnter, onDragEnd, isDragging }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragEnter = () => {
    onDragEnter(index);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnter={handleDragEnter}
      onDragEnd={handleDragEnd}
      style={{
        padding: "8px",
        margin: "4px",
        backgroundColor: isDragging ? "transparent" : "red",
        border: isDragging ? "2px dashed blue" : "1px solid red",
        cursor: "grab",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "scale(1.1)" : "scale(1)",
      }}
    >
      {isDragging ? name : name}
    </div>
  );
};

export default DragItem;
