import { CoreLang } from '@api/graphql';
import { CoreGetLangsService } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { coreLangs } from './core-langs';

@Injectable()
export class CoreGetLangsFromJsonService implements CoreGetLangsService
{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async get<T>(): Promise<T[]>
    {
        // return cache langs
        const langs = await this.cacheManager.get<T[]>('common/langs');
        if (langs) return langs;

        // get langs from json and return cache langs if cache is expired
        await this.init();
        return await this.cacheManager.get<T[]>('common/langs');
    }

    async init(): Promise<void>
    {
        await this.cacheManager.set('common/langs', this.getJsonLangs());
    }

    getJsonLangs(): CoreLang[]
    {
        return coreLangs;
    }

    onApplicationBootstrap(): void
    {
        this.init();
    }
}
