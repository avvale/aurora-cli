import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SideEffectResponse } from '../../domain/side-effect.response';
import { SideEffectMapper } from '../../domain/side-effect.mapper';
import { GetSideEffectsQuery } from './get-side-effects.query';
import { GetSideEffectsService } from './get-side-effects.service';

@QueryHandler(GetSideEffectsQuery)
export class GetSideEffectsQueryHandler implements IQueryHandler<GetSideEffectsQuery>
{
    private readonly mapper: SideEffectMapper = new SideEffectMapper();

    constructor(
        private readonly getSideEffectsService: GetSideEffectsService,
    ) {}

    async execute(query: GetSideEffectsQuery): Promise<SideEffectResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.getSideEffectsService.main(query.queryStatement, query.constraint, query.cQMetadata));
    }
}