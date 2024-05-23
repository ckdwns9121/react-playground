import { FC, useState } from "react";

export interface DropBoxItemProps {
  name: string;
  id: string;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onSwap: (id: string, swapIndex: number) => void;
  isDragging: boolean;
  dropItemOver: boolean;
}

const DropZoneItem: FC<DropBoxItemProps> = ({
  name,
  id,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onSwap,
  isDragging,
}) => {
  const [topDropAreaEnter, setTopDropAreaEnter] = useState(false);
  const [btomDropAreaEnter, setBtomDropAreaEnter] = useState(false);

  /** 드롭 박스 리스트에있는 아이템 드래그 시작 */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `drop-item${id}`);
  };

  /** 드랍 아이템 내부에 또다른 드랍 아이템이 들어왔을 때 */
  const handleDragEnter = () => {
    onDragEnter(index);
  };

  /** 드랍 아이템 드래그 끝났을 때 */
  const handleDropItemDragEnd = () => {
    onDragEnd();
  };

  /** 상단 공간에 드래그 아이템이 들어왔을 때 */
  const handleTopAreaEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const name = e.dataTransfer.getData("text/plain");
    if (name.includes("drop-item")) return;
    setTopDropAreaEnter(true);
  };

  /** 상단 공간에 드래그 아이템이 나갔을 때 */
  const handleTopAreaLeave = () => {
    setTopDropAreaEnter(false);
  };

  /** 하단 공간에 드래그 아이템이 들어왔을 때 */
  const handleBottomAreaEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const name = e.dataTransfer.getData("text/plain");
    if (name.includes("drop-item")) return;
    setBtomDropAreaEnter(true);
  };

  /** 하단 공간에 드래그 아이템이 나갔을 때 */
  const handleBottomAreaLeave = () => {
    setBtomDropAreaEnter(false);
  };

  /** 상 하단 공간에 드랍이 발생했을 때 */
  const handleDropArea = (e: React.DragEvent<HTMLDivElement>, swapIndex: number) => {
    console.log(e);
    e.stopPropagation();
    console.log("상하단 공간 드랍 발생");

    const name = e.dataTransfer.getData("text/plain");
    console.log(name);

    onSwap(name, swapIndex);
    setTopDropAreaEnter(false);
    setBtomDropAreaEnter(false);
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
        {name}
      </div>
      <div
        style={{
          backgroundColor: btomDropAreaEnter ? "transparent" : "transparent",
          height: btomDropAreaEnter ? "42px" : "4px",
          transition: "all 0.3s ease",
        }}
        onDrop={(e) => handleDropArea(e, index + 1)}
        onDragEnter={handleBottomAreaEnter}
        onDragLeave={handleBottomAreaLeave}
      />
    </>
  );
};

export default DropZoneItem;
