---
id: purl-spec-schemas
title: Package-URL JSON Schemas
sidebar_label: Schemas
---

# Package-URL JSON Schemas


## PURL Type Definition

The **PURL Type Definition JSON Schema** is the reference data model that is used to define PURL types in a structured way.

Each PURL type is specified in a JSON document that matches this schema. These JSON documents are then used to generate PURL type documentation and to support PURL libraries and tools so that they can more easily parse, build, and validate PURLs by type in a consistent and standardized manner across programming languages and technology stacks.

**PURL Type Definition JSON Schema 1.0**

- <a href="https://github.com/package-url/purl-spec/blob/main/schemas/purl-type-definition.schema-1.0.json" target="_blank">JSON Schema</a> `↗`
- <a href="/schemas/purl-type-definition.schema-1.0.html" target="_blank">Interactive HTML</a> `↗`


## PURL Types Index

The **PURL Types Index Schema** is a simple list of each registered type.

**PURL Types Index Schema**

- <a href="https://github.com/package-url/purl-spec/blob/main/schemas/purl-types-index.schema.json" target="_blank">JSON Schema</a> `↗`
- <a href="/schemas/purl-types-index.schema-1.0.html" target="_blank">Interactive HTML</a> `↗`


## PURL Tests

The **PURL Test JSON Schema** provides the structure for test at two levels:

- Specification: These are tests for the specification across purl types The current set of specification test files are available on GitHub at: [https://github.com/package-url/purl-spec/tree/main/tests/spec/](https://github.com/package-url/purl-spec/tree/main/tests/spec/)

- Types: These tests are organized as one test file per PURL type. A PURL type test is required for adding or changing a purl type. The current set of PURL type test files are available on GitHub at: [https://github.com/package-url/purl-spec/tree/main/tests/types/](https://github.com/package-url/purl-spec/tree/main/tests/types/)

**PURL Test JSON Schema**

- <a href="https://github.com/package-url/purl-spec/blob/main/schemas/purl-test.schema.json" target="_blank">JSON Schema</a> `↗`
- <a href="/schemas/purl-test.schema.html" target="_blank">Interactive HTML</a> `↗`
