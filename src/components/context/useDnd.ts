import { useContext } from "react";
import { DndContext, DndContextProps } from "./DndProvider";

export const useDnd = <T extends { draggedId: string | number }>(): DndContextProps<T> => {
  const context = useContext(DndContext);
  if (!context) {
    throw new Error("useDnd must be used within a DndProvider");
  }
  return context;
};
