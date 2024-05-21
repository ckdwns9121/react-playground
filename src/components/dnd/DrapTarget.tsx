import { useDrop } from "react-dnd";
import { CSSProperties, useState } from "react";

import { DragItemTypes } from "./DragItemType";
import DragItem from "./DragItem";

const style: CSSProperties = {
  height: "12rem",
  width: "12rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  color: "white",
  padding: "1rem",
  textAlign: "center",
  fontSize: "1rem",
  lineHeight: "normal",
  float: "left",
};

interface DragItemType {
  id: number;
  name: string;
}

export default function DropTarget() {
  const [items, setItems] = useState<DragItemType[]>([]);
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: DragItemTypes.BOX,
    drop: (item: DragItemType) => {
      console.log("drop drop");
      console.log(item);
      setItems((prevItems) => [...prevItems, item]);
    },
    collect: (monitor) => {
      console.log(monitor);
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  }));

  const isActive = canDrop && isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }

  return (
    <div ref={drop} style={{ ...style, backgroundColor }} data-testid="dropTarget">
      {isActive ? "Release to drop" : "Drag a box here"}

      {items.map((item: DragItemType, index: number) => (
        <DragItem key={index} name={item.name} />
      ))}
    </div>
  );
}
