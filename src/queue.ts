import { exec } from 'child_process';

const queue: Array<() => void> = [];
let active = false;

const updateQueue = () => {
    if (!active && queue.length > 0) {
        const next = queue.shift();
        if (next) next();
    }
};

export const addToQueue = (scriptFile: string) => {
    return new Promise((resolve, reject) => {
        queue.push(() => {
            active = true;

            let command = `${__dirname}/scripts/${scriptFile}`;

            if (process.platform !== 'win32') {
                command = `sh ${__dirname}/scripts/${scriptFile}`;
            }

            exec(command, (error, stdout) => {
                if (error) return reject(error);
                active = false;
                updateQueue();
                resolve(stdout);
            });
        });

        updateQueue();
    });
};
