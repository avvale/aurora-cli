/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel2ByIdController } from './common-update-administrative-area-level-2-by-id.controller';
import { CommonUpdateAdministrativeAreaLevel2ByIdHandler } from '../handlers/common-update-administrative-area-level-2-by-id.handler';

// sources
import { administrativeAreasLevel2 } from '@app/common/administrative-area-level-2/infrastructure/seeds/administrative-area-level-2.seed';

describe('CommonUpdateAdministrativeAreaLevel2ByIdController', () =>
{
    let controller: CommonUpdateAdministrativeAreaLevel2ByIdController;
    let handler: CommonUpdateAdministrativeAreaLevel2ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreaLevel2ByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreaLevel2ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreaLevel2ByIdController>(CommonUpdateAdministrativeAreaLevel2ByIdController);
        handler = module.get<CommonUpdateAdministrativeAreaLevel2ByIdHandler>(CommonUpdateAdministrativeAreaLevel2ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel2ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel2 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel2[0])));
            expect(await controller.main(administrativeAreasLevel2[0])).toBe(administrativeAreasLevel2[0]);
        });
    });
});