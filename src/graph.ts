export interface Graph {
	[node: string]: string[];
}

export function createDirectedGraphFromOrbits(orbits: string[]): Graph {
	return orbits.reduce((acc, curr) => {
		const [a, b] = curr.split(")");
		const edgesA = acc[a] || [];
		return { ...acc, [a]: [...edgesA, b] };
	}, {});
}
