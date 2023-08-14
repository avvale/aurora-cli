/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler, CommonUpdateAdministrativeAreaLevel2ByIdResolver } from '@api/common/administrative-area-level-2';
import { CommonUpdateAdministrativeAreaLevel2ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel2Data } from '@app/common/administrative-area-level-2';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpdateAdministrativeAreaLevel2ByIdResolver', () =>
{
    let resolver: CommonUpdateAdministrativeAreaLevel2ByIdResolver;
    let handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel2ByIdResolver,
                {
                    provide : CommonUpdateAdministrativeAreaLevel2ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAdministrativeAreaLevel2ByIdResolver>(CommonUpdateAdministrativeAreaLevel2ByIdResolver);
        handler = module.get<CommonUpdateAdministrativeAreaLevel2ByIdHandler>(CommonUpdateAdministrativeAreaLevel2ByIdHandler);
    });

    test('CommonUpdateAdministrativeAreaLevel2ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel2ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel2 by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel2Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel2ByIdInput>commonMockAdministrativeAreaLevel2Data[0])).toBe(commonMockAdministrativeAreaLevel2Data[0]);
        });
    });
});
