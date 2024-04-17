import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AppService {
    constructor(private http: HttpClient) { }

    httpSignIn(params: any) {
        return this.http.post<any>('http://localhost:3001/signin', params);
    }
}