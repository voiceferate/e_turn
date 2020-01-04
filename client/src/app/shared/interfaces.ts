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

export interface Holiday {
  holiday: Date,
  holiday_name: string,
  _id?: string
}

export interface Order {
  region: string,
  vpr: string,
  date: Date,
  customer_id_code: number,
  time_period_number: number,
  _id?: string
}