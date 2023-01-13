/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonFindAdministrativeAreaLevel1ByIdController } from './common-find-administrative-area-level-1-by-id.controller';
import { CommonFindAdministrativeAreaLevel1ByIdHandler } from '../handlers/common-find-administrative-area-level-1-by-id.handler';

// sources
import { administrativeAreasLevel1 } from '@app/common/administrative-area-level-1/infrastructure/seeds/administrative-area-level-1.seed';

describe('CommonFindAdministrativeAreaLevel1ByIdController', () =>
{
    let controller: CommonFindAdministrativeAreaLevel1ByIdController;
    let handler: CommonFindAdministrativeAreaLevel1ByIdHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                CommonFindAdministrativeAreaLevel1ByIdController,
            ],
            providers: [
                {
                    provide : CommonFindAdministrativeAreaLevel1ByIdHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonFindAdministrativeAreaLevel1ByIdController>(CommonFindAdministrativeAreaLevel1ByIdController);
        handler = module.get<CommonFindAdministrativeAreaLevel1ByIdHandler>(CommonFindAdministrativeAreaLevel1ByIdHandler);
    });

    describe('main', () =>
    {
        test('CommonFindAdministrativeAreaLevel1ByIdController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an administrativeAreaLevel1 by id', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(administrativeAreasLevel1[0])));
            expect(await controller.main(administrativeAreasLevel1[0].id)).toBe(administrativeAreasLevel1[0]);
        });
    });
});