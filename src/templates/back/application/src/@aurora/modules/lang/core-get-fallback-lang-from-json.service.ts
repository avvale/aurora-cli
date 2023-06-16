import { CoreLang } from '@api/graphql';
import { CoreGetFallbackLangService } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { coreLangs } from './core-langs';

@Injectable()
export class CoreGetFallbackLangFromJsonService implements CoreGetFallbackLangService
{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly configService: ConfigService,
    ) {}

    async get<T>(): Promise<T>
    {
        // return cache langs
        const lang = await this.cacheManager.get<T>('common/fallback-lang');
        if (coreLangs) return lang;

        // get langs from json and return cache langs if cache is expired
        await this.init();
        return await this.cacheManager.get<T>('common/fallback-lang');
    }

    async init(): Promise<void>
    {
        await this.cacheManager.set('common/fallback-lang', this.getJsonFallbackLang());
    }

    getJsonFallbackLang(): CoreLang
    {
        const fallbackLangIso6392 = this.configService.get('APP_FALLBACK_LANG');
        return coreLangs.find(lang => lang.iso6392 === fallbackLangIso6392);
    }

    onApplicationBootstrap(): void
    {
        this.init();
    }
}
