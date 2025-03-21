import { getAuth } from "@/auth";
import { redirect } from "next/navigation";
import LogoutButton from "@/app/(private)/LogoutButton";

export default async function PrivateLayout() {
  const session = await getAuth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <div>
      test
      <LogoutButton />
    </div>
  );
}