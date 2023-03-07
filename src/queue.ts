import { exec } from 'child_process';

const queue: Array<() => void> = [];
let active = false;

const updateQueue = () => {
    if (!active && queue.length > 0) {
        const next = queue.shift();
        if (next) next();
    }
};

export const addToQueue = (filePath: string) => {
    queue.push(() => {
        active = true;

        let command = `${filePath}`;

        if (process.platform !== 'win32') {
            command = `sh ${filePath}`;
        }

        exec(command, (error) => {
            if (error) console.error(error);
            active = false;
            updateQueue();
        });
    });

    updateQueue();
};
