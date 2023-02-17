import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SideEffectResponse } from '../../domain/side-effect.response';
import { SideEffectMapper } from '../../domain/side-effect.mapper';
import { FindSideEffectQuery } from './find-side-effect.query';
import { FindSideEffectService } from './find-side-effect.service';

@QueryHandler(FindSideEffectQuery)
export class FindSideEffectQueryHandler implements IQueryHandler<FindSideEffectQuery>
{
    private readonly mapper: SideEffectMapper = new SideEffectMapper();

    constructor(
        private readonly findSideEffectService: FindSideEffectService,
    ) {}

    async execute(query: FindSideEffectQuery): Promise<SideEffectResponse>
    {
        const sideEffect = await this.findSideEffectService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(sideEffect);
    }
}