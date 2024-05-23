import { useState } from "react";
import DropZoneItem from "./DropZonetem";
// DropBox 컴포넌트 타입 정의

interface DropBoxProps {
  dragItems: { name: string; id: string }[];
}

const DropZone = ({ dragItems }: DropBoxProps) => {
  // dropBox에 Item이 over되었을 때 백그라운드 색상 바꿔주기 위한 상태
  const [dropzoneOver, setDropzoneOver] = useState(false);

  // 드랍 아이템의 드래그중인 인덱스
  const [dropItemDragIndex, setDropItemDragIndex] = useState<number | null>(null);

  // 드랍된 아이템 리스트
  const [dropItems, setDropItems] = useState<{ name: string; id: string }[]>([]);

  /** 드랍 끝났을 때  드랍된 아이템에 추가*/
  const onAddDropItem = (id: string) => {
    console.log("Dropzone drop end");
    const index = id.replace("drag-item", "");
    const dragItem = dragItems.find((item) => item.id === index);

    if (dragItem) {
      const findDragItem = dropItems.find((item) => item.id === dragItem.id);

      // 이미 드래그아이템이 드랍 아이템에 존재한다면
      if (findDragItem) return;
      setDropItems((prevItems) => [...prevItems, dragItem]);
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
      setDropItemDragIndex(null);
      setDropItems(newDropItems);
    }
  };

  /** 드롭 박스에 드래그 아이템이 들어왔을 때 Background 색상을 변경해주기 위한 함수 */
  const handleDropzoneOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropzoneOver(true);
  };

  /** 드롭 박스에 드래그 아이템이 나갔을 때 Background 색상을 원래대로 돌리기 위한 함수 */
  const handleDropzoneLeave = () => {
    setDropzoneOver(false);
  };

  /** 드롭 박스에 드래그 아이템이 떨어졌을 때 */
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDropzoneOver(false);
    const name = e.dataTransfer.getData("text/plain");
    console.log(name);

    if (name.includes("drag-item")) onAddDropItem(name);
  };

  /** 드랍 아이템을 드래그 시작 시 인덱스 설정 */
  const handleDropItemDragStart = (index: number) => {
    console.log("드래그 시작 시 index 설정");
    setDropItemDragIndex(index);
  };

  /** 드랍 아이템의 DragIndex 초기화 */
  const handleDragIndexInit = () => {
    console.log("드래그 끝났으니초기화");
    setDropItemDragIndex(null);
  };

  /** 드랍 아이템의 순서 바꾸기 */
  const handleSwapDropItem = (dropItemIndex: number) => {
    console.log("순서 바꾸기");
    if (dropItemDragIndex === null || dropItemDragIndex === dropItemIndex) return;

    const newDropItems = [...dropItems];
    const [draggedItem] = newDropItems.splice(dropItemDragIndex, 1);
    newDropItems.splice(dropItemIndex, 0, draggedItem);
    setDropItemDragIndex(dropItemIndex);
    setDropItems(newDropItems);
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
          name={`${item.name}`}
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
