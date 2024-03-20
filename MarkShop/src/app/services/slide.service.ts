import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Slide } from 'src/app/models/slide';
const _api = 'https://localhost:44377';
const _user = JSON.parse(localStorage.getItem('user') || '{}');
const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + _user.token
});
@Injectable({
    providedIn: 'root'
})
export class SlideService {
    constructor(private http: HttpClient) { }

    getSlideAll(): Observable<Array<Slide>> {
        return this.http.get<Array<Slide>>(_api + '/api/Slide/get-all');
    }
    create(slide: any): Observable<any> {
        return this.http.post<any>(_api + '/api/Slide/them', slide, { headers });
    }
    update(object: object): Observable<any> {
        return this.http.put<any>(_api + '/api/Slide/update', object, { headers });
    }

    detele(id: number): Observable<any> {
        return this.http.delete<any>(_api + '/api/Slide/xoa/' + id, { headers });
    }
}
