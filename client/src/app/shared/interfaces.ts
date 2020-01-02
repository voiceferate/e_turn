export interface User {
  email: string,
  password: string,
  role?: string 
}

export interface Region {
  name: string,
  active: boolean,
  _id?: string
}

export interface Vpr {
  name: string,
  address: string,
  region: string,
  _id?: string
}