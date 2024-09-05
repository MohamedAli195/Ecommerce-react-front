export interface IProduct {
    id:number,
    quantity?:number,
    attributes:{
    title:string,
    description:string,
    stock:number,
    price:number,
    category:string
    thumbnail:{
        data:{
            attributes:{
                
                    url:string
                
            }
        }
    }
    }
    
}
export interface IUser {
    identifier:string
    password:string
}
export interface IUserDataApi {
    id: number,
        username: string,
        email: string,
        provider: string,
        confirmed: boolean,
        blocked: boolean,
        createdAt: string,
        updatedAt: string
}