import { Injectable } from '@nestjs/common';
import { ICommandBus, IQueryBus } from '@aurora-ts/core';

//
import { CreateApplicationsCommand } from '@app/o-auth/application/application/create/create-applications.command';
import { applications } from '@app/o-auth/application/infrastructure/mock/mock-application.data';

@Injectable()
export class OAuthApplicationSeeder
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(): Promise<boolean>
    {
        await this.commandBus.dispatch(new CreateApplicationsCommand(
            applications,
            {
                timezone: process.env.TZ ,
            },
        ));

        return true;
    }
}