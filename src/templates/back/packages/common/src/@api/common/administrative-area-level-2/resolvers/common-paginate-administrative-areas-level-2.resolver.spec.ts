/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonPaginateAdministrativeAreasLevel2Resolver } from './common-paginate-administrative-areas-level-2.resolver';
import { CommonPaginateAdministrativeAreasLevel2Handler } from '../handlers/common-paginate-administrative-areas-level-2.handler';

// sources
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2/infrastructure/mock/common-mock-administrative-area-level-2.data';

describe('CommonPaginateAdministrativeAreasLevel2Resolver', () =>
{
    let resolver: CommonPaginateAdministrativeAreasLevel2Resolver;
    let handler: CommonPaginateAdministrativeAreasLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonPaginateAdministrativeAreasLevel2Resolver,
                {
                    provide : CommonPaginateAdministrativeAreasLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonPaginateAdministrativeAreasLevel2Resolver>(CommonPaginateAdministrativeAreasLevel2Resolver);
        handler = module.get<CommonPaginateAdministrativeAreasLevel2Handler>(CommonPaginateAdministrativeAreasLevel2Handler);
    });

    test('CommonPaginateAdministrativeAreasLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonPaginateAdministrativeAreasLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a commonMockAdministrativeAreaLevel2Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve({
                total: 5,
                count: 5,
                rows : commonMockAdministrativeAreaLevel2Data,
            })));
            expect(await resolver.main()).toStrictEqual({
                total: 5,
                count: 5,
                rows : commonMockAdministrativeAreaLevel2Data,
            });
        });
    });
});