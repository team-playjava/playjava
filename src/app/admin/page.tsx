"use client"
import { useState } from 'react';

type Mode = "串" | "本" | "雙";

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';

export default function AdminPage() {
	const [mode2, setMode2] = useState<Mode | null>(null);
	const [levelType, setLevelType] = useState<"official" | "unofficial" | null>(null);

	const changeChartApplyMode = (
	  event: React.MouseEvent<HTMLElement>,
	  newAlignment: Mode,
	) => {
		setMode2(newAlignment);
	};
	const changeChartApplyType = (
	  event: React.MouseEvent<HTMLElement>,
	  newAlignment: "official" | "unofficial",
	) => {
		setLevelType(newAlignment);
	};
	return (
		<>
		<h1>관리자</h1>
		<div className="border p-3 rounded-lg my-2">
			<h2>채보 등록</h2>
			<div className="flex flex-col gap-3 mt-2 items-start">
				<p>채보 번호: <input type="text" className="text-black" /></p>
				<div className='flex flex-row gap-4'>
					난이도: 
					<ToggleButtonGroup
						color="primary"
						value={mode2}
						exclusive
						onChange={changeChartApplyMode}
						aria-label="mode"
					>
						<ToggleButton value="串" className='px-3 py-1 bg-blue-400'>串</ToggleButton>
						<ToggleButton value="本" className='px-3 py-1 bg-green-500'>本</ToggleButton>
						<ToggleButton value="雙" className='px-3 py-1 bg-purple-500'>雙</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<p>책정 난도: <input type="number" className="text-black" min={-2} max={40} /></p>
				<div className='flex flex-row gap-4'>
					제공자: 
					<ToggleButtonGroup
						color="standard"
						value={levelType}
						exclusive
						onChange={changeChartApplyType}
						aria-label="mode"
					>
						<ToggleButton value="official"   className='px-3 py-1 bg-white'>공식</ToggleButton>
						<ToggleButton value="unofficial" className='px-3 py-1 bg-white'>비공식</ToggleButton>
					</ToggleButtonGroup>
				</div>
				<button className="p-2 px-5 pl-4 bg-blue-500 rounded-lg flex items-center gap-2"><EditIcon /> 등록</button>
			</div>
		</div>
		<div className="border p-3 rounded-lg my-2">
			<h2>스프레드시트 데이터 → playJava! 변환</h2>
			<div className="flex flex-col gap-3 mt-2 items-start">
				<textarea name="story" rows={10} cols={90} className="rounded-lg text-black" autoFocus />
				<button className="p-2 px-5 pl-4 bg-blue-500 rounded-lg flex items-center gap-2"><EditIcon /> 등록</button>
			</div>
		</div>
		</>
	);
}