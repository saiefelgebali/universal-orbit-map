export class Queue<T> {
	private queue: T[] = [];

	public get empty() {
		return this.queue.length === 0;
	}

	enqueue(item: T) {
		this.queue.push(item);
	}

	dequeue() {
		return this.queue.shift();
	}
}
