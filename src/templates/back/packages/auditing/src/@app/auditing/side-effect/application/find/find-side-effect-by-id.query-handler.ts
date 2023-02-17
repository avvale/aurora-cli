import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SideEffectResponse } from '../../domain/side-effect.response';
import { SideEffectMapper } from '../../domain/side-effect.mapper';
import { SideEffectId } from '../../domain/value-objects';
import { FindSideEffectByIdQuery } from './find-side-effect-by-id.query';
import { FindSideEffectByIdService } from './find-side-effect-by-id.service';

@QueryHandler(FindSideEffectByIdQuery)
export class FindSideEffectByIdQueryHandler implements IQueryHandler<FindSideEffectByIdQuery>
{
    private readonly mapper: SideEffectMapper = new SideEffectMapper();

    constructor(
        private readonly findSideEffectByIdService: FindSideEffectByIdService,
    ) {}

    async execute(query: FindSideEffectByIdQuery): Promise<SideEffectResponse>
    {
        const sideEffect = await this.findSideEffectByIdService.main(
            new SideEffectId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(sideEffect);
    }
}