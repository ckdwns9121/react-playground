import { FC } from "react";

export interface DragItemProps {
  name: string;
  id: string;
  index: number;
  onDragStart: (index: number) => void;
  onDragEnter: (index: number) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

const DragItem: FC<DragItemProps> = ({ name, id, index, onDragStart, onDragEnter, onDragEnd, isDragging }) => {
  /** 드래그 시작 시 인덱스 넘겨줌 */
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    onDragStart(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `drag-item${id}`);
  };

  /** DragItem 컴포넌트에 현재 드래그중인 컴포넌트가 들어오면 기존 컴포넌트의 순서를 알려줌*/
  const handleDragEnter = () => {
    onDragEnter(index);
  };

  /** 드래그가 끝나면 드래그 index 초기화*/
  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <>
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
          backgroundColor: isDragging ? "transparent" : "red",
          border: isDragging ? "2px dashed blue" : "1px solid red",
          transform: isDragging ? "scale(1.1)" : "scale(1)",
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {isDragging ? name : name}
      </div>
    </>
  );
};

export default DragItem;
