import { CACHE_MANAGER, Inject, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '../../@aurora/shared.module';
import { CommonModels, CommonHandlers, CommonServices, CommonRepositories, CommonSagas } from '../../@apps/common';
import { CommonLangControllers, CommonLangResolvers } from './lang';
import { CommonCountryControllers, CommonCountryResolvers } from './country';

// custom
import { IQueryBus } from 'aurora-ts-core';
import { GetLangsQuery } from '../../@apps/common/lang/application/get/get-langs.query';
import { Cache } from 'cache-manager';
import { CommonAdministrativeAreaLevel1Controllers, CommonAdministrativeAreaLevel1Resolvers } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Controllers, CommonAdministrativeAreaLevel2Resolvers } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Controllers, CommonAdministrativeAreaLevel3Resolvers } from './administrative-area-level-3';

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
        ...CommonAdministrativeAreaLevel3Resolvers
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
        await this.cacheManager.set('common/lang', await this.queryBus.ask(new GetLangsQuery()), { ttl: 60 * 60 * 24 * 365 * 2 });
    }
}
