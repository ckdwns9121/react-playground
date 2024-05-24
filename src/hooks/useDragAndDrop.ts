import { useState } from "react";

interface DragItemProps {
  id: string;
}

interface DragAndDropHook<T> {
  items: T[];
  setItems: (items: T[]) => void;
  draggedItemIndex: number | null;
  handleDragStart: (index: number) => void;
  handleDragEnter: (index: number) => void;
  handleDragEnd: () => void;
}

export function useDragAndDrop<T extends DragItemProps>(initialItems: T[]): DragAndDropHook<T> {
  /** Drag할 리스트 */
  const [items, setItems] = useState<T[]>(initialItems);

  /** Drag할 컴포넌트 인덱스 */
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };

  const handleDragEnter = (index: number) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedItemIndex, 1);
    newItems.splice(index, 0, draggedItem);
    setDraggedItemIndex(index);
    setItems(newItems);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return {
    items,
    setItems,
    draggedItemIndex,
    handleDragStart,
    handleDragEnter,
    handleDragEnd,
  };
}
