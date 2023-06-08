import { CoreGetLangsService } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { CoreLang } from './lang.types';
import { langs } from './langs';

@Injectable()
export class CoreGetFallbackLangFromJsonService implements CoreGetLangsService
{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {}

    async get<CoreLang>(): Promise<CoreLang>
    {
        // return cache langs
        const lang = await this.cacheManager.get<CoreLang>('common/fallback-lang');
        if (langs) return lang;

        // get langs from json and return cache langs
        await this.reset();
        return await this.cacheManager.get<CoreLang>('common/fallback-lang');
    }

    async reset(): Promise<void>
    {
        await this.cacheManager.set('common/fallback-lang', this.getJsonFallbackLang());
    }

    getJsonFallbackLang(): CoreLang
    {
        const fallbackLangIso6392 = this.configService.get('APP_FALLBACK_LANG');
        return langs.find(lang => lang.iso6392 === fallbackLangIso6392);
    }
}
