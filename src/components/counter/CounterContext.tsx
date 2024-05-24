import React, { useState, createContext, useContext } from "react";

interface CounterContextProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

interface CounterProviderProps {
  children: React.ReactNode;
}

// 1. Context 생성
const CountContext = createContext<CounterContextProps | undefined>(undefined);

// 2. Provider 컴포넌트 생성
const CountProvider = ({ children }: CounterProviderProps) => {
  const [count, setCount] = useState(0);

  return <CountContext.Provider value={{ count, setCount }}>{children}</CountContext.Provider>;
};

// 3. 커스텀 훅 생성
const useCount = () => {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }

  const { count, setCount } = context;

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  return { count, increment, decrement };
};

// 4. 컴포넌트에서 사용
const CounterComponent = () => {
  const { count, increment, decrement } = useCount();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
    </div>
  );
};

const App = () => (
  <CountProvider>
    <CounterComponent />
  </CountProvider>
);

export default App;
