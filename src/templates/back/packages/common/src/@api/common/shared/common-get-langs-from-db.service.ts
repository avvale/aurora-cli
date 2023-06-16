import { CommonLang } from '@api/graphql';
import { CommonGetLangsQuery } from '@app/common/lang/application/get/common-get-langs.query';
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

        // get langs from db and return cache langs if cache is expired
        await this.init();
        return await this.cacheManager.get<CommonLang[]>('common/langs');
    }

    async init(): Promise<void>
    {
        await this.cacheManager.set('common/langs', await this.getDbLangs());
    }

    async getDbLangs(): Promise<CommonLang[]>
    {
        return await this.queryBus.ask(new CommonGetLangsQuery());
    }

    onApplicationBootstrap(): void
    {
        this.init();
    }
}
