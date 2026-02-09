# Phone Patterns

Patrones para campos de teléfono. Usar TODOS los campos del patrón, no solo el
principal.

## Mobile Phone

Usar cuando se necesite almacenar un número de teléfono móvil:

```yaml
- name: mobile
  type: varchar
  length: 64
  nullable: true
  description: >
    Mobile phone number with full formatting including country prefix (e.g., +54
    9 11 1234-5678). Used for display purposes and user-facing interfaces.

- name: mobileCountryPrefix
  type: varchar
  length: 4
  nullable: true
  description: >
    Country calling code without the plus sign (e.g., 54 for Argentina, 1 for
    USA). Used to identify the country for SMS routing and validation rules.

- name: mobileSanitized
  type: varchar
  length: 64
  nullable: true
  hidden: true
  description: >
    Mobile number stripped of all formatting, containing only digits (e.g.,
    5491112345678). Used for API integrations, SMS gateways, and WhatsApp
    Business API. Hidden from GraphQL responses.
```

## Landline Phone

Usar cuando se necesite almacenar un número de teléfono fijo:

```yaml
- name: phone
  type: varchar
  length: 64
  nullable: true
  description: >
    Landline phone number with full formatting including country and area codes
    (e.g., +54 11 4567-8901). Used for display purposes and user-facing
    interfaces.

- name: phoneCountryPrefix
  type: varchar
  length: 4
  nullable: true
  description: >
    Country calling code without the plus sign (e.g., 54 for Argentina, 1 for
    USA). Used to identify the country for call routing and validation rules.

- name: phoneSanitized
  type: varchar
  length: 64
  nullable: true
  hidden: true
  description: >
    Landline number stripped of all formatting, containing only digits (e.g.,
    541145678901). Used for telephony API integrations and automated dialing
    systems. Hidden from GraphQL responses.
```
