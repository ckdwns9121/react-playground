import React, { useState, useEffect, useRef } from "react";

interface ChatMessage {
  id: number;
  user: string;
  message: string;
}

const removeDuplicates = (data: ChatMessage[]): ChatMessage[] => {
  const uniqueIds = new Set<number>();
  return data.filter((message) => {
    if (uniqueIds.has(message.id)) {
      return false;
    } else {
      uniqueIds.add(message.id);
      return true;
    }
  });
};

const chatDemoData: ChatMessage[] = [
  { id: 1, user: "Alice", message: "Hi there!" },
  { id: 2, user: "Bob", message: "Hello!" },
  { id: 3, user: "Alice", message: "How are you?" },
  { id: 4, user: "Bob", message: "I am good, thanks! How about you?" },
  { id: 5, user: "Alice", message: "I am great, thanks for asking!" },
  { id: 6, user: "Charlie", message: "Hey everyone!" },
  { id: 7, user: "Alice", message: "Hey Charlie!" },
  { id: 8, user: "Bob", message: "What’s up Charlie?" },
  { id: 9, user: "Charlie", message: "Just checking in, what’s new?" },
  { id: 10, user: "Alice", message: "Not much, just chatting here." },
  { id: 11, user: "David", message: "Hi folks!" },
  { id: 12, user: "Eve", message: "Good evening!" },
  { id: 13, user: "Alice", message: "Evening Eve!" },
  { id: 14, user: "Bob", message: "Hey David!" },
  { id: 15, user: "Charlie", message: "How’s everyone doing?" },
  { id: 16, user: "David", message: "Doing well, thanks!" },
  { id: 17, user: "Eve", message: "Same here." },
  { id: 18, user: "Alice", message: "Great to hear!" },
  { id: 19, user: "Bob", message: "Anyone up for a game tonight?" },
  { id: 20, user: "Charlie", message: "I’m in!" },
  { id: 21, user: "David", message: "Count me in too!" },
  { id: 22, user: "Eve", message: "I’ll join!" },
  { id: 23, user: "Alice", message: "What game are we playing?" },
  { id: 24, user: "Bob", message: "How about some trivia?" },
  { id: 25, user: "Charlie", message: "Sounds fun!" },
  { id: 26, user: "David", message: "I’m ready." },
  { id: 27, user: "Eve", message: "Let’s do it!" },
  { id: 28, user: "Alice", message: "Let’s get started!" },
  { id: 29, user: "Bob", message: 'First question: Who wrote "To Kill a Mockingbird"?' },
  { id: 30, user: "Charlie", message: "Harper Lee!" },
];

const ChatContainer: React.FC = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(chatDemoData);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const debouncingRef = useRef<number | null>(null);

  const fetchChatMessages = async (page: number) => {
    setLoading(true);
    try {
      // 데모 데이터를 사용하여 페이지 단위로 메시지 가져오기
      const data = chatDemoData.slice((page - 1) * 5, page * 5); // 페이지당 5개의 메시지
      const newMessage = [...data, ...chatMessages];

      setChatMessages(removeDuplicates(newMessage));
    } catch (error) {
      console.error("Failed to fetch chat messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    if (entry.isIntersecting && !loading) {
      if (debouncingRef.current) {
        clearTimeout(debouncingRef.current);
      }
      debouncingRef.current = window.setTimeout(() => {
        setPage((prevPage) => prevPage + 1);
      }, 300); // 300ms 디바운스 적용
    }
  };
  useEffect(() => {
    if (sentinelRef.current) {
      observer.current = new IntersectionObserver(handleIntersection, {
        root: containerRef.current,
        threshold: 0,
      });
      observer.current.observe(sentinelRef.current);
    }
    return () => {
      if (observer.current && sentinelRef.current) {
        observer.current.unobserve(sentinelRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    fetchChatMessages(page);
  }, [page]);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="chat-container" ref={containerRef} style={{ overflowY: "scroll", height: "400px" }}>
      <div ref={sentinelRef} style={{ height: "1px" }}></div>
      {chatMessages.map((message) => (
        <div key={message.id} className="chat-message">
          <strong>{message.user}: </strong>
          {message.message}
        </div>
      ))}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default ChatContainer;
