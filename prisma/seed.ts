import { PrismaClient } from ".prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // テストアカウントを作成
  const hashedPassword = await bcrypt.hash("password123", 10);
  
  await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      email: "test@example.com",
      name: "テストユーザー",
      password: hashedPassword,
    },
  });
  
  console.log("テストユーザーの作成が完了しました");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });