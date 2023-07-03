/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel1ByIdResolver } from './common-update-administrative-area-level-1-by-id.resolver';
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-update-administrative-area-level-1-by-id.handler';
import { CommonUpdateAdministrativeAreaLevel1ByIdInput } from '@api/graphql';

// sources
import { commonMockAdministrativeAreaLevel1Data } from '@app/common/administrative-area-level-1/infrastructure/mock/common-mock-administrative-area-level-1.data';

describe('CommonUpdateAdministrativeAreaLevel1ByIdResolver', () =>
{
    let resolver: CommonUpdateAdministrativeAreaLevel1ByIdResolver;
    let handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel1ByIdResolver,
                {
                    provide : CommonUpdateAdministrativeAreaLevel1ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAdministrativeAreaLevel1ByIdResolver>(CommonUpdateAdministrativeAreaLevel1ByIdResolver);
        handler = module.get<CommonUpdateAdministrativeAreaLevel1ByIdHandler>(CommonUpdateAdministrativeAreaLevel1ByIdHandler);
    });

    test('CommonUpdateAdministrativeAreaLevel1ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel1ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(commonMockAdministrativeAreaLevel1Data[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel1ByIdInput>commonMockAdministrativeAreaLevel1Data[0])).toBe(commonMockAdministrativeAreaLevel1Data[0]);
        });
    });
});