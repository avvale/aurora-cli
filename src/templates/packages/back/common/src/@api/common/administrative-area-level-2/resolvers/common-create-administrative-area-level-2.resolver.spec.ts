/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreaLevel2Resolver } from './common-create-administrative-area-level-2.resolver';
import { CommonCreateAdministrativeAreaLevel2Handler } from '../handlers/common-create-administrative-area-level-2.handler';
import { CommonCreateAdministrativeAreaLevel2Input } from '@api/graphql';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonCreateAdministrativeAreaLevel2Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreaLevel2Resolver;
    let handler: CommonCreateAdministrativeAreaLevel2Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel2Resolver,
                {
                    provide : CommonCreateAdministrativeAreaLevel2Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAdministrativeAreaLevel2Resolver>(CommonCreateAdministrativeAreaLevel2Resolver);
        handler = module.get<CommonCreateAdministrativeAreaLevel2Handler>(CommonCreateAdministrativeAreaLevel2Handler);
    });

    test('CommonCreateAdministrativeAreaLevel2Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel2Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel2 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel2Input>administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});