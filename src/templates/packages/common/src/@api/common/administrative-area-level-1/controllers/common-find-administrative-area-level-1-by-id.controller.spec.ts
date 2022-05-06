/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { ICommandBus, IQueryBus } from 'aurora-ts-core';

// custom items
import { CommonFindAdministrativeAreaLevel1ByIdController } from './common-find-administrative-area-level-1-by-id.controller';

// sources
import { administrativeAreasLevel1 } from '../../../../@apps/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonFindAdministrativeAreaLevel1ByIdController', () =>
{
    let controller: CommonFindAdministrativeAreaLevel1ByIdController;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAdministrativeAreaLevel1ByIdController
            ],
            providers: [
                {
                    provide : IQueryBus,
                    useValue: {
                        ask: () => { /**/ },
                    },
                },
                {
                    provide : ICommandBus,
                    useValue: {
                        dispatch: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller  = module.get<CommonFindAdministrativeAreaLevel1ByIdController>(CommonFindAdministrativeAreaLevel1ByIdController);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(queryBus, 'ask').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0].id)).toBe(administrativeAreasLevel1[0]);
        });
    });
});