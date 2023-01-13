import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { CommonCreateLangsController } from './common-create-langs.controller';
import { CommonCreateLangsHandler } from '../handlers/common-create-langs.handler';

// sources
import { langs } from '@app/common/lang/infrastructure/seeds/lang.seed';

describe('CommonCreateLangsController', () =>
{
    let controller: CommonCreateLangsController;
    let handler: CommonCreateLangsHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [
                CommonCreateLangsController,
            ],
            providers: [
                {
                    provide : CommonCreateLangsHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<CommonCreateLangsController>(CommonCreateLangsController);
        handler = module.get<CommonCreateLangsHandler>(CommonCreateLangsHandler);
    });

    describe('main', () =>
    {
        test('CommonCreateLangsController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an langs created', async () =>
        {
            expect(await controller.main(langs)).toBe(undefined);
        });
    });
});