import { CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { CommonModels, CommonHandlers, CommonServices, CommonRepositories, CommonSagas } from '../../@app/common';
import { CommonLangControllers, CommonLangResolvers, CommonLangApiHandlers, CommonLangServices } from './lang';

// custom
import { IQueryBus } from '@aurorajs.dev/core';
import { GetLangsQuery } from '../../@app/common/lang/application/get/get-langs.query';
import { Cache } from 'cache-manager';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...CommonModels
        ])
    ],
    controllers: [
        ...CommonLangControllers,
    ],
    providers: [
        ...CommonHandlers,
        ...CommonServices,
        ...CommonRepositories,
        ...CommonSagas,
        ...CommonLangResolvers,
        ...CommonLangApiHandlers,
        ...CommonLangServices
    ],
})
export class CommonModule
{
    constructor(
        private readonly queryBus: IQueryBus,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async onApplicationBootstrap(): Promise<void>
    {
        // set lang in cache manager fo two years
        await this.cacheManager
            .set(
                'common/langs',
                await this.queryBus.ask(new GetLangsQuery()),
                60 * 60 * 24 * 365 * 2, // ttl
            );
    }
}
