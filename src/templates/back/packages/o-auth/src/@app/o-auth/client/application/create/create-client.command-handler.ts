/* eslint-disable key-spacing */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateClientCommand } from './create-client.command';
import { CreateClientService } from './create-client.service';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopeOptions,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from '../../domain/value-objects';

@CommandHandler(CreateClientCommand)
export class CreateClientCommandHandler implements ICommandHandler<CreateClientCommand>
{
    constructor(
        private readonly createClientService: CreateClientService,
    ) {}

    async execute(command: CreateClientCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createClientService.main(
            {
                id: new ClientId(command.payload.id),
                grantType: new ClientGrantType(command.payload.grantType),
                name: new ClientName(command.payload.name),
                secret: new ClientSecret(command.payload.secret),
                authUrl: new ClientAuthUrl(command.payload.authUrl),
                redirect: new ClientRedirect(command.payload.redirect),
                scopeOptions: new ClientScopeOptions(command.payload.scopeOptions),
                expiredAccessToken: new ClientExpiredAccessToken(command.payload.expiredAccessToken),
                expiredRefreshToken: new ClientExpiredRefreshToken(command.payload.expiredRefreshToken),
                isActive: new ClientIsActive(command.payload.isActive),
                isMaster: new ClientIsMaster(command.payload.isMaster),
                applicationIds: new ClientApplicationIds(command.payload.applicationIds),
            },
            command.cQMetadata,
        );
    }
}