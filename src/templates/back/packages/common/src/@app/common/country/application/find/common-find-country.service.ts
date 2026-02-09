/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCountry, CommonICountryRepository } from '@app/common/country';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonFindCountryService {
  constructor(private readonly repository: CommonICountryRepository) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    cQMetadata?: CQMetadata,
  ): Promise<CommonCountry> {
    return await this.repository.find({
      queryStatement,
      constraint,
      cQMetadata,
    });
  }
}
