import { redirect } from "next/navigation";

type Props = {
	params: {
		id: string;
		mode: "g" | "b" | "s";
	};
};

export default async function ChartSharePoint({ params }: Props) {
    redirect('/chart/' + params.id + '/' + params.mode);
}