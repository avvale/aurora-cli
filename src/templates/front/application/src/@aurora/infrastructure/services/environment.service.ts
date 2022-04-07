import { Injectable } from '@angular/core';
import { CommonLang, Config, Environment, Theme } from '../../domain';
import lodashSortBy from 'lodash-es/sortBy';

@Injectable({
    providedIn: 'root',
})
export class EnvironmentService
{
    constructor() { /**/ }

    private _environment: Environment;

    get environment(): Environment
    {
        return this._environment;
    }

    init(environment: Environment): void
    {
        this._environment = environment;
    }








    /* get config(): Config
    {
        return this._env.config;
    }

    get theme(): Theme
    {
        return this._env.theme;
    }

    get activatedLangs(): CommonLang[]
    {
        return lodashSortBy(this.langs, ['sort']).filter(item => item.isActive === true);
    }

    private _currentLang: CommonLang;
    set currentLang(lang: CommonLang)
    {
        this._currentLang = lang;

        // throw lang for observable
        this.langChange.next(lang);
    }

    get currentLang(): CommonLang
    {
        return this._currentLang;
    }

    get baseLang(): CommonLang
    {
        const baseLang = this.langs.find(item => item.iso6392 === this._env.config.baseLang);

        if (baseLang) return baseLang;

        throw new Error('Base lang is not defined, check "baseLang" environment variable');
    }

    data(key: string): string
    {
        const property = this._env.config.data.find(item => item.key === key);
        return property ? property.value : null;
    } */
}
