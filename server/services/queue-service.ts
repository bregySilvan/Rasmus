


export class QueueService {

    private queue: Array<Function>;
    private isActive: boolean;

    public constructor() {
        this.queue = [];
    }

    public addToQueue(fn: (next: () => void) => void): void {
        this.queue.push(fn);
        this.startQueue();
    }

    private startQueue() {
        if (!this.isActive) {
            this.isActive = true;
            this.next();
        }
    }

    private next() {
        if (!this.queue.length) {
            return;
        }
        this.queue.shift()(() => {
            this.next();
        })
    }
}