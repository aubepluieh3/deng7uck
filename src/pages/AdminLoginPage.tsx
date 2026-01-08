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
    if (!email || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const emailId = email.split('@')[0]; 
      const fullEmail = `${emailId}@deng.com`;
      
      await signInWithEmailAndPassword(auth, fullEmail, password);
      navigate("/messages");
    } catch (err) {
      setError("로그인에 실패했습니다. 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F9FAFB] px-6">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-lg space-y-6">
        <h1 className="font-title text-2xl text-center">Admin Login</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="ID"
            value={email}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-[#B6E388]"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-[#B6E388]"
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full py-3 rounded-xl bg-[#B6E388] font-bold hover:opacity-90 transition-opacity"
        >
          로그인
        </button>
      </div>
    </main>
  );
};
export default AdminLoginPage;