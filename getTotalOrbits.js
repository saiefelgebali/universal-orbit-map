import { getOrbits, getNodeParentsFromOrbits } from "./lib.js";

class DirectedNode {
	label;
	children;

	static createGraph(rootLabel, nodeParents) {
		const children = [];

		nodeParents.forEach((np) => {
			if (np.parent !== rootLabel) return;
			children.push(this.createGraph(np.child, nodeParents));
		});

		return new DirectedNode(rootLabel, children);
	}

	constructor(label, children) {
		this.label = label;
		this.children = children;
	}

	getTotalDistances() {
		const nodeDistances = { [this.label]: 0 };

		const stack = [this];

		while (stack.length > 0) {
			const node = stack.pop();
			const distance = nodeDistances[node.label];

			node.children.forEach((child) => {
				nodeDistances[child.label] = distance + 1;
				stack.push(child);
			});
		}

		return Object.values(nodeDistances).reduce(
			(acc, curr) => acc + curr,
			0
		);
	}
}

function getTotalOrbits(orbits) {
	const nodeParents = getNodeParentsFromOrbits(orbits);

	const root = DirectedNode.createGraph("COM", nodeParents);

	return root.getTotalDistances();
}

function main() {
	if (process.argv.length < 3) {
		throw new Error("Must provide a filename as first argument.");
	}

	const filename = process.argv.slice(2)[0];

	const orbits = getOrbits(filename);

	const totalOrbits = getTotalOrbits(orbits);

	console.log(totalOrbits);
}

main();
