/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreasLevel2Resolver } from './common-delete-administrative-areas-level-2.resolver';
import { CommonDeleteAdministrativeAreasLevel2Handler } from '../handlers/common-delete-administrative-areas-level-2.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonDeleteAdministrativeAreasLevel2Resolver', () =>
{
    let resolver: CommonDeleteAdministrativeAreasLevel2Resolver;
    let handler: CommonDeleteAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreasLevel2Resolver,
                {
                    provide : CommonDeleteAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAdministrativeAreasLevel2Resolver>(CommonDeleteAdministrativeAreasLevel2Resolver);
        handler = module.get<CommonDeleteAdministrativeAreasLevel2Handler>(CommonDeleteAdministrativeAreasLevel2Handler);
    });

    test('CommonDeleteAdministrativeAreasLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel2 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2)));
            expect(await resolver.main()).toBe(administrativeAreasLevel2);
        });
    });
});