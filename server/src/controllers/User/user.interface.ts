export default interface User {
    username: string,
    password: string,
    email: string,
    balance: number,
    isOperator: boolean,
    reservedFlights: number[]
}