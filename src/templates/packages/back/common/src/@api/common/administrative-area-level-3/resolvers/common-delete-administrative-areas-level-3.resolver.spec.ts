/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonDeleteAdministrativeAreasLevel3Resolver } from './common-delete-administrative-areas-level-3.resolver';
import { CommonDeleteAdministrativeAreasLevel3Handler } from '../handlers/common-delete-administrative-areas-level-3.handler';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonDeleteAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: CommonDeleteAdministrativeAreasLevel3Resolver;
    let handler: CommonDeleteAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonDeleteAdministrativeAreasLevel3Resolver,
                {
                    provide : CommonDeleteAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonDeleteAdministrativeAreasLevel3Resolver>(CommonDeleteAdministrativeAreasLevel3Resolver);
        handler = module.get<CommonDeleteAdministrativeAreasLevel3Handler>(CommonDeleteAdministrativeAreasLevel3Handler);
    });

    test('CommonDeleteAdministrativeAreasLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonDeleteAdministrativeAreasLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreasLevel3 deleted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3)));
            expect(await resolver.main()).toBe(administrativeAreasLevel3);
        });
    });
});