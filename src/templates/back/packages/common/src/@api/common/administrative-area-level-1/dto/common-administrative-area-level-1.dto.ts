/* eslint-disable indent */
import { CommonCountryDto } from '@api/common/country';
import { CommonAdministrativeAreaLevel1MapType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonAdministrativeAreaLevel1Dto
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
        enum       : CommonAdministrativeAreaLevel1MapType,
        enumName   : 'CommonAdministrativeAreaLevel1MapType',
        description: 'mapType [input here api field description]',
        example    : CommonAdministrativeAreaLevel1MapType.TERRAIN,
    })
    mapType?: CommonAdministrativeAreaLevel1MapType;

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
