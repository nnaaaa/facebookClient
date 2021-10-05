export type ID = string

export interface IQueryPost {
    _page?: number
    _limit?: number
}


export type Populated<M, K extends keyof M> = Omit<M, K> & {
    [P in K]: Exclude<M[P], ID[] | ID>
}
