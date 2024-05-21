import { CSSProperties } from "react";
import { useDrag } from "react-dnd";

import { DragItemTypes } from "./DragItemType";

const style: CSSProperties = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  marginRight: "1.5rem",
  marginBottom: "1.5rem",
  cursor: "move",
  float: "left",
  color: "red",
};

export interface DragItemProps {
  name: string;
}

interface DropResult {
  test: string;
}

export default function DragItem({ name }: DragItemProps) {
  const [{ isDragging }, dragRef, previewRef] = useDrag(() => ({
    type: DragItemTypes.BOX,
    item: { name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      console.log("---result---");
      console.log(dropResult);
      console.log("---result---");
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.test}!`);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <>
      <div ref={previewRef} style={{ opacity: isDragging ? "0.3" : "1", backgroundColor: "red" }} />
      <div ref={dragRef} style={{ ...style, opacity }} data-testid={`box`}>
        {name}
      </div>
    </>
  );
}
