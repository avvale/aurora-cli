/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { SessionService } from '@aurora/modules/session/session.service';
import { log } from '@aurora/functions/log';
import { LangService } from '@aurora/modules/lang/lang.service';
import { first } from 'rxjs';
import { Environment } from '@aurora';

@Injectable({
    providedIn: 'root',
})
export class BootstrapService
{
    constructor(
        private sessionService: SessionService,
        private auroraLangService: LangService,
    ) {}

    async init(): Promise<void>
    {
        this.checkEnvironmentSchema(environment);

        // it may be that we do not have languages in the session, possibly because we do not use the module oAuth
        // in this case we get the languages from the database or from a json hosted in assets folder
        if (!this.sessionService.hasLangs)
        {
            // init subscribe to launch languages to subscribers
            this.auroraLangService
                .get()
                .pipe(first())
                .subscribe(langs => this.sessionService.session = { langs });
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