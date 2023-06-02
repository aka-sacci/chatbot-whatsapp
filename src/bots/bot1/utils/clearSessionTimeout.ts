export default function clearSessionTimeout(timer: NodeJS.Timeout) {
    console.log("timer limpo!")
    clearTimeout(timer)
}