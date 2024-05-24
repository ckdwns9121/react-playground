import { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

export interface DndContextProps<T extends { id: string | number }> {
  dragItems: T[];
  setDraggedItems: Dispatch<SetStateAction<T[]>>;
  draggedItemIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}

interface DndProviderProps<T extends { id: string | number }> {
  dragItems: T[];
  setDraggedItems: Dispatch<SetStateAction<T[]>>;
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DndContext = createContext<DndContextProps<any> | undefined>(undefined);

export const DndProvider = <T extends { id: string | number }>({
  children,
  dragItems,
  setDraggedItems,
}: DndProviderProps<T>) => {
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newItems = [...dragItems];
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);

    console.log(newItems);
    setDraggedItemIndex(index);
    setDraggedItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  const value: DndContextProps<T> = {
    dragItems,
    setDraggedItems,
    draggedItemIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };

  return <DndContext.Provider value={value}>{children}</DndContext.Provider>;
};
