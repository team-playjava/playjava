import { getUserById, getUserByName } from "@/app/utils/data/user";
import UserLevel from "@/components/user-level/user-level";
import { SorryfieldUser } from "@prisma/client";
import { Metadata } from "next";
import Image from "next/image"

declare module "next-auth" {
  interface User {
	sorryfieldId?: string;
  }
}

interface Props {
  params: {
	id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const user : SorryfieldUser | null = decodeURIComponent(params.id).startsWith("@") ? await getUserByName(params.id.slice(1)) : await getUserById(params.id);
	if (!user) return { title: 'playJava!' };
	return {
		title: `@${user.name} - playJava!`
	};
}

export default async function UserInfo({ params }: Props) {
	const user : SorryfieldUser | null = decodeURIComponent(params.id).startsWith("@") ? await getUserByName(decodeURIComponent(params.id).slice(1)) : await getUserById(params.id);
	return (<>
		<div className="flex flex-row items-center gap-3">
			<Image
				src={`https://sorry.daldal.so/media/images/icons/${user?.icon}`}
				alt={`${user?.name}님의 프로필 사진`} width={64} height={64}
				className="rounded-full border-black border shadow-xl bg-black"
			/>
			<UserLevel userLevel={user?.level ?? 0} />
			<h1>{user?.name}</h1>
		</div>
	</>)
}

