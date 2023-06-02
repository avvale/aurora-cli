import { CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { CommonModels, CommonHandlers, CommonServices, CommonRepositories, CommonSagas } from '../../@app/common';
import { CommonLangControllers, CommonLangResolvers, CommonLangApiHandlers } from './lang';
import { CommonCountryControllers, CommonCountryResolvers, CommonCountryApiHandlers } from './country';

// custom
import { IQueryBus } from '@aurorajs.dev/core';
import { GetLangsQuery } from '../../@app/common/lang/application/get/get-langs.query';
import { Cache } from 'cache-manager';
import { CommonAdministrativeAreaLevel1Controllers, CommonAdministrativeAreaLevel1Resolvers, CommonAdministrativeAreaLevel1ApiHandlers } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Controllers, CommonAdministrativeAreaLevel2Resolvers, CommonAdministrativeAreaLevel2ApiHandlers } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Controllers, CommonAdministrativeAreaLevel3Resolvers, CommonAdministrativeAreaLevel3ApiHandlers } from './administrative-area-level-3';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...CommonModels
        ])
    ],
    controllers: [
        ...CommonLangControllers,
        ...CommonCountryControllers,
        ...CommonAdministrativeAreaLevel1Controllers,
        ...CommonAdministrativeAreaLevel2Controllers,
        ...CommonAdministrativeAreaLevel3Controllers
    ],
    providers: [
        ...CommonHandlers,
        ...CommonServices,
        ...CommonRepositories,
        ...CommonSagas,
        ...CommonLangResolvers,
        ...CommonCountryResolvers,
        ...CommonAdministrativeAreaLevel1Resolvers,
        ...CommonAdministrativeAreaLevel2Resolvers,
        ...CommonAdministrativeAreaLevel3Resolvers,
        ...CommonLangApiHandlers,
        ...CommonCountryApiHandlers,
        ...CommonAdministrativeAreaLevel1ApiHandlers,
        ...CommonAdministrativeAreaLevel2ApiHandlers,
        ...CommonAdministrativeAreaLevel3ApiHandlers
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
        await this.cacheManager.set('common/langs', await this.queryBus.ask(new GetLangsQuery()), { ttl: 60 * 60 * 24 * 365 * 2 });
    }
}
