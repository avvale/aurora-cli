import {
    IamBoundedContext,
    IamIBoundedContextRepository,
} from '@app/iam/bounded-context';
import { IamBoundedContextId } from '@app/iam/bounded-context/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamFindBoundedContextByIdService {
    constructor(private readonly repository: IamIBoundedContextRepository) {}

    async main(
        id: IamBoundedContextId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamBoundedContext> {
        return await this.repository.findById(id, {
            constraint,
            cQMetadata,
        });
    }
}
