/* eslint-disable key-spacing */
import { OAuthCreateApplicationsCommand } from '@app/o-auth/application';
import { OAuthCreateApplicationsService } from '@app/o-auth/application/application/create/o-auth-create-applications.service';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
} from '@app/o-auth/application/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(OAuthCreateApplicationsCommand)
export class OAuthCreateApplicationsCommandHandler
    implements ICommandHandler<OAuthCreateApplicationsCommand>
{
    constructor(
        private readonly createApplicationsService: OAuthCreateApplicationsService,
    ) {}

    async execute(command: OAuthCreateApplicationsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createApplicationsService.main(
            command.payload.map((application) => {
                return {
                    id: new OAuthApplicationId(application.id),
                    code: new OAuthApplicationCode(application.code),
                    name: new OAuthApplicationName(application.name),
                    secret: new OAuthApplicationSecret(application.secret),
                    isMaster: new OAuthApplicationIsMaster(
                        application.isMaster,
                    ),
                    clientIds: new OAuthApplicationClientIds(
                        application.clientIds,
                    ),
                };
            }),
            command.cQMetadata,
        );
    }
}
