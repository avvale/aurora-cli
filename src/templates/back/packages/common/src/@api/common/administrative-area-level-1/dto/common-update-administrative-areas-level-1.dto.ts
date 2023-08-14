/* eslint-disable indent */
import { CommonAdministrativeAreaLevel1MapType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAdministrativeAreasLevel1Dto
{
    @ApiProperty({
        type       : String,
        description: 'id [input here api field description]',
    })
    id?: string;

    @ApiProperty({
        type       : String,
        description: 'countryId [input here api field description]',
        example    : 'f117d0ca-6c95-5bdd-9e9d-ffa16c621e74',
    })
    countryId?: string;

    @ApiProperty({
        type       : String,
        description: 'code [input here api field description]',
    })
    code?: string;

    @ApiProperty({
        type       : String,
        description: 'customCode [input here api field description]',
    })
    customCode?: string;

    @ApiProperty({
        type       : String,
        description: 'name [input here api field description]',
    })
    name?: string;

    @ApiProperty({
        type       : String,
        description: 'slug [input here api field description]',
    })
    slug?: string;

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
        type       : CommonAdministrativeAreaLevel1MapType,
        enum       : ['ROADMAP','SATELLITE','HYBRID','TERRAIN'],
        description: 'mapType [input here api field description]',
        example    : CommonAdministrativeAreaLevel1MapType.TERRAIN,
    })
    mapType?: CommonAdministrativeAreaLevel1MapType;

}
