/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { AuroraLangService, Environment } from '../../domain';
import { EnvironmentService, log, SessionService } from '../../infrastructure';
import { environment } from 'environments/environment';
import { first } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BootstrapService
{
    constructor(
        private environmentService: EnvironmentService,
        private sessionService: SessionService,
        private auroraLangService: AuroraLangService,
    ) {}

    public async init(): Promise<void>
    {
        this.checkEnvironmentSchema(environment);

        this.environmentService.init(environment);

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