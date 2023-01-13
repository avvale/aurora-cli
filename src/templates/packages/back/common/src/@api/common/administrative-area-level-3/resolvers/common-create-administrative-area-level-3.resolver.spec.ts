/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreaLevel3Resolver } from './common-create-administrative-area-level-3.resolver';
import { CommonCreateAdministrativeAreaLevel3Handler } from '../handlers/common-create-administrative-area-level-3.handler';
import { CommonCreateAdministrativeAreaLevel3Input } from '@api/graphql';

// sources
import { administrativeAreasLevel3 } from '@app/common/administrative-area-level-3/infrastructure/seeds/administrative-area-level-3.seed';

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
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel3[0])));
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel3Input>administrativeAreasLevel3[0])).toBe(administrativeAreasLevel3[0]);
        });
    });
});