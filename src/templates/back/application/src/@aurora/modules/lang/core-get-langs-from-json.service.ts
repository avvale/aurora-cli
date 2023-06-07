import { CoreGetLangsService } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { langs } from './langs';
import { CoreLang } from './lang.types';

@Injectable()
export class CoreGetLangsFromJsonService implements CoreGetLangsService
{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async get<CoreLang>(): Promise<CoreLang[]>
    {
        // return cache langs
        const langs = await this.cacheManager.get<CoreLang[]>('common/langs');
        if (langs) return langs;

        // get langs from json and return cache langs
        await this.cacheManager.set('common/langs', await this.getJsonLangs());
        return await this.cacheManager.get<CoreLang[]>('common/langs');
    }

    getJsonLangs(): CoreLang[]
    {
        return langs;
    }
}
