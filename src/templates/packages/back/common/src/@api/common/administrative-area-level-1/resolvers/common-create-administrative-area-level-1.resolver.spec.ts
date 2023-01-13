/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateAdministrativeAreaLevel1Resolver } from './common-create-administrative-area-level-1.resolver';
import { CommonCreateAdministrativeAreaLevel1Handler } from '../handlers/common-create-administrative-area-level-1.handler';
import { CommonCreateAdministrativeAreaLevel1Input } from '@api/graphql';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonCreateAdministrativeAreaLevel1Resolver', () =>
{
    let resolver: CommonCreateAdministrativeAreaLevel1Resolver;
    let handler: CommonCreateAdministrativeAreaLevel1Handler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                CommonCreateAdministrativeAreaLevel1Resolver,
                {
                    provide : CommonCreateAdministrativeAreaLevel1Handler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        resolver = module.get<CommonCreateAdministrativeAreaLevel1Resolver>(CommonCreateAdministrativeAreaLevel1Resolver);
        handler = module.get<CommonCreateAdministrativeAreaLevel1Handler>(CommonCreateAdministrativeAreaLevel1Handler);
    });

    test('CommonCreateAdministrativeAreaLevel1Resolver should be defined', () =>
    {
        expect(resolver).toBeDefined();
    });

    describe('main', () =>
    {
        test('CommonCreateAdministrativeAreaLevel1Resolver should be defined', () =>
        {
            expect(resolver).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await resolver.main(<CommonCreateAdministrativeAreaLevel1Input>administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});