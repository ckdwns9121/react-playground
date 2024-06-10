import { useState } from "react";

import { Chat } from "./component/Chat";
import { Login } from "./component/Login";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const [room, setRoom] = useState("");

  const handleLogin = (userId, roomId) => {
    setCurrentUser(userId);
    setRoom(roomId);
  };

  return (
    <div className="app">
      {currentUser ? (
        <Chat currentUser={currentUser} room={room} onLogout={() => setCurrentUser(null)} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
