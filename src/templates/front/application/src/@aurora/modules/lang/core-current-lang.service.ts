/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CoreLang } from './lang.types';

@Injectable({
    providedIn: 'root',
})
export class CoreCurrentLangService
{
    private currentLangSubject$: BehaviorSubject<CoreLang | null> = new BehaviorSubject(null);
    private _currentLang: CoreLang | null = null;

    /**
    * Getter for currentLang
    */
    get currentLang$(): Observable<CoreLang>
    {
        return this.currentLangSubject$.asObservable();
    }

    get currentLang(): CoreLang
    {
        return this._currentLang;
    }

    setCurrentLang(lang: CoreLang): void
    {
        if (!lang) throw new Error('To define a current lang, it must be an object of type CoreLang, it cannot be null');

        this._currentLang = lang;
        this.currentLangSubject$.next(lang);
    }

    reset(): void
    {
        this._currentLang = null;
        this.currentLangSubject$.next(null);
    }
}