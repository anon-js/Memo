import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import ProfileSettingForm from "@/components/ProfileSettingForm";

export default async function ProfileSettingPage() {
  const session = await auth();

  const user = await prisma.user.findUnique({
    where: { id: session!.user.id },
  });

  if (!user) return <div>사용자 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 h-full bg-white overflow-y-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">프로필 설정</h1>
      <ProfileSettingForm user={user} />
    </div>
  );
}