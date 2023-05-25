import setDelay from "./setDelay";

export default async function messageLoop(){
    await setDelay(100)
    console.log('consultado')
}