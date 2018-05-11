


export class QueueService {

    private queue: Array<Function>;
    private isActive: boolean;

    public constructor() {
        this.queue = [];
        this.isActive = false;
    }

    public addToQueue(fn: (next: () => void) => void): void {
        this.queue.push(fn);
        this._startQueue();
    }

    private _startQueue() {
        if (!this.isActive && this.queue.length) {
            this.isActive = true;
            this._next();
        }
    }

    private _next() {
        if (!this.queue.length) {
            this.isActive = false;
            return;
        }
        this.queue.shift()(() => {
            this._next();
        });
    }
}