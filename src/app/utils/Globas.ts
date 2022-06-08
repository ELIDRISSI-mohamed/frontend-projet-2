import { DatePipe } from '@angular/common';
import { Injectable } from "@angular/core";

@Injectable()
export class Globals {
    date: any;

    constructor(private DatePipe: DatePipe) { }

    FormatDate(){
        this.date = new Date();
        return this.DatePipe.transform(this.date,"yyyy-MM-dd");
    }

}