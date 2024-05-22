import { useState } from "react";
import DragItem from "./components/DragItem";
import DropBox from "./components/DropBox";
import "./App.css";

function App() {
  const [dragItems, setDragItems] = useState<{ name: string; id: string }[]>([
    { id: "1", name: "Item 1❤" },
    { id: "2", name: "Item 2🧡" },
    { id: "3", name: "Item 3💘" },
  ]);
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  /** 드래그 시작 시 인덱스 설정 */
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  /** 드래그 아이템 위에 컴포넌트가 들어왔을 시 인덱스 변경*/
  const handleDragEnter = (index: number) => {
    // console.log("on DragEnter");
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newDragItems = [...dragItems];
    const [draggedItem] = newDragItems.splice(draggedItemIndex, 1);
    newDragItems.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setDragItems(newDragItems);
  };

  /** 드래그 끝났을 때 초기화 */
  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 draggable>Drag Items</h3>
          {dragItems.map((item, index) => (
            <DragItem
              key={item.id}
              name={`${item.name}`}
              id={item.id}
              index={index}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              isDragging={draggedItemIndex === index}
            />
          ))}
        </div>
        <DropBox dragItems={dragItems} />
      </div>
    </div>
  );
}

export default App;
