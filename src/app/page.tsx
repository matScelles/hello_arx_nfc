"use client";

import Image from "next/image";
import { useState } from "react";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";

export default function Home() {
	const [statusText, setStatusText] = useState("Click on the button");

	async function btnClick() {
		let command = {
			name: "sign",
			keyNo: 1,
			message: "010203",
		};

		let res;

		try {
			// --- request NFC command execution ---
			res = await execHaloCmdWeb(command);
			// the command has succeeded, display the result to the user
			setStatusText(JSON.stringify(res, null, 4));
		} catch (e) {
			// the command has failed, display error to the user
			setStatusText("Error: " + String(e));
		}
	}

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div>Doc to understand arx halo package: <a href="https://github.com/arx-research/libhalo/blob/master/docs/halo-command-set.md">Github</a></div>
				<pre style={{ fontSize: 12, textAlign: "left" }}>
					{statusText}
				</pre>
				<button onClick={() => btnClick()}>
					Sign message 010203 using key #1
				</button>
			</div>
		</main>
	);
}
