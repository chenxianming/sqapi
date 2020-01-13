const delay = 5 * 60 * 1000;

const implement = () => {
    // automatic function put here
}

const automaticTask = async () => {
    implement();
    setTimeout(automaticTask, delay);
}

module.exports = automaticTask;