import { HTMLAttributes, CSSProperties } from "react";

export interface DraggableProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  draggableId: string;
  index: number;
  onItemDragStart: (index: number) => void;
  onItemDragEnter: (index: number) => void;
  onItemDragEnd: () => void;
  isDragging?: boolean;
  style?: CSSProperties;
}

const Draggable = ({
  children,
  draggableId,
  index,
  onItemDragStart,
  onItemDragEnter,
  onItemDragEnd,
  isDragging = false,
  style,
  ...props
}: DraggableProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onItemDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `drag-item${draggableId}`);
  };

  const handleDragEnter = () => {
    onItemDragEnter(index);
  };

  const handleDragEnd = () => {
    onItemDragEnd();
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
