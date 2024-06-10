import { useState } from "react";

export function Login({ onLogin }: any) {
  const [inputValue, setInputValue] = useState("");
  const [room, setRoom] = useState("");

  const loginButtonDisabled = inputValue.trim().length === 0;

  return (
    <div className="login">
      <span className="login-title">Login to your account</span>
      <input
        className="input"
        value={inputValue}
        placeholder="username"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input className="input" placeholder="room" value={room} onChange={(e) => setRoom(e.target.value)} />
      <button disabled={loginButtonDisabled} className="button" onClick={() => onLogin(inputValue, room)}>
        Login
      </button>
    </div>
  );
}
