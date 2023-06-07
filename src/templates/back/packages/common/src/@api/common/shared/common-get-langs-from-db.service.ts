import { CommonLang } from '@api/graphql';
import { GetLangsQuery } from '@app/common/lang/application/get/get-langs.query';
import { CoreGetLangsService, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CommonGetLangsFromDbService implements CoreGetLangsService
{
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private readonly queryBus: IQueryBus,
    ) {}

    async get<CommonLang>(): Promise<CommonLang[]>
    {
        // return cache langs
        const langs = await this.cacheManager.get<CommonLang[]>('common/langs');
        if (langs) return langs;

        // get langs from db and return cache langs
        await this.cacheManager.set('common/langs', await this.getDbLangs());
        return await this.cacheManager.get<CommonLang[]>('common/langs');
    }

    async getDbLangs(): Promise<CommonLang[]>
    {
        return await this.queryBus.ask(new GetLangsQuery());
    }
}
