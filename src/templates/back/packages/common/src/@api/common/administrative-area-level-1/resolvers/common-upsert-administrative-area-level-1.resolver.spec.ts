/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpsertAdministrativeAreaLevel1Resolver } from './common-upsert-administrative-area-level-1.resolver';
import { CommonUpsertAdministrativeAreaLevel1Handler } from '../handlers/common-upsert-administrative-area-level-1.handler';
import { CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonUpsertAdministrativeAreaLevel1Resolver', () =>
{
    let resolver: CommonUpsertAdministrativeAreaLevel1Resolver;
    let handler: CommonUpsertAdministrativeAreaLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpsertAdministrativeAreaLevel1Resolver,
                {
                    provide : CommonUpsertAdministrativeAreaLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpsertAdministrativeAreaLevel1Resolver>(CommonUpsertAdministrativeAreaLevel1Resolver);
        handler = module.get<CommonUpsertAdministrativeAreaLevel1Handler>(CommonUpsertAdministrativeAreaLevel1Handler);
    });

    test('CommonUpsertAdministrativeAreaLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpsertAdministrativeAreaLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 upserted', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel1ByIdInput>commonMockAdministrativeAreaLevel1Data[0])).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});