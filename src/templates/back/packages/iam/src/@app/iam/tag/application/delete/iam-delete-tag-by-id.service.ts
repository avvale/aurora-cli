import { IamITagRepository } from '@app/iam/tag';
import { IamTagId } from '@app/iam/tag/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class IamDeleteTagByIdService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IamITagRepository,
    ) {}

    async main(
        id: IamTagId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // get object to delete
        const tag = await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });

        // it is not necessary to pass the constraint in the delete, if the object
        // is not found in the findById, an exception will be thrown.
        await this.repository.deleteById(tag.id, {
            deleteOptions: cQMetadata?.repositoryOptions,
            cQMetadata,
        });

        // insert EventBus in object, to be able to apply and commit events
        const tagRegister = this.publisher.mergeObjectContext(tag);

        tagRegister.deleted({
            payload: tag,
            cQMetadata,
        }); // apply event to model events
        tagRegister.commit(); // commit all events of model
    }
}
