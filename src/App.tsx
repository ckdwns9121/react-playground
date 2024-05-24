import "./App.css";
import { DndProvider } from "./components/context/DndProvider";
import Draggable from "./components/context/Draggable";
// import Dropaable from "./components/dnd/Droppable";
import Item from "./components/item/Item";

const initItems = [
  { draggedId: "1", name: "Item 1❤" },
  { draggedId: "2", name: "Item 2🧡" },
  { draggedId: "3", name: "Item 3💘" },
  { draggedId: "4", name: "Item 4❤" },
  { draggedId: "5", name: "Item 5🧡" },
  { draggedId: "6", name: "Item 6💘" },
];

function App() {
  return (
    <DndProvider initItems={initItems}>
      {initItems.map((item, index) => (
        <Draggable key={item.draggedId} draggableId={item.draggedId} index={index}>
          <Item name={item.name} />
        </Draggable>
      ))}
    </DndProvider>
  );
}

export default App;
