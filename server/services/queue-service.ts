


export class QueueService {

    private queue: Array<Function>;
    private isActive: boolean;

    public constructor() {
        this.queue = [];
        this.isActive = false;
    }

    public addToQueue(fn: (next: () => void) => void): void {
        this.queue.push(fn);
        this.startQueue();
    }

    private startQueue() {
        if (!this.isActive && this.queue.length) {
            this.isActive = true;
            this.next();
        }
    }

    public next() {
        if (!this.queue.length) {
            this.isActive = false;
            return;
        }
        this.queue.shift()(() => {
            this.next();
        });
    }
}