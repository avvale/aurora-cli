/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonGetAdministrativeAreasLevel3Handler, CommonGetAdministrativeAreasLevel3Resolver } from '@api/common/administrative-area-level-3';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

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
