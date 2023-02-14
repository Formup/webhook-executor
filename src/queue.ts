import { exec } from 'child_process';
import config from './config.json';

const queue: Array<() => void> = [];
let active = false;

const checkQueue = () => {
    if (!active && queue.length > 0) {
        const next = queue.shift();
        if (next) next();
    }
};

export const updateQueue = () => {
    return new Promise((resolve, reject) => {
        queue.push(() => {
            active = true;

            let command = `${__dirname}/scripts/${config.script}`;

            if (process.platform !== 'win32') {
                command = `sh ${__dirname}/scripts/${config.script}`;
            }

            exec(command, (error, stdout) => {
                if (error) return reject(error);
                active = false;
                checkQueue();
                resolve(stdout);
            });
        });

        checkQueue();
    });
};
