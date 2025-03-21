"use client";

import { signInAction } from "@/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface SignInResult {
  error?: string;
  url?: string;
  ok?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const result = await signInAction("credentials", {
        email,
        password,
        redirect: false,
      }) as SignInResult;

      if (!result || result.error) {
        setError(result?.error || "ログインに失敗しました");
        console.log("ログイン結果:", result);
      } else {
        router.push("/");
        router.refresh();
        console.log("ログイン成功");
        
      }
    } catch (error) {
      console.error("ログインエラー:", error);
      setError("エラーが発生しました");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">ログイン</h1>
        {error && (
          <div className="p-2 text-red-500 bg-red-50 rounded">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}