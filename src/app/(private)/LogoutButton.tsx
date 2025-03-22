"use client";

import { signOutAction } from "@/lib/auth/auth";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOutAction();
    router.push("/auth");
  };

  return (
    <button onClick={handleLogout} className={styles.logoutButton}>ログアウト</button>
  );
} 