/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonUpdateAdministrativeAreaLevel1ByIdController } from './common-update-administrative-area-level-1-by-id.controller';
import { CommonUpdateAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-update-administrative-area-level-1-by-id.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonUpdateAdministrativeAreaLevel1ByIdController', () =>
{
    let controller: CommonUpdateAdministrativeAreaLevel1ByIdController;
    let handler: CommonUpdateAdministrativeAreaLevel1ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonUpdateAdministrativeAreaLevel1ByIdController,
            ],
            providers: [
                {
                    provide : CommonUpdateAdministrativeAreaLevel1ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonUpdateAdministrativeAreaLevel1ByIdController>(CommonUpdateAdministrativeAreaLevel1ByIdController);
        handler = module.get<CommonUpdateAdministrativeAreaLevel1ByIdHandler>(CommonUpdateAdministrativeAreaLevel1ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonUpdateAdministrativeAreaLevel1ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return a administrativeAreaLevel1 created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0])).toBe(administrativeAreasLevel1[0]);
        });
    });
});