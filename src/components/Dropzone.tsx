import { useState } from "react";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import DropZoneItem from "./DropzoneItem";
import { INIT_ITEMS } from "../App";

interface DropBoxProps {
  dragItems: { name: string; id: string }[];
}

const DropZone = ({ dragItems }: DropBoxProps) => {
  const {
    items: dropItems,
    setItems: setDropItems,
    draggedItemIndex: dropItemDragIndex,
    handleDragStart: handleDropItemDragStart,
    handleDragEnter: handleSwapDropItem,
    handleDragEnd: handleDragIndexInit,
    handleSwap,
  } = useDragAndDrop<{ name: string; id: string }>([]);

  const [dropzoneOver, setDropzoneOver] = useState(false);

  const onAddDropItem = (id: string) => {
    const index = id.replace("drag-item", "");
    const dragItem = dragItems.find((item) => item.id === index);

    if (dragItem && !dropItems.find((item) => item.id === dragItem.id)) {
      setDropItems([...dropItems, dragItem]);
    }
  };

  const onSwap = (id: string, swapIndex: number) => {
    if (!id.includes("drag-item")) return;
    console.log(`${id}를 ${swapIndex}에 넣을거임`);

    const index = id.replace("drag-item", "");
    const dragItem = dragItems.find((item) => item.id === index);
    if (dragItem) {
      const findDragItem = dropItems.find((item) => item.id === dragItem.id);

      // 이미 드래그아이템이 드랍 아이템에 존재한다면
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
    >
      {dropItems.map((item, index) => (
        <DropZoneItem
          key={item.id}
          name={item.name}
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
      {dropItems.length === 0 && <>Drop here</>}
    </div>
  );
};

export default DropZone;
