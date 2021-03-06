export interface User {
  _id?: string
  email: string,
  password: string,
  role?: string,
  status: boolean,
  name: string,
  vpr: string,
  secure_id: number
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
  vacation: [{startDate1: Date, endDate1: Date}, {startDate2: Date, endDate2: Date}, {startDate3: Date, endDate3: Date}]
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
  customer_name: string,
  customer_id_code: number,
  time_period_number: number,
  _id?: string
}

export interface RegionTooltip {
  name: string,
  top: Number,
  left: Number,
}

export interface HelperTextMarkup {
  title: string,
  text: string,
}