/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateAdministrativeAreasLevel1Resolver } from './common-paginate-administrative-areas-level-1.resolver';
import { CommonPaginateAdministrativeAreasLevel1Handler } from '../handlers/common-paginate-administrative-areas-level-1.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonPaginateAdministrativeAreasLevel1Resolver', () =>
{
    let resolver: CommonPaginateAdministrativeAreasLevel1Resolver;
    let handler: CommonPaginateAdministrativeAreasLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAdministrativeAreasLevel1Resolver,
                {
                    provide : CommonPaginateAdministrativeAreasLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver    = module.get<CommonPaginateAdministrativeAreasLevel1Resolver>(CommonPaginateAdministrativeAreasLevel1Resolver);
        handler = module.get<CommonPaginateAdministrativeAreasLevel1Handler>(CommonPaginateAdministrativeAreasLevel1Handler);
    });

    test('CommonPaginateAdministrativeAreasLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreasLevel1', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel1,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : administrativeAreasLevel1,
            });
        });
    });
});