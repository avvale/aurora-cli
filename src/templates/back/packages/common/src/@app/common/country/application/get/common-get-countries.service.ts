/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCountry, CommonICountryRepository } from '@app/common/country';
import { CQMetadata, LiteralObject, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonGetCountriesService {
  constructor(private readonly repository: CommonICountryRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonCountry[] | LiteralObject[]> {
    return await this.repository.get({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
