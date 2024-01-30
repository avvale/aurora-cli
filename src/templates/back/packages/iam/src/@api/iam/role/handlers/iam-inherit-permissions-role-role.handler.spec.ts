/* eslint-disable @typescript-eslint/no-unused-vars */
import { IamInheritPermissionsRoleRoleHandler } from './iam-inherit-permissions-role-role.handler';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Test, TestingModule } from '@nestjs/testing';

describe('IamInheritPermissionsRoleRoleHandler', () =>
{
    let handler: IamInheritPermissionsRoleRoleHandler;
    let queryBus: IQueryBus;
    let commandBus: ICommandBus;

    beforeAll(async () =>
    {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
            ],
            providers: [
                IamInheritPermissionsRoleRoleHandler,
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

        handler     = module.get<IamInheritPermissionsRoleRoleHandler>(IamInheritPermissionsRoleRoleHandler);
        queryBus    = module.get<IQueryBus>(IQueryBus);
        commandBus  = module.get<ICommandBus>(ICommandBus);
    });

    describe('main', () =>
    {
        test('IamInheritPermissionsRoleRoleHandler should be defined', () =>
        {
            expect(handler).toBeDefined();
        });
    });
});