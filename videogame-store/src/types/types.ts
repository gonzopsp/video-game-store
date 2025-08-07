export type videogame = {
    id : number,
    genre: number,
    name: string,
    description: string,
    image: string,
    price: number,
    stock: number

}

export type users = {
    email: string,
    name: string,
    password: string,
    role: number
}

export type role = {
    id: number,
    name: string
}