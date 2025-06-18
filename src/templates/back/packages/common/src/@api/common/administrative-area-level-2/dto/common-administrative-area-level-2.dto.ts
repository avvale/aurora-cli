/* eslint-disable indent */
import { CommonAdministrativeAreaLevel1Dto } from '@api/common/administrative-area-level-1';
import { CommonCountryDto } from '@api/common/country';
import { CommonAdministrativeAreaLevel1MapType, CommonAdministrativeAreaLevel2MapType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonAdministrativeAreaLevel2Dto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : 'f117d0ca-6c95-5bdd-9e9d-ffa16c621e74',
    })
    countryId: string;

    @ApiProperty({
        type       : () => CommonCountryDto,
        description: 'CommonCountry [input here api field description]',
    })
    country?: CommonCountryDto;

    @ApiProperty({
        type       : String,
        description: 'administrativeAreaLevel1Id [input here api field description]',
        example    : '018e2f70-60e0-5606-89d2-9380ed78e8ff',
    })
    administrativeAreaLevel1Id: string;

    @ApiProperty({
        type       : () => CommonAdministrativeAreaLevel1Dto,
        description: 'CommonAdministrativeAreaLevel1 [input here api field description]',
    })
    administrativeAreaLevel1?: CommonAdministrativeAreaLevel1Dto;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug: string;

    @ApiProperty({
        type       : Number,
        description: 'latitude [input here api field description]',
    })
    latitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'longitude [input here api field description]',
    })
    longitude?: number;

    @ApiProperty({
        type       : Number,
        description: 'zoom [input here api field description]',
    })
    zoom?: number;

    @ApiProperty({
        enum       : CommonAdministrativeAreaLevel2MapType,
        enumName   : 'CommonAdministrativeAreaLevel2MapType',
        description: 'mapType [input here api field description]',
        example    : CommonAdministrativeAreaLevel1MapType.TERRAIN,
    })
    mapType?: CommonAdministrativeAreaLevel2MapType;

    @ApiProperty({
        type       : String,
        description: 'createdAt [input here api field description]',
    })
    createdAt?: string;

    @ApiProperty({
        type       : String,
        description: 'updatedAt [input here api field description]',
    })
    updatedAt?: string;

    @ApiProperty({
        type       : String,
        description: 'deletedAt [input here api field description]',
    })
    deletedAt?: string;

}
