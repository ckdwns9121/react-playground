import { FC, useState, useEffect } from "react";

export interface DropBoxItemProps {
  name: string;
  id: string;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  onDropBar: (index: string) => void;
  isDragging: boolean;
  dropItemOver: boolean;
}

const DropBoxItem: FC<DropBoxItemProps> = ({
  name,
  id,
  index,
  onDragStart,
  onDragEnter,
  onDragEnd,
  onDropBar,
  isDragging,
  dropItemOver,
}) => {
  const [topEnter, setTopEnter] = useState(false);
  const [bottomEnter, setBottomEnter] = useState(false);

  /** 드롭 박스 리스트에있는 아이템 드래그 시작 */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `drop-item${id}`);
  };

  const handleDragEnter = () => {
    onDragEnter(index);
  };
  const handleDragEnd = () => {
    onDragEnd();
  };

  const handleTopDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const name = e.dataTransfer.getData("text/plain");
    console.log(name);
    if (name.includes("drop-item")) return;
    setTopEnter(true);
  };

  const handleTopDragLeave = () => {
    setTopEnter(false);
  };

  const handleBottomDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    const name = e.dataTransfer.getData("text/plain");
    if (name.includes("drop-item")) return;
    setBottomEnter(true);
  };

  const handleBottomDragLeave = () => {
    setBottomEnter(false);
  };

  const handleDropBar = () => {
    console.log("drop bar", index);
    onDropBar(index.toString());
  };

  return (
    <>
      {index === 0 && (
        <div
          style={{
            backgroundColor: topEnter ? "transparent" : "transparent",
            height: topEnter ? "42px" : "4px",
            transition: "all 0.3s ease",
          }}
          onDragEnter={handleTopDragEnter}
          onDragLeave={handleTopDragLeave}
          onDrop={handleDropBar}
        />
      )}

      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnter={handleDragEnter}
        onDragEnd={handleDragEnd}
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
          backgroundColor: bottomEnter ? "transparent" : "transparent",
          height: bottomEnter ? "42px" : "4px",
          transition: "all 0.3s ease",
        }}
        onDragEnter={handleBottomDragEnter}
        onDragLeave={handleBottomDragLeave}
      />
    </>
  );
};

export default DropBoxItem;
