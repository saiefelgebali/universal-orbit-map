import { createDirectedGraphFromOrbits, Graph } from "./graph";
import { getOrbits, getCommandLineArguments } from "./lib";
import { Queue } from "./queue";

function getTotalDistances(graph: Graph, root: string) {
	const queue = new Queue<string>();

	const nodeDistances = Object.keys(graph).reduce<{ [key: string]: number }>(
		(acc, curr) => {
			return { ...acc, [curr]: 0 };
		},
		{}
	);

	queue.enqueue(root);

	while (!queue.empty) {
		const node = queue.dequeue();
		const distance = nodeDistances[node];

		const edges = graph[node];

		edges?.forEach((edge) => {
			nodeDistances[edge] = distance + 1;
			queue.enqueue(edge);
		});
	}

	return Object.values(nodeDistances).reduce((acc, curr) => acc + curr, 0);
}

function getTotalOrbits(orbits, root) {
	const graph = createDirectedGraphFromOrbits(orbits);
	return getTotalDistances(graph, root);
}

function main() {
	const [filename, root] = getCommandLineArguments(2);

	const orbits = getOrbits(filename);

	const totalOrbits = getTotalOrbits(orbits, root);

	console.log(totalOrbits);
}

main();
