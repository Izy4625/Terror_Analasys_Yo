export interface month{
    imonth: number,
    aincidents: number
}


export interface year{
    iyear: number,
    months: [month]
}