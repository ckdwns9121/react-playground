import { useState, createContext, ReactNode, Dispatch, SetStateAction } from "react";

export interface DndContextProps<T extends { draggedId: string | number }> {
  dragItems: T[];
  setDraggedItems: Dispatch<SetStateAction<T[]>>;
  draggedItemIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}

interface DndProviderProps<T extends { draggedId: string | number }> {
  initItems: T[];
  children: ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DndContext = createContext<DndContextProps<any> | undefined>(undefined);

export const DndProvider = <T extends { draggedId: string | number }>({ children, initItems }: DndProviderProps<T>) => {
  const [dragItems, setDraggedItems] = useState<T[]>(initItems);

  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index: number) => {
    console.log("여기 들어온다잉");
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
