import { CommonLang } from '@api/graphql';
import { CommonFindLangQuery } from '@app/common/lang/application/find/common-find-lang.query';
import { coreLangs } from '@aurora/modules/lang';
import { CoreGetFallbackLangService, IQueryBus } from '@aurorajs.dev/core';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

@Injectable()
export class CommonGetFallbackLangFromDbService
    implements CoreGetFallbackLangService
{
    constructor(
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly queryBus: IQueryBus,
        private readonly configService: ConfigService,
    ) {}

    async get<CommonLang>(): Promise<CommonLang> {
        // return cache fallback lang
        const lang = await this.cacheManager.get<CommonLang>(
            'common/fallback-lang',
        );
        if (lang) return lang;

        // get langs from db and return cache langs if cache is expired
        await this.init();
        return await this.cacheManager.get<CommonLang>('common/fallback-lang');
    }

    async init(): Promise<void> {
        await this.cacheManager.set(
            'common/fallback-lang',
            await this.getDbFallbackLang(),
        );
    }

    async getDbFallbackLang(): Promise<CommonLang> {
        try {
            const fallbackLangIso6392 =
                this.configService.get('APP_FALLBACK_LANG');
            return await this.queryBus.ask(
                new CommonFindLangQuery({
                    where: {
                        iso6392: fallbackLangIso6392,
                    },
                }),
            );
        } catch (error) {
            // Avoid a NotFoundException failure in case
            // of deleting languages from the CommonLang
            // table or the APP_FALLBACK_LANG value does not match a language.
            if (error instanceof NotFoundException) {
                Logger.warn(`
                    APP_FALLBACK_LANG is not found in database, fallback value is: '${this.configService.get('APP_FALLBACK_LANG')}'
                    Please, check the data of the CommonLang table, or seed again the table.
                `);
                const fallbackLangIso6392 =
                    this.configService.get('APP_FALLBACK_LANG');
                return coreLangs.find(
                    (lang) => lang.iso6392 === fallbackLangIso6392,
                ) as unknown as CommonLang;
            }
        }
    }

    onApplicationBootstrap(): void {
        this.init();
    }
}
