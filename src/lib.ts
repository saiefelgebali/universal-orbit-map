import fs from "fs";

export function getCommandLineArguments(n): string[] {
	const args = process.argv.slice(2);
	if (args.length < n) {
		throw "Missing command line arguments";
	}
	return args;
}

export function getOrbits(filename: string) {
	return fs
		.readFileSync(filename)
		.toString()
		.split("\n")
		.map((s) => s.trim());
}

export function getNodeParentsFromOrbits(orbits: string[]) {
	return orbits.reduce((acc, curr) => {
		const [parent, child] = curr.split(")");
		return [...acc, { parent, child }];
	}, [] as { parent: string; child: string }[]);
}
