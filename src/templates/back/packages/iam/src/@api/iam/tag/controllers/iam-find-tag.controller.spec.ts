import { IamFindTagController, IamFindTagHandler } from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamFindTagController', () => {
    let controller: IamFindTagController;
    let handler: IamFindTagHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamFindTagController],
            providers: [
                {
                    provide: IamFindTagHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamFindTagController>(IamFindTagController);
        handler = module.get<IamFindTagHandler>(IamFindTagHandler);
    });

    describe('main', () => {
        test('IamFindTagController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a tag', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTagData[0])),
            );
            expect(await controller.main()).toBe(iamMockTagData[0]);
        });
    });
});
