/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OAuthCreateApplicationsCommand } from './o-auth-create-applications.command';
import { OAuthCreateApplicationsService } from './o-auth-create-applications.service';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(OAuthCreateApplicationsCommand)
export class OAuthCreateApplicationsCommandHandler implements ICommandHandler<OAuthCreateApplicationsCommand>
{
    constructor(
        private readonly createApplicationsService: OAuthCreateApplicationsService,
    ) {}

    async execute(command: OAuthCreateApplicationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createApplicationsService.main(
            command.payload
                .map(application =>
                {
                    return {
                        id: new OAuthApplicationId(application.id),
                        code: new OAuthApplicationCode(application.code),
                        name: new OAuthApplicationName(application.name),
                        secret: new OAuthApplicationSecret(application.secret),
                        isMaster: new OAuthApplicationIsMaster(application.isMaster),
                        clientIds: new OAuthApplicationClientIds(application.clientIds),
                    };
                }),
            command.cQMetadata,
        );
    }
}
