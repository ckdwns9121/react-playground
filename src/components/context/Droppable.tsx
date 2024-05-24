import { HTMLAttributes, useState } from "react";
import { useDnd } from "./useDnd";
import DropItem from "./DropItem.tsx";

interface DropzoneProps<T extends { draggedId: string }> extends HTMLAttributes<HTMLDivElement> {
  dragItems: T[];
}

const Dropzone = <T extends { draggedId: string }>({ dragItems, ...props }: DropzoneProps<T>) => {
  const {
    dragItems: dropItems,
    setDraggedItems: setDropItems,
    draggedItemIndex: dropItemDragIndex,
    handleDragStart: handleDropItemDragStart,
    handleDragEnter: handleSwapDropItem,
    handleDragEnd: handleDragIndexInit,
  } = useDnd();

  const [dropzoneOver, setDropzoneOver] = useState(false);

  const onAddDropItem = (id: string) => {
    const index = id.replace("drag-item", "");
    const dragItem = dragItems.find((item) => item.draggedId === index);

    if (dragItem && !dropItems.find((item) => item.draggedId === dragItem.draggedId)) {
      setDropItems([...dropItems, dragItem]);
    }
  };

  const onSwap = (id: string, swapIndex: number) => {
    if (!id.includes("drag-item")) return;

    const index = id.replace("drag-item", "");
    const dragItem = dragItems.find((item) => item.draggedId === index);
    if (dragItem) {
      const findDragItem = dropItems.find((item) => item.draggedId === dragItem.draggedId);

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
          key={item.draggedId}
          draggedId={item.draggedId}
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

export default Dropzone;
