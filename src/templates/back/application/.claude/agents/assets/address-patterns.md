# Address Patterns

Patrones para campos de dirección. Usar TODOS los campos del patrón o un subset
coherente según las necesidades del módulo.

## Full Address

Patrón completo para direcciones con soporte internacional, divisiones
administrativas y geocodificación:

```yaml
- name: addressLine1
  type: varchar
  maxLength: 255
  nullable: false
  description: |
    Primary street address line. Should include street number, street name, and
    any primary location identifiers. Required field for a complete address.
    Used in shipping labels, maps, and official documents. Example: "123 Main
    Street" or "Av. Reforma 500, Col. Centro". Cannot be empty.

- name: addressLine2
  type: varchar
  maxLength: 255
  nullable: true
  description: |
    Secondary street address line for additional location details. Can include
    apartment/suite/floor numbers, building names, or additional instructions
    (e.g., "Suite 200", "Building B, 3rd Floor", "c/o Receiving Department").
    NULL indicates no additional address details needed. Used to ensure accurate
    delivery and location identification.

- name: city
  type: varchar
  maxLength: 128
  nullable: false
  description: |
    City or municipality name. Required field for a complete address. Used in
    shipping, billing, and geographic analysis. Should be the official city name
    in local language. Examples: "New York", "Ciudad de México", "São Paulo".
    Combined with state/province and country for full location identification.

- name: postalCode
  type: varchar
  maxLength: 64
  nullable: true
  description: |
    Postal code, ZIP code, or postcode. Format varies by country (e.g., "10001"
    in US, "28001" in Spain, "SW1A 1AA" in UK). NULL indicates no postal code
    available (some countries or rural areas). Used for shipping cost
    calculation, delivery routing, and geographic analysis. Not strictly
    validated to accommodate international formats.

- name: countryId
  type: id
  nullable: false
  index: index
  relationship:
    type: many-to-one
    aggregateName: CommonCountry
    modulePath: common/country
    key: id
    field: country
    avoidConstraint: true
  description: |
    Foreign key reference to the country from the common bounded context.
    Required field specifying which country this address is located in. Used for
    international shipping, tax calculations, and geographic reporting. Links to
    common/country module for standardized country data. Constraint avoided to
    prevent circular dependencies across bounded contexts.
  webComponent:
    type: select

- name: administrativeAreaLevel1Id
  type: id
  nullable: true
  index: index
  indexName: {bc}_{module}_admin_area_lvl1_id
  relationship:
    type: many-to-one
    aggregateName: CommonAdministrativeAreaLevel1
    modulePath: common/administrative-area-level-1
    key: id
    field: administrativeAreaLevel1
    avoidConstraint: true
  description: |
    Foreign key reference to the first-level administrative division (state,
    province, region) from the common bounded context. NULL indicates not
    specified or not applicable. Used for regional analysis, shipping zones, and
    tax calculations. Examples: California (US state), Ontario (Canadian
    province), Cataluña (Spanish autonomous community). Links to
    common/administrative-area-level-1 module.
  webComponent:
    type: select

- name: administrativeAreaLevel2Id
  type: id
  nullable: true
  index: index
  indexName: {bc}_{module}_admin_area_lvl2_id
  relationship:
    type: many-to-one
    aggregateName: CommonAdministrativeAreaLevel2
    modulePath: common/administrative-area-level-2
    key: id
    field: administrativeAreaLevel2
    avoidConstraint: true
  description: |
    Foreign key reference to the second-level administrative division (county,
    district, comarca) from the common bounded context. NULL indicates not
    specified or not applicable. Used for detailed regional analysis and local
    regulations. Examples: Los Angeles County (US), Greater London (UK). Links
    to common/administrative-area-level-2 module.
  webComponent:
    type: select

- name: administrativeAreaLevel3Id
  type: id
  nullable: true
  index: index
  indexName: {bc}_{module}_admin_area_lvl3_id
  relationship:
    type: many-to-one
    aggregateName: CommonAdministrativeAreaLevel3
    modulePath: common/administrative-area-level-3
    key: id
    field: administrativeAreaLevel3
    avoidConstraint: true
  description: |
    Foreign key reference to the third-level administrative division
    (municipality, township, city district) from the common bounded context.
    NULL indicates not specified or not applicable. Used for precise local
    identification and municipal-level regulations. Examples: Manhattan (NYC
    borough), Coyoacán (Mexico City borough). Links to
    common/administrative-area-level-3 module.
  webComponent:
    type: select

- name: latitude
  type: decimal
  decimals: [16, 14]
  nullable: true
  description: |
    Geographic latitude coordinate in decimal degrees format. Range: -90 to +90.
    NULL indicates coordinates not geocoded. Used for mapping, distance
    calculations, and location-based services. Example: 40.7128 (New York City).
    High precision (14 decimals) for accurate positioning. Should be populated
    through geocoding services when possible.

- name: longitude
  type: decimal
  decimals: [17, 14]
  nullable: true
  description: |
    Geographic longitude coordinate in decimal degrees format. Range: -180 to
    +180. NULL indicates coordinates not geocoded. Used for mapping, distance
    calculations, and route optimization. Example: -74.0060 (New York City).
    High precision (14 decimals) for accurate positioning. Should be populated
    through geocoding services when possible.
```

### Notas sobre indexName

El `indexName` usa placeholders `{bc}` y `{module}` que deben reemplazarse con
abreviaturas del bounded context y módulo para respetar el límite de 63
caracteres de PostgreSQL.

**Ejemplo para `business-partner-portal/partner-address`:**

- `{bc}` → `bpp`
- `{module}` → `partner_addr`
- Resultado: `bpp_partner_addr_admin_area_lvl1_id`

## Simple Address (Minimal)

Subset mínimo para direcciones simples sin divisiones administrativas ni
geocodificación:

```yaml
- name: addressLine1
  type: varchar
  maxLength: 255
  nullable: false
  description: |
    Primary street address line. Should include street number and street name.
    Required field for a complete address.

- name: addressLine2
  type: varchar
  maxLength: 255
  nullable: true
  description: |
    Secondary address line for apartment, suite, or building details. NULL
    indicates no additional details needed.

- name: city
  type: varchar
  maxLength: 128
  nullable: false
  description: |
    City or municipality name. Required field for a complete address.

- name: postalCode
  type: varchar
  maxLength: 64
  nullable: true
  description: |
    Postal code or ZIP code. Format varies by country. NULL if not available.

- name: countryId
  type: id
  nullable: false
  index: index
  relationship:
    type: many-to-one
    aggregateName: CommonCountry
    modulePath: common/country
    key: id
    field: country
    avoidConstraint: true
  description: |
    Foreign key to country. Links to common/country module.
  webComponent:
    type: select
```
