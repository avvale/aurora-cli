import { IamAddPermissionsContextEvent, IamIPermissionRepository } from '@app/iam/permission';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeletePermissionsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamIPermissionRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // get objects to delete
        const permissions = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        if (permissions.length === 0) return;

        await this.repository.delete({
            queryStatement,
            constraint,
            cQMetadata,
            deleteOptions: cQMetadata?.repositoryOptions,
        });

        // create AddPermissionsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const permissionsRegistered = this.publisher.mergeObjectContext(
            new IamAddPermissionsContextEvent(
                permissions,
                cQMetadata,
            ),
        );

        permissionsRegistered.deleted(); // apply event to model events
        permissionsRegistered.commit(); // commit all events of model
    }
}
