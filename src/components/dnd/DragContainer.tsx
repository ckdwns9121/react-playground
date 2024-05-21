import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropTarget from "./DrapTarget";
import DragItem from "./DragItem";

export default function DragContainer() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <DropTarget />
        </div>
        <div style={{ overflow: "hidden", clear: "both" }}>
          <DragItem name="Glass" />
          <DragItem name="Banana" />
          <DragItem name="Paper" />
        </div>
      </div>
    </DndProvider>
  );
}
