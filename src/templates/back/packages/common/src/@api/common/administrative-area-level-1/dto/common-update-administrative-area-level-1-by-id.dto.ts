/**
 * @aurora-generated
 * @source cliter/common/administrative-area-level-1.aurora.yaml
 */
import { CommonAdministrativeAreaLevel1MapType } from '@api/graphql';
import { ApiProperty } from '@nestjs/swagger';

export class CommonUpdateAdministrativeAreaLevel1ByIdDto {
  @ApiProperty({
    type: String,
    description:
      'Unique identifier for the administrative area level 1. UUID v4 format, generated automatically on creation.',
  })
  id: string;

  @ApiProperty({
    type: String,
    description:
      'Foreign key to the country this administrative area belongs to. Establishes parent-child relationship in geographical hierarchy.',
    example: 'f117d0ca-6c95-5bdd-9e9d-ffa16c621e74',
  })
  countryId?: string;

  @ApiProperty({
    type: String,
    description:
      'Standard code for the administrative area (e.g., &quot;CA&quot; for California, &quot;TX&quot; for Texas). Must be unique across all level 1 areas. Maximum 8 characters.',
  })
  code?: string;

  @ApiProperty({
    type: String,
    description:
      'Optional custom code defined by the organization for internal identification. Must be unique if provided. Can be used for legacy system integration or custom business logic.',
  })
  customCode?: string;

  @ApiProperty({
    type: String,
    description:
      'Full name of the administrative area (e.g., &quot;California&quot;, &quot;Texas&quot;, &quot;Ontario&quot;). Indexed for efficient searching and sorting.',
  })
  name?: string;

  @ApiProperty({
    type: String,
    description:
      'URL-friendly identifier derived from the name. Lowercase, hyphenated format (e.g., &quot;california&quot;, &quot;new-york&quot;). Used for SEO-friendly URLs and routing.',
  })
  slug?: string;

  @ApiProperty({
    type: Number,
    description:
      'Geographical latitude coordinate of the administrative area&#x27;s center point. Precision of 14 decimal places allows sub-meter accuracy. Used for map visualization and distance calculations.',
  })
  latitude?: number;

  @ApiProperty({
    type: Number,
    description:
      'Geographical longitude coordinate of the administrative area&#x27;s center point. Precision of 14 decimal places allows sub-meter accuracy. Used for map visualization and distance calculations.',
  })
  longitude?: number;

  @ApiProperty({
    type: Number,
    description:
      'Default zoom level for map display when viewing this administrative area. Typical range: 1 (world view) to 21 (building level). Determines initial map scale in UI.',
  })
  zoom?: number;

  @ApiProperty({
    enum: CommonAdministrativeAreaLevel1MapType,
    description:
      'Preferred map visualization type for this area. ROADMAP: Street map view. SATELLITE: Aerial imagery. HYBRID: Satellite with road overlay. TERRAIN: Topographic relief map. NULL uses system default.',
    example: CommonAdministrativeAreaLevel1MapType.TERRAIN,
  })
  mapType?: CommonAdministrativeAreaLevel1MapType;
}
