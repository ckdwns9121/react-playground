import { useState } from "react";
import DropBoxItem from "./DropBoxItem";
// DropBox 컴포넌트 타입 정의

interface DropBoxProps {
  dragItems: { name: string; id: string }[];
}

const DropBox = ({ dragItems }: DropBoxProps) => {
  // dropBox에 Item이 over되었을 때 백그라운드 색상 바꿔주기 위한 상태
  const [dropItemOver, setDropItemOver] = useState(false);

  // 드랍 아이템의 드래그중인 인덱스
  const [dropItemDragIndex, setDropItemDragIndex] = useState<number | null>(null);

  const [dropItems, setDropItems] = useState<{ name: string; id: string }[]>([]);

  /** 드랍 끝났을 때  드랍된 아이템에 추가*/
  const handleDropInBox = (id: string) => {
    // console.log("handle Drop이 왜 호출?");
    // console.log(id);
    const index = id.replace("drag-item", "");
    // console.log(index);
    const dragItem = dragItems.find((item) => item.id === index);
    // console.log(dragItem);

    if (dragItem) {
      const dropItem = dropItems.find((item) => item.id === dragItem.id);

      if (dropItem) return;
      setDropItems((prevItems) => [...prevItems, dragItem]);
    }
  };

  /** drop box bar에 Drop 했을 때 */
  const handleDropBar = (id: string) => {
    const index = id.replace("drop-item", "");
    console.log(index);
    const dragItem = dragItems.find((item) => item.id === index);
    // console.log(dragItem);

    if (dragItem) {
      const dropItem = dropItems.find((item) => item.id === dragItem.id);

      if (dropItem) return;
      setDropItems((prevItems) => [...prevItems, dragItem]);
    }
  };

  /** 드롭 박스에 드래그 아이템이 들어왔을 때 */
  const handleDragItemOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropItemOver(true);
  };

  /** 드롭 박스에 드래그 아이템이 나갔을 때 */
  const handleDragItemLeave = () => {
    setDropItemOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropItemOver(false);
    const name = e.dataTransfer.getData("text/plain");

    if (name.includes("drag-item")) handleDropInBox(name);
  };

  /** 드래그 시작 시 인덱스 설정 */
  const handleDragStartToDropItem = (index: number) => {
    setDropItemDragIndex(index);
  };

  const handleDragEndToDropItem = () => {
    setDropItemDragIndex(null);
  };

  const handleDragEnterToDropItem = (dropItemIndex: number) => {
    // console.log("on DragEnter Drop Item");

    // console.log(dropItemIndex);
    if (dropItemDragIndex === null || dropItemDragIndex === dropItemIndex) return;

    const newDropItems = [...dropItems];
    const [draggedItem] = newDropItems.splice(dropItemDragIndex, 1);
    newDropItems.splice(dropItemIndex, 0, draggedItem);
    setDropItemDragIndex(dropItemIndex);
    setDropItems(newDropItems);
  };

  return (
    <div
      onDragOver={handleDragItemOver}
      onDragLeave={handleDragItemLeave}
      onDrop={handleDrop}
      style={{
        width: "200px",
        height: "200px",
        display: "block",
        margin: "20px",
        backgroundColor: dropItemOver ? "black" : "red",
        transition: "background-color 0.3s ease",
      }}
    >
      {dropItems.map((item, index) => (
        <DropBoxItem
          key={item.id}
          name={`${item.name}`}
          id={item.id}
          index={index}
          onDragStart={handleDragStartToDropItem}
          onDragEnd={handleDragEndToDropItem}
          onDragEnter={handleDragEnterToDropItem}
          onDropBar={handleDropBar}
          isDragging={dropItemDragIndex === index}
        />
      ))}
      {dropItems.length === 0 && <>Drop here</>}
    </div>
  );
};

export default DropBox;
