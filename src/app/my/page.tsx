import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function MyInfo() {
	const session = await auth()
	const userId = session?.user?.sorryfieldId;
	redirect(userId ? `/user/${userId}` : '/');
}