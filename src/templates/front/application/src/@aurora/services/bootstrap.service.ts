/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { AuthenticationService, CoreGetLangsService, CoreSearchKeyLang, Environment, IamService, log, SessionService } from '@aurora';
import { lastValueFrom } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
    providedIn: 'root',
})
export class BootstrapService
{
    constructor(
        private readonly sessionService: SessionService,
        private readonly iamService: IamService,
        private readonly authenticationService: AuthenticationService,
        private readonly coreGetLangsService: CoreGetLangsService,
        private readonly translocoService: TranslocoService,
    ) {}

    async init(): Promise<void>
    {
        this.checkEnvironmentSchema(environment);

        // get session from local storage and set in session observable
        this.sessionService.init();

        // get languages from CACHE MANAGER in nestjs or json or
        // database according to configuration in shared module
        const data = await lastValueFrom(this.coreGetLangsService.get());
        this.sessionService.set('langs', data.langs);
        this.sessionService.set('fallbackLang', data.fallbackLang);
        this.sessionService.set('searchKeyLang', data.searchKeyLang);

        // check token to request user
        if (await lastValueFrom(this.authenticationService.check()))
        {
            // get user from iam service
            const response = await lastValueFrom(this.iamService.get());

            // set user preferred lang
            const userPreferredLang = data.langs.find(lang => lang.id === response.me.user.langId);
            if (userPreferredLang) this.translocoService.setActiveLang(userPreferredLang.iso6392);

            log('[DEBUG] Get IamService user data from BootstrapService');
        }

        log('[DEBUG] BootstrapService Initialized');
    }

    private checkEnvironmentSchema(env: Environment): void
    {
        if (!env) throw new Error('Error to load environment properties, current value: ' + env);
        if (!Array.isArray(env.lang.langs) || env.lang.langs.length === 0) throw new Error(`
        You must to define a array with langs application configuration, in environment file, must contains ISO 639-1 code langs.
            lang: {
                base    : 'es',
                fallback: 'es',
                langs   : ['es','en'],
            }
        `);
        if (! env.lang.langs.includes(env.lang.fallback)) throw new Error(`
        You must to define a fallback lang in environment file, must contains ISO 639-1 code lang.
            lang: {
                base    : 'es',
                fallback: 'es',
                langs   : ['es','en'],
            }
        `);
    }
}