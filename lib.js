import fs from "fs";

export function getOrbits(filename) {
	const file = fs.readFileSync(filename);

	return file
		.toString()
		.split("\n")
		.map((s) => s.trim());
}

/**
 *
 * @param {string[]} orbits
 * @returns {{parent: string, child: string}[]}
 */
export function getNodeParentsFromOrbits(orbits) {
	return orbits.reduce((acc, curr) => {
		const [parent, child] = curr.split(")");
		return [...acc, { parent, child }];
	}, []);
}
