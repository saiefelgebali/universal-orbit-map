import { getCommandLineArguments, getOrbits } from "./lib";
import { Queue } from "./queue";

function main() {
	const [filename, start, end] = getCommandLineArguments(3);
	const orbits = getOrbits(filename);
	const graph = createGraphFromOrbits(orbits);
	const shortestDistance = getShortestDistance(graph, start, end);
	const totalOrbitalTransfers = shortestDistance - 2;

	console.log(
		`There are ${totalOrbitalTransfers} orbital transfers required to travel from ${start} to ${end}`
	);
}

interface Graph {
	[node: string]: string[];
}

function createGraphFromOrbits(orbits: string[]): Graph {
	return orbits.reduce((acc, curr) => {
		const [a, b] = curr.split(")");
		const edgesA = acc[a] || [];
		const edgesB = acc[b] || [];
		return { ...acc, [a]: [...edgesA, b], [b]: [...edgesB, a] };
	}, {});
}

function getShortestDistance(graph: Graph, start: string, end: string): number {
	const visited: { [node: string]: boolean } = {};

	const queue = new Queue<string>();

	const nodeDistances = Object.keys(graph).reduce<{ [key: string]: number }>(
		(acc, curr) => {
			return { ...acc, [curr]: Infinity };
		},
		{}
	);

	nodeDistances[start] = 0;

	queue.enqueue(start);

	while (!queue.empty) {
		const node = queue.dequeue();
		const distance = nodeDistances[node];

		const edgesToVisit = graph[node].filter((e) => !(e in visited));

		edgesToVisit.forEach((edge) => {
			const newDistance = distance + 1;
			if (newDistance < nodeDistances[edge]) {
				nodeDistances[edge] = newDistance;
			}
			queue.enqueue(edge);
		});

		visited[node] = true;
	}

	return nodeDistances[end];
}

main();
