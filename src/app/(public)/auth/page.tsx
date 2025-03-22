"use client";

import { signInAction } from "@/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

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
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>ログイン</h1>
        {error && (
          <div className={styles.errorMessage}>{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={styles.formGroup}>
            <label className={styles.label}>
              メールアドレス
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              パスワード
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>
          <button
            type="submit"
            className={styles.button}
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}