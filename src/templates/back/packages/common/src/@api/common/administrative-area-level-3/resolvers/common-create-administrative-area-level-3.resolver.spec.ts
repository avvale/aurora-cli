/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonCreateAdministrativeAreaLevel3Handler, CommonCreateAdministrativeAreaLevel3Resolver } from '@api/common/administrative-area-level-3';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';
import { commonMockAdministrativeAreaLevel3Data } from '@app/common/administrative-area-level-3';
import { Test, TestingModule } from '@nestjs/testing';

describe('CommonCreateAdministrativeAreaLevel3Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreaLevel3Resolver;
    let handler: CommonCreateAdministrativeAreaLevel3Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel3Resolver,
                {
                    provide : CommonCreateAdministrativeAreaLevel3Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAdministrativeAreaLevel3Resolver>(CommonCreateAdministrativeAreaLevel3Resolver);
        handler = module.get<CommonCreateAdministrativeAreaLevel3Handler>(CommonCreateAdministrativeAreaLevel3Handler);
    });

    test('CommonCreateAdministrativeAreaLevel3Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel3Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel3 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel3Data[0])));
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel3Input>commonMockAdministrativeAreaLevel3Data[0])).toBe(commonMockAdministrativeAreaLevel3Data[0]);
        });
    });
});
