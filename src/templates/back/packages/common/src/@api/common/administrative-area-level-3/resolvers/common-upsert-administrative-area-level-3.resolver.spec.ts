/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonUpsertAdministrativeAreaLevel3Handler, CommonUpsertAdministrativeAreaLevel3Resolver } from '@api/common/administrative-area-level-3';
import { CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonUpsertAdministrativeAreaLevel3Resolver', () =>
{
    let resolver: CommonUpsertAdministrativeAreaLevel3Resolver;
    let handler: CommonUpsertAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertAdministrativeAreaLevel3Resolver,
                {
                    provide : CommonUpsertAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertAdministrativeAreaLevel3Resolver>(CommonUpsertAdministrativeAreaLevel3Resolver);
        handler = module.get<CommonUpsertAdministrativeAreaLevel3Handler>(CommonUpsertAdministrativeAreaLevel3Handler);
    });

    test('CommonUpsertAdministrativeAreaLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel3ByIdInput>commonMockAdministrativeAreaLevel3Data[0])).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
