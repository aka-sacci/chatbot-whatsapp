async function setDelay(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export default setDelay