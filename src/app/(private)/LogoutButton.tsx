"use client";

import { signOutAction } from "@/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOutAction();
    router.push("/auth");
  };

  return (
    <button onClick={handleLogout}>ログアウト</button>
  );
} 