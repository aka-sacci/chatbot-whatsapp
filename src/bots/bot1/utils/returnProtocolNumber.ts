export default function returnProtocolNumber(protocolID: number): string {
    return protocolID.toString().padStart(4, "0")
}