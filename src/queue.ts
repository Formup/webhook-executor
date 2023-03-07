import { Response } from 'express';
import { exec } from 'child_process';

const queue: Array<() => void> = [];
let active = false;

const updateQueue = () => {
    if (!active && queue.length > 0) {
        const next = queue.shift();
        if (next) next();
    }
};

export const addToQueue = (filePath: string, res: Response) => {
    let command = filePath;

    if (process.platform !== 'win32') {
        command = `sh ${filePath}`;
    }

    queue.push(() => {
        const startTime = performance.now();
        active = true;

        exec(command, (error) => {
            if (error) return console.error(error);
            active = false;

            const endTime = performance.now();
            const runTime = Math.round(endTime - startTime);

            console.log(`Executed file ${filePath} (${runTime}ms)`);
            updateQueue();
        });
    });

    res.status(202).send({ success: 'Added to queue' });
    updateQueue();
};
