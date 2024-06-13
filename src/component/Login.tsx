import { useState } from "react";

interface LoginProps {
  onLogin: (userId: string, roomId: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [userId, setUserId] = useState("");
  const [roomId, setRoomId] = useState("");

  const loginButtonDisabled = userId.trim().length === 0;

  return (
    <div className="login">
      <span className="login-title">Login to your account</span>
      <input className="input" value={userId} placeholder="username" onChange={(e) => setUserId(e.target.value)} />
      <input className="input" placeholder="room" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <button disabled={loginButtonDisabled} className="button" onClick={() => onLogin(userId, roomId)}>
        Login
      </button>
    </div>
  );
}
