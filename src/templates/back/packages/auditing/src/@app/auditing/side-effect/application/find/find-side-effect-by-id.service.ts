import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { ISideEffectRepository } from '../../domain/side-effect.repository';
import { AuditingSideEffect } from '../../domain/side-effect.aggregate';
import { SideEffectId } from '../../domain/value-objects';

@Injectable()
export class FindSideEffectByIdService
{
    constructor(
        private readonly repository: ISideEffectRepository,
    ) {}

    async main(
        id: SideEffectId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<AuditingSideEffect>
    {
        return await this.repository.findById(
            id,
            {
                constraint,
                cQMetadata,
            },
        );
    }
}