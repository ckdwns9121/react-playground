import { useDragAndDrop } from "./hooks/useDragAndDrop";
import DragItem from "./components/DragItem";
import DropZone from "./components/Dropzone";

import "./App.css";

export const INIT_ITEMS = [
  { id: "1", name: "Item 1❤" },
  { id: "2", name: "Item 2🧡" },
  { id: "3", name: "Item 3💘" },
  { id: "4", name: "Item 4❤" },
  { id: "5", name: "Item 5🧡" },
  { id: "6", name: "Item 6💘" },
];

function App() {
  const {
    items: dragItems,
    draggedItemIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  } = useDragAndDrop(INIT_ITEMS);

  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 draggable>Drag Items</h3>
          {dragItems.map((item, index) => (
            <DragItem
              key={item.id}
              name={item.name}
              id={item.id}
              index={index}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onDragEnd={handleDragEnd}
              isDragging={draggedItemIndex === index}
            />
          ))}
        </div>
        <DropZone dragItems={dragItems} />
      </div>
    </div>
  );
}

export default App;
