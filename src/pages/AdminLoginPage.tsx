import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/messages");
    } catch {
      setError("로그인 실패");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg space-y-6">
        <h1 className="font-title text-2xl text-center">Admin Login</h1>

        <input
          placeholder="Email"
          className="w-full px-4 py-3 rounded-xl bg-gray-100"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-xl bg-gray-100"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-[#B6E388] font-bold"
        >
          로그인
        </button>
      </div>
    </main>
  );
};

export default AdminLoginPage;