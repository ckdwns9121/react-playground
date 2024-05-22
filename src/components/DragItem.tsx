import { FC } from "react";

interface DragItemProps {
  name: string;
  id: string;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
}

const DragItem: FC<DragItemProps> = ({ name, id, index, onDragStart, onDragEnter, onDragEnd }) => {
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
        backgroundColor: "lightgray",
        border: "1px solid black",
        cursor: "grab",
      }}
    >
      {name}
    </div>
  );
};

export default DragItem;
