import { HTMLAttributes, useState } from "react";
import { useDragAndDrop } from "../../hooks/useDragAndDrop.ts";
import DropItem from "./DropItem.tsx";

interface DroppableProps<T extends { id: string }> extends HTMLAttributes<HTMLDivElement> {
  dragItems: T[];
}

const Dropaable = <T extends { id: string }>({ dragItems, ...props }: DroppableProps<T>) => {
  const {
    items: dropItems,
    setItems: setDropItems,
    draggedItemIndex: dropItemDragIndex,
    handleDragStart: handleDropItemDragStart,
    handleDragEnter: handleSwapDropItem,
    handleDragEnd: handleDragIndexInit,
  } = useDragAndDrop<T>([]);

  const [dropzoneOver, setDropzoneOver] = useState(false);

  const onAddDropItem = (id: string) => {
    console.log(id);
    const index = id.replace("drag-item", "");
    console.log(index);
    const dragItem = dragItems.find((item) => item.id === index);

    if (dragItem && !dropItems.find((item) => item.id === dragItem.id)) {
      setDropItems([...dropItems, dragItem]);
    }
  };

  const onSwap = (id: string, swapIndex: number) => {
    if (!id.includes("drag-item")) return;

    const index = id.replace("drag-item", "");
    const dragItem = dragItems.find((item) => item.id === index);
    if (dragItem) {
      const findDragItem = dropItems.find((item) => item.id === dragItem.id);

      if (findDragItem) return;

      const newDropItems = [...dropItems];
      newDropItems.splice(swapIndex, 0, dragItem);
      setDropItems(newDropItems);
    }
  };

  const handleDropzoneOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropzoneOver(true);
  };

  const handleDropzoneLeave = () => {
    setDropzoneOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropzoneOver(false);
    const name = e.dataTransfer.getData("text/plain");

    if (name.includes("drag-item")) onAddDropItem(name);
  };

  return (
    <div
      onDragOver={handleDropzoneOver}
      onDragLeave={handleDropzoneLeave}
      onDrop={handleDrop}
      style={{
        width: "200px",
        height: "600px",
        display: "block",
        margin: "20px",
        backgroundColor: dropzoneOver ? "black" : "red",
        transition: "background-color 0.3s ease",
      }}
      {...props}
    >
      {dropItems.map((item, index) => (
        <DropItem
          key={item.id}
          id={item.id}
          index={index}
          onDragStart={handleDropItemDragStart}
          onDragEnd={handleDragIndexInit}
          onDragEnter={handleSwapDropItem}
          onSwap={onSwap}
          isDragging={dropItemDragIndex === index}
          dropItemOver={dropzoneOver}
        />
      ))}
    </div>
  );
};

export default Dropaable;
