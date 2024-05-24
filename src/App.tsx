import "./App.css";
import { DndProvider } from "./components/context/DndProvider";
import Draggable from "./components/context/Draggable";
import Dropaable from "./components/context/Droppable";
import Item from "./components/item/Item";
import { useState } from "react";

interface DefaultType {
  id: string | number;
  name: string;
}

const initItems: DefaultType[] = [
  { id: "0", name: "Item 1❤" },
  { id: "1", name: "Item 2🧡" },
  { id: "2", name: "Item 3💘" },
  { id: "3", name: "Item 4❤" },
  { id: "4", name: "Item 5🧡" },
  { id: "5", name: "Item 6💘" },
];

function App() {
  const [items, setItems] = useState(initItems);
  return (
    <div className="App">
      <DndProvider dragItems={items} setDraggedItems={setItems}>
        {items.map((item, index) => (
          <Draggable key={item.id} draggableId={"drag-item"} index={index}>
            <Item name={`아이템${item.id}`} />
          </Draggable>
        ))}
        <Dropaable dragItems={items} />
      </DndProvider>
    </div>
  );
}

export default App;
