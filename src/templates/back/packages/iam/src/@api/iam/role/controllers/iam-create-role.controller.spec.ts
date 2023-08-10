import { IamCreateRoleController, IamCreateRoleHandler } from '@api/iam/role';
import { iamMockRoleData } from '@app/iam/role';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamCreateRoleController', () =>
{
    let controller: IamCreateRoleController;
    let handler: IamCreateRoleHandler;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            controllers: [
                IamCreateRoleController,
            ],
            providers: [
                {
                    provide : IamCreateRoleHandler,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        controller = module.get<IamCreateRoleController>(IamCreateRoleController);
        handler = module.get<IamCreateRoleHandler>(IamCreateRoleHandler);
    });

    describe('main', () =>
    {
        test('IamCreateRoleController should be defined', () =>
        {
            expect(controller).toBeDefined();
        });

        test('should return an role created', async () =>
        {
            jest.spyOn(handler, 'main').mockImplementation(() => new Promise(resolve => resolve(iamMockRoleData[0])));
            expect(
                await controller.main(
                    iamMockRoleData[0],
                ),
            )
                .toBe(iamMockRoleData[0]);
        });
    });
});
