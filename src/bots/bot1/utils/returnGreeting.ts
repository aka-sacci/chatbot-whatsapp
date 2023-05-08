export default function returnGreeting(): string {
    let fullDate = new Date()
    let hour = fullDate.getHours()
    let greeting = ''
    if (hour < 4 ) greeting = "Boa noite!";
    if (hour > 3 && hour < 12) greeting = "Bom dia!";
    if (hour > 11 && hour < 19) greeting = "Boa tarde!";
    if (hour > 18) greeting = "Boa noite!";

    return greeting
}