/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { CommonLang } from '../../domain';
import { BehaviorSubject, first, Observable, switchMap, tap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';

@Injectable({
    providedIn: 'root',
})
export class JsonLangService
{
    private _langs: BehaviorSubject<CommonLang[] | null> = new BehaviorSubject(null);

    constructor() { /**/ }

    /**
    * Getter for langs
    */
    get langs$(): Observable<CommonLang[]>
    {
        return this._langs.asObservable();
    }

    get(): Observable<CommonLang[]>
    {
        return fromFetch('assets/data/lang.json')
            .pipe(
                switchMap(response => response.json()),
                first(),
                tap((objects: CommonLang[]) => this._langs.next(objects)),
            );
    }
}