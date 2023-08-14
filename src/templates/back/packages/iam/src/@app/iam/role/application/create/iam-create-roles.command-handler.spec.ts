/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';

// custom items
import { iamMockRoleData } from '@app/iam/role/infrastructure/mock/iam-mock-role.data';
import { IamCreateRolesCommandHandler } from './iam-create-roles.command-handler';
import { IamCreateRolesCommand } from './iam-create-roles.command';
import { IamCreateRolesService } from './iam-create-roles.service';

describe('iamCreateRolesCommandHandler', () =>
{
    let commandHandler: IamCreateRolesCommandHandler;
    let service: IamCreateRolesService;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IamCreateRolesCommandHandler,
                {
                    provide : IamCreateRolesService,
                    useValue: {
                        main: () => { /**/ },
                    },
                },
            ],
        })
            .compile();

        commandHandler = module.get<IamCreateRolesCommandHandler>(IamCreateRolesCommandHandler);
        service = module.get<IamCreateRolesService>(IamCreateRolesService);
    });

    describe('main', () =>
    {
        test('IamCreateRolesCommandHandler should be defined', () =>
        {
            expect(commandHandler).toBeDefined();
        });

        test('should return IamMockRoleData createds', async () =>
        {
            expect(await commandHandler.execute(
                new IamCreateRolesCommand(
                    iamMockRoleData,
                    { timezone: process.env.TZ },
                ),
            )).toBe(undefined);
        });
    });
});
