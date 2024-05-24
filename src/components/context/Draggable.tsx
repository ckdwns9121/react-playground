import { HTMLAttributes, CSSProperties } from "react";
import { useDnd } from "./useDnd";

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  draggableId: string | number;
  index: number;
  isDragging?: boolean;
  style?: CSSProperties;
}

const Draggable = ({ children, draggableId, index, isDragging = false, style, ...props }: DraggableProps) => {
  const { handleDragStart: onDragStart, handleDragEnd: onDragEnd, handleDragEnter: onDragEnter } = useDnd();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `drag-item${draggableId}`);
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
        ...style,

        // cursor: "grab",
        // backgroundColor: isDragging ? "transparent" : "transparent",
        border: isDragging ? "2px solid blue" : "1px solid transparent",
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: "background-color 0.3s ease, transform 0.3s ease",
        opacity: isDragging ? 0.3 : 1,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default Draggable;