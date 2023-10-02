import { Injectable } from '@angular/core';
import { DocumentNode } from '@apollo/client/core';
import { GraphQLHeaders, GraphQLService } from '@aurora';
import { AdministrativeAreaLevel1Service } from 'app/modules/admin/apps/common/administrative-area-level-1/administrative-area-level-1.service';
import { AdministrativeAreaLevel2Service } from 'app/modules/admin/apps/common/administrative-area-level-2/administrative-area-level-2.service';
import { AdministrativeAreaLevel3Service } from 'app/modules/admin/apps/common/administrative-area-level-3/administrative-area-level-3.service';
import { CommonAdministrativeAreaLevel1, CommonAdministrativeAreaLevel2, CommonAdministrativeAreaLevel3, CommonCountry } from 'app/modules/admin/apps/common/common.types';
import { CountryService } from 'app/modules/admin/apps/common/country/country.service';
import gql from 'graphql-tag';
import { Observable, first, map, tap } from 'rxjs';

export const findAdministrativeAreasQuery = gql`
    query CommonFindAdministrativeAreas (
        $countryId: GraphQLString!
        $administrativeAreaLevel1Id: GraphQLString
        $administrativeAreaLevel2Id: GraphQLString
    ) {
        commonAdministrativeAreasCountry (
            countryId: $countryId
            administrativeAreaLevel1Id: $administrativeAreaLevel1Id
            administrativeAreaLevel2Id: $administrativeAreaLevel2Id
        ) {
            commonCountry {
                id
                name
                administrativeAreaLevel1
                administrativeAreaLevel2
                administrativeAreaLevel3
            }
            commonGetAdministrativeAreasLevel1 {
                id
                name
            }
            commonGetAdministrativeAreasLevel2 {
                id
                name
            }
            commonGetAdministrativeAreasLevel3 {
                id
                name
            }
        }
    }
`;

@Injectable({
    providedIn: 'root',
})
export class AdministrativeAreasService
{
    constructor(
        private readonly graphqlService: GraphQLService,
        private readonly countryService: CountryService,
        private readonly administrativeAreaLevel1Service: AdministrativeAreaLevel1Service,
        private readonly administrativeAreaLevel2Service: AdministrativeAreaLevel2Service,
        private readonly administrativeAreaLevel3Service: AdministrativeAreaLevel3Service,
    )
    { }

    resetAdministrativeAreas(): void
    {
        this.administrativeAreaLevel1Service.administrativeAreasLevel1Subject$.next(null);
        this.administrativeAreaLevel2Service.administrativeAreasLevel2Subject$.next(null);
        this.administrativeAreaLevel3Service.administrativeAreasLevel3Subject$.next(null);
    }

    findAdministrativeAreas(
        {
            graphqlStatement = findAdministrativeAreasQuery,
            countryId = '',
            administrativeAreaLevel1Id = '',
            administrativeAreaLevel2Id = '',
            headers = {},
        }: {
            graphqlStatement?: DocumentNode;
            countryId?: string;
            administrativeAreaLevel1Id?: string;
            administrativeAreaLevel2Id?: string;
            headers?: GraphQLHeaders;
        } = {},
    ): Observable<{
        commonCountry: CommonCountry;
        commonGetAdministrativeAreasLevel1: CommonAdministrativeAreaLevel1[];
        commonGetAdministrativeAreasLevel2: CommonAdministrativeAreaLevel2[];
        commonGetAdministrativeAreasLevel3: CommonAdministrativeAreaLevel3[];
    }>
    {
        return this.graphqlService
            .client()
            .watchQuery<{
                commonAdministrativeAreasCountry: any;
            }>({
                query    : graphqlStatement,
                variables: {
                    countryId,
                    administrativeAreaLevel1Id,
                    administrativeAreaLevel2Id,
                },
                context: {
                    headers,
                },
            })
            .valueChanges
            .pipe(
                first(),
                map(response => response.data.commonAdministrativeAreasCountry),
                tap(data =>
                {
                    this.countryService.countrySubject$.next(data.commonCountry);
                    this.administrativeAreaLevel1Service.administrativeAreasLevel1Subject$.next(data.commonGetAdministrativeAreasLevel1);
                    this.administrativeAreaLevel2Service.administrativeAreasLevel2Subject$.next(data.commonGetAdministrativeAreasLevel2);
                    this.administrativeAreaLevel3Service.administrativeAreasLevel3Subject$.next(data.commonGetAdministrativeAreasLevel3);
                }),
            );
    }
}
