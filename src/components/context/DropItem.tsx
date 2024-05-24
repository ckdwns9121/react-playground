import { FC, useState } from "react";

export interface DropItemProps {
  draggedId: string | number;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onSwap: (id: string, swapIndex: number) => void;
  isDragging: boolean;
  dropItemOver: boolean;
}

const DropItem: FC<DropItemProps> = ({ draggedId, index, onDragStart, onDragEnter, onDragEnd, onSwap, isDragging }) => {
  const [topDropAreaEnter, setTopDropAreaEnter] = useState(false);
  const [bottomDropAreaEnter, setBottomDropAreaEnter] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `drop-item${draggedId}`);
  };

  const handleDragEnter = () => {
    onDragEnter(index);
  };

  const handleDropItemDragEnd = () => {
    onDragEnd();
  };

  const handleTopAreaEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const name = e.dataTransfer.getData("text/plain");
    if (name.includes("drop-item")) return;
    setTopDropAreaEnter(true);
  };

  const handleTopAreaLeave = () => {
    setTopDropAreaEnter(false);
  };

  const handleBottomAreaEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const name = e.dataTransfer.getData("text/plain");
    if (name.includes("drop-item")) return;
    setBottomDropAreaEnter(true);
  };

  const handleBottomAreaLeave = () => {
    setBottomDropAreaEnter(false);
  };

  /** 상 하단 공간에 드랍이 발생했을 때 */
  const handleDropArea = (e: React.DragEvent<HTMLDivElement>, swapIndex: number) => {
    e.stopPropagation();
    console.log("상하단 공간 드랍 발생");
    const name = e.dataTransfer.getData("text/plain");
    onSwap(name, swapIndex);
    setTopDropAreaEnter(false);
    setBottomDropAreaEnter(false);
  };

  return (
    <>
      {index === 0 && (
        <div
          style={{
            backgroundColor: topDropAreaEnter ? "transparent" : "transparent",
            height: topDropAreaEnter ? "42px" : "4px",
            transition: "all 0.3s ease",
          }}
          onDragEnter={handleTopAreaEnter}
          onDragLeave={handleTopAreaLeave}
          onDrop={(e) => handleDropArea(e, 0)}
        />
      )}

      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragEnd={handleDropItemDragEnd}
        style={{
          padding: "8px",
          margin: "4px",
          cursor: "grab",
          transition: "background-color 0.3s ease, transform 0.3s ease",
          backgroundColor: isDragging ? "transparent" : "blue",
          border: isDragging ? "2px dashed blue" : "1px solid red",
          transform: isDragging ? "scale(1.05)" : "scale(1)",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        아이템 {draggedId}
      </div>
      <div
        style={{
          backgroundColor: bottomDropAreaEnter ? "transparent" : "transparent",
          height: bottomDropAreaEnter ? "42px" : "4px",
          transition: "all 0.3s ease",
        }}
        onDrop={(e) => handleDropArea(e, index + 1)}
        onDragEnter={handleBottomAreaEnter}
        onDragLeave={handleBottomAreaLeave}
      />
    </>
  );
};

export default DropItem;
