import { getAuth } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/(private)/LogoutButton";
import styles from "./page.module.css";

export default async function PrivateLayout() {
  const session = await getAuth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>プライベートページ</h1>
        <p className={styles.description}>ログインに成功しました。このページはログイン後のみアクセスできます。</p>
        <LogoutButton />
      </div>
    </div>
  );
}