import { exec } from 'child_process';

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

            exec(`${__dirname}/scripts/test-echo.sh`, (error, stdout) => {
                if (error) return reject(error);

                active = false;
                checkQueue();
                resolve(stdout);
            });
        });

        checkQueue();
    });
};
