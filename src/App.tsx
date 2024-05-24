import "./App.css";
import { useDragAndDrop } from "./hooks/useDragAndDrop";
import Dragable from "./components/dnd/Dragable";
import Dropaable from "./components/dnd/Droppable";
import Item from "./components/item/Item";

const initItem = [
  { id: "1", name: "Item 1❤" },
  { id: "2", name: "Item 2🧡" },
  { id: "3", name: "Item 3💘" },
  { id: "4", name: "Item 4❤" },
  { id: "5", name: "Item 5🧡" },
  { id: "6", name: "Item 6💘" },
];

function App() {
  const { items, draggedItemIndex, handleDragStart, handleDragEnter, handleDragEnd } = useDragAndDrop(initItem);
  return (
    <div>
      <h2>Drag and Drop Example</h2>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h3 draggable>Drag Items</h3>
          {items.map((item, index) => (
            <Dragable
              key={item.id}
              draggableId={item.id}
              index={index}
              onItemDragStart={handleDragStart}
              onItemDragEnter={handleDragEnter}
              onItemDragEnd={handleDragEnd}
              isDragging={draggedItemIndex === index}
            >
              <Item name={item.name} />
            </Dragable>
          ))}
        </div>
        <Dropaable dragItems={items} />
      </div>
    </div>
  );
}

export default App;
