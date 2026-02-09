/**
 * @aurora-generated
 * @source cliter/common/country.aurora.yaml
 */
import { CommonCountry } from '@api/graphql';
import { CommonFindCountryByIdQuery } from '@app/common/country';
import {
  CoreAddI18nConstraintService,
  CoreGetSearchKeyLangService,
  IQueryBus,
  QueryStatement,
  Utils,
} from '@aurorajs.dev/core';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommonFindCountryByIdHandler {
  i18nColumns: string[] = [
    'rowId',
    'name',
    'slug',
    'administrativeAreaLevel1',
    'administrativeAreaLevel2',
    'administrativeAreaLevel3',
  ];
  i18nRelationship: string = 'countryI18n';
  i18nFunctionReplace = (key: string): string =>
    this.i18nColumns.includes(key) ? `$${this.i18nRelationship}.${key}$` : key;

  constructor(
    private readonly queryBus: IQueryBus,
    private readonly coreAddI18nConstraintService: CoreAddI18nConstraintService,
    private readonly coreGetSearchKeyLangService: CoreGetSearchKeyLangService,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
    contentLanguage?: string,
  ): Promise<CommonCountry> {
    if (!contentLanguage)
      throw new BadRequestException(
        'To find a multi-language object, the content-language header must be defined.',
      );

    constraint = await this.coreAddI18nConstraintService.add(
      constraint,
      this.i18nRelationship,
      contentLanguage,
      {
        searchKeyLang: this.coreGetSearchKeyLangService.get(),
      },
    );

    // Replace all i18n keys by $countryI18n.key$
    constraint = Utils.deepMapKeys(constraint, this.i18nFunctionReplace);

    const country = await this.queryBus.ask(
      new CommonFindCountryByIdQuery(id, constraint, {
        timezone,
      }),
    );

    if (!country) {
      throw new NotFoundException(`CommonCountry with id: ${id}, not found`);
    }

    return country;
  }
}
