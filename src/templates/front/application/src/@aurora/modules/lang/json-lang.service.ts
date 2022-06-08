/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable, switchMap, tap } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { CommonLang } from './lang.types';

@Injectable({
    providedIn: 'root',
})
export class JsonLangService
{
    private langs: BehaviorSubject<CommonLang[] | null> = new BehaviorSubject(null);

    constructor() { /**/ }

    /**
    * Getter for langs
    */
    get langs$(): Observable<CommonLang[]>
    {
        return this.langs.asObservable();
    }

    get(): Observable<CommonLang[]>
    {
        return fromFetch('assets/data/lang.json')
            .pipe(
                switchMap(response => response.json()),
                first(),
                tap((objects: CommonLang[]) => this.langs.next(objects)),
            );
    }
}