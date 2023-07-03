/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonGetAdministrativeAreasLevel3Resolver } from './common-get-administrative-areas-level-3.resolver';
import { CommonGetAdministrativeAreasLevel3Handler } from '../handlers/common-get-administrative-areas-level-3.handler';

// sources
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3/infrastructure/mock/common-mock-administrative-area-level-3.data';

describe('CommonGetAdministrativeAreasLevel3Resolver', () =>
{
    let resolver: CommonGetAdministrativeAreasLevel3Resolver;
    let handler: CommonGetAdministrativeAreasLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonGetAdministrativeAreasLevel3Resolver,
                {
                    provide : CommonGetAdministrativeAreasLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonGetAdministrativeAreasLevel3Resolver>(CommonGetAdministrativeAreasLevel3Resolver);
        handler = module.get<CommonGetAdministrativeAreasLevel3Handler>(CommonGetAdministrativeAreasLevel3Handler);
    });

    test('CommonGetAdministrativeAreasLevel3Resolver should be defined', () =>
    {
        expect(resolver).   toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonGetAdministrativeAreasLevel3Resolver should be defined', () =>
        {
            expect(resolver).   toBeDefined();
        });

        test('should return a commonMockAdministrativeAreaLevel3Data', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data)));
            expect(await resolver.main()).toBe(commonMockAdministrativeAreaLevel3Data);
        });
    });
});