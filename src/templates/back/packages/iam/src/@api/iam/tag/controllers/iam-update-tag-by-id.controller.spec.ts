import {
    IamUpdateTagByIdController,
    IamUpdateTagByIdHandler,
} from '@api/iam/tag';
import { iamMockTagData } from '@app/iam/tag';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamUpdateTagByIdController', () => {
    let controller: IamUpdateTagByIdController;
    let handler: IamUpdateTagByIdHandler;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [],
            controllers: [IamUpdateTagByIdController],
            providers: [
                {
                    provide: IamUpdateTagByIdHandler,
                    useValue: {
                        main: () => {
                            /**/
                        },
                    },
                },
            ],
        }).compile();

        controller = module.get<IamUpdateTagByIdController>(
            IamUpdateTagByIdController,
        );
        handler = module.get<IamUpdateTagByIdHandler>(IamUpdateTagByIdHandler);
    });

    describe('main', () => {
        test('IamUpdateTagByIdController should be defined', () => {
            expect(controller).toBeDefined();
        });

        test('should return a tag updated', async () => {
            jest.spyOn(handler, 'main').mockImplementation(
                () => new Promise((resolve) => resolve(iamMockTagData[0])),
            );
            expect(await controller.main(iamMockTagData[0])).toBe(
                iamMockTagData[0],
            );
        });
    });
});
