/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel3ByIdResolver } from './common-update-administrative-area-level-3-by-id.resolver';
import { CommonUpdateAdministrativeAreaLevel3ByIdHandler } from '../handlers/common-update-administrative-area-level-3-by-id.handler';
import { CommonUpdateAdministrativeAreaLevel3ByIdInput } from '@api/graphql';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

describe('CommonUpdateAdministrativeAreaLevel3ByIdResolver', () =>
{
    let resolver: CommonUpdateAdministrativeAreaLevel3ByIdResolver;
    let handler: CommonUpdateAdministrativeAreaLevel3ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonUpdateAdministrativeAreaLevel3ByIdResolver,
                {
                    provide : CommonUpdateAdministrativeAreaLevel3ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonUpdateAdministrativeAreaLevel3ByIdResolver>(CommonUpdateAdministrativeAreaLevel3ByIdResolver);
        handler = module.get<CommonUpdateAdministrativeAreaLevel3ByIdHandler>(CommonUpdateAdministrativeAreaLevel3ByIdHandler);
    });

    test('CommonUpdateAdministrativeAreaLevel3ByIdResolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel3ByIdResolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return a administrativeAreaLevel3 by id updated', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await resolver.main(<CommonUpdateAdministrativeAreaLevel3ByIdInput>administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});