# Playwright Framework Generator

## Phase-Wise Implementation Document

## 1. Objective

The objective is to build a reusable system that can generate a client-ready Playwright framework architecture from a finalized test strategy document.

Instead of manually creating folders, configuration, reporting, utilities, fixtures, and starter tests for every new client project, the proposed system will:

- accept a test strategy as the primary input
- analyze it using an LLM-driven orchestration layer
- convert it into a structured framework blueprint
- select the right framework template
- generate the project structure into a target workspace
- optionally inspect the target application and enrich the framework with starter Playwright artifacts

This approach reduces bootstrap effort, improves standardization, and keeps the generated framework extensible for automation engineers.

## 2. Problem Statement

In many automation projects, a significant amount of time is spent on initial setup work such as:

- creating the folder structure
- defining config and environment strategy
- setting up reporting
- preparing utilities and helpers
- organizing page objects or component objects
- wiring test data, hooks, fixtures, and CI basics

This effort is repeated across projects even though much of the architecture is conceptually similar. The goal is to productize this setup into a framework generator driven by the project test strategy.

## 3. Proposed Solution

The correct solution is not a direct chain of `LLM -> filesystem MCP -> Playwright MCP`.

The correct implementation is:

- one central orchestration layer
- one structured blueprint as the source of truth
- MCP servers used as controlled tools
- deterministic template generation wherever possible
- Playwright MCP used mainly for app inspection and validation, not as the architecture engine

## 4. High-Level Architecture

```text
Test Strategy
  -> Strategy Intake
  -> Semantic Kernel Orchestrator
  -> Structured Blueprint
  -> Template Selector
  -> Scaffold Generator
  -> Filesystem MCP
  -> Generated Playwright Framework
  -> Playwright MCP Validation / Enrichment
  -> Final Client-Ready Project
```

## 5. Core Components

### 5.1 Test Strategy Input

This is the primary business and testing input. It may include:

- project scope
- application type
- test approach
- environments
- tooling expectations
- reporting needs
- quality gates
- accessibility or visual requirements
- CI/CD expectations

### 5.2 Semantic Kernel Orchestrator

Semantic Kernel should act as the central orchestrator that:

- invokes the LLM
- parses the strategy
- applies transformation rules
- selects the correct template family
- coordinates tool calls
- manages approval checkpoints

### 5.3 Structured Blueprint

The strategy must be normalized into a strict machine-readable format such as:

- `framework-blueprint.json`

This becomes the source of truth for generation.

Example blueprint fields:

- project type
- web or UI or API coverage
- BDD or non-BDD
- TypeScript or JavaScript
- environment model
- reporting model
- auth strategy
- test data strategy
- accessibility requirements
- visual validation requirements
- CI requirements
- required framework modules

### 5.4 Template Registry

A template registry maps blueprint needs to the correct framework family.

Suggested initial template families:

- `basic-playwright`
- `playwright-bdd`
- `playwright-enterprise`

Later additions:

- `playwright-ui-api`
- `playwright-visual-a11y`
- `playwright-mobile-web`

### 5.5 Filesystem MCP Server

The filesystem MCP server should be used only for controlled file generation tasks:

- create folders
- write files
- copy templates
- fill placeholders

It must be restricted to the target workspace only.

### 5.6 Playwright MCP Server

Playwright MCP should be used after scaffold generation for:

- inspecting the target application
- capturing accessibility-based structure
- identifying page contracts
- generating sample smoke flows
- validating starter selectors or component/page models

It should not be the primary architecture generator.

## 6. Phase-Wise Implementation

## Phase 1: Strategy Intake and Blueprint Generation

### Objective

Convert a finalized test strategy into a strict structured blueprint.

### Flow

```text
Test Strategy Document
  -> Intake Service
  -> Semantic Kernel
  -> Strategy Parsing
  -> Validation Rules
  -> framework-blueprint.json
```

### Scope

- accept input in `.md`, `.pdf`, or `.docx`
- extract meaningful strategy details
- convert free text into structured fields
- validate completeness
- identify missing or ambiguous decisions

### Deliverables

- `strategy-schema.json`
- `framework-blueprint.json`
- `generation-report.md`

### Key Rules

- no framework generation should happen before blueprint approval
- the LLM output must be schema-validated
- any unresolved ambiguity must be surfaced as an assumption or open item

### Recommended Tools

- `Python`
- `Semantic Kernel`
- `Azure OpenAI` or `OpenAI API`
- `Pydantic` or JSON schema validation
- document parsing library for `.pdf` and `.docx`

### Output Example

```json
{
  "frameworkType": "playwright-enterprise",
  "language": "typescript",
  "testStyle": "non-bdd",
  "reporting": ["html", "custom-summary"],
  "modules": ["pages", "components", "fixtures", "utils", "api", "a11y"],
  "environments": ["qa", "uat", "prod-like"],
  "ci": true
}
```

## Phase 2: Template Selection and Scaffold Generation

### Objective

Generate a framework using approved templates and deterministic rendering.

### Flow

```text
framework-blueprint.json
  -> Template Selector
  -> Template Engine
  -> Filesystem MCP
  -> Generated Project Structure
```

### Scope

- pick the correct template family
- inject placeholders
- include only required modules
- generate baseline configuration and project structure

### Deliverables

- generated repository structure
- generation manifest
- initialized config and docs

### Key Rules

- prefer deterministic file rendering over free-form code generation
- templates must remain modular
- every generated module should be independently maintainable

### Recommended Tools

- `Jinja2` or similar template rendering engine
- local template registry in `JSON` or `YAML`
- filesystem MCP server
- git initialization as optional post-step

### Initial Template Modules

- `config/`
- `fixtures/`
- `pages/`
- `components/`
- `utils/`
- `api/`
- `test-data/`
- `tests/`
- `reporting/`
- `docs/`
- `.env.example`
- CI pipeline samples

## Phase 3: Application Analysis and Framework Enrichment

### Objective

Use Playwright-based inspection to enrich the generated framework with application-aware starter artifacts.

### Flow

```text
Generated Framework + App URL
  -> Semantic Kernel
  -> Playwright MCP
  -> App Inspection
  -> Accessibility Contract Discovery
  -> Starter Pages / Components / Smoke Tests
```

### Scope

- inspect target application flows
- identify stable accessibility-based contracts
- propose page objects or component objects
- generate initial smoke tests
- create contract validation checks

### Deliverables

- starter smoke suite
- starter page/component models
- app assumptions report
- selector contract summary

### Key Rules

- Playwright MCP should enrich, not replace the scaffold generator
- accessibility-first contracts should be preferred
- fallback test IDs may be suggested where the app lacks stable accessible naming

### Recommended Tools

- Playwright MCP
- Playwright test runner
- accessibility-based locator strategy
- optional accessibility scan integration such as `axe-core`

## Phase 4: Validation, Quality Gates, and Reporting

### Objective

Ensure the generated project is usable, consistent, and production-worthy.

### Flow

```text
Generated Project
  -> Static Validation
  -> Dependency Validation
  -> Smoke Test Validation
  -> Accessibility / Reporting Validation
  -> Final Readiness Report
```

### Scope

- validate folder structure
- validate config completeness
- verify package installation
- run smoke tests
- verify reports are generated
- verify optional accessibility checks

### Deliverables

- readiness report
- validation summary
- generated test report
- assumptions and risks list

### Recommended Tools

- Playwright CLI
- ESLint
- Prettier
- TypeScript compiler if applicable
- custom validation scripts

### Quality Gates

- blueprint schema valid
- required modules present
- dependencies install successfully
- smoke suite passes
- reports generated successfully
- environment files created correctly

## Phase 5: Delivery Experience for Engineers

### Objective

Make the generator easy for engineers to use without manual architecture work.

### Flow

```text
Engineer
  -> CLI or Internal Portal
  -> Upload Strategy / Select Options
  -> Blueprint Review
  -> Generation
  -> Validation
  -> Ready-to-use Framework
```

### Scope

- simple project creation workflow
- minimal manual setup
- support internal adoption
- support extensibility after generation

### Deliverables

- CLI command or portal interface
- onboarding guide
- generated repository package
- usage documentation

### Recommended Delivery Models

- v1: internal CLI
- v2: internal web portal
- v3: optional MCP-exposed generator service

### Example User Experience

```text
1. Engineer uploads or pastes a finalized test strategy.
2. System generates a blueprint.
3. Engineer reviews and approves the blueprint.
4. System selects a framework template.
5. Files are generated into a target workspace.
6. Validation runs.
7. Engineer receives a ready project with docs and reports.
```

## Phase 6: Productization and Governance

### Objective

Turn the generator into a reusable internal platform capability.

### Flow

```text
Template Registry + Generator Service + Governance
  -> Versioned Templates
  -> Versioned Blueprint Schema
  -> Approval Gates
  -> Telemetry
  -> Organization-wide Adoption
```

### Scope

- version templates
- version blueprint schema
- track usage and failure points
- define ownership and maintenance process
- enable controlled enhancements

### Deliverables

- template versioning model
- governance document
- ownership matrix
- release process

## 7. Recommended Tool Stack

## 7.1 Orchestration Layer

- `Python`
- `Semantic Kernel`
- `Azure OpenAI` or `OpenAI API`

Reason:

- Python currently has clearer documented MCP integration examples in Semantic Kernel than `.NET`
- it is fast to prototype and suitable for orchestration and structured generation tasks

## 7.2 Template and Validation Layer

- `Jinja2`
- `Pydantic`
- `JSON Schema`

Reason:

- deterministic generation is safer than unrestricted AI-generated code
- schema validation is required to keep the system predictable

## 7.3 Generation Tools

- filesystem MCP server
- local template registry
- git as optional repo initialization

## 7.4 Framework Output

- `TypeScript`
- `Playwright`
- ESLint
- Prettier
- optional `axe-core`

Reason:

- TypeScript gives stronger structure and maintainability
- Playwright is well suited for accessibility-first automation and modern web testing

## 7.5 Delivery Layer

- internal CLI for v1
- internal portal for v2
- optional VS Code extension or MCP service later

## 8. Best Practices

- keep the blueprint as the single source of truth
- use approval steps before generation
- keep templates modular and versioned
- use accessibility-first locators as the default
- support fallback `data-testid` or equivalent contracts when required
- keep utilities independent from page and test logic
- keep reporting plug-and-play
- make CI defaults available but not mandatory
- document every generated project clearly

## 9. Risks and Mitigations

### Risk: Overdependence on LLM free-form generation

Mitigation:

- use the LLM for reasoning and selection
- use deterministic templates for file generation

### Risk: Filesystem misuse

Mitigation:

- restrict filesystem MCP to a target workspace
- add approval checkpoints before write operations

### Risk: Poor app-specific accuracy

Mitigation:

- use Playwright MCP only after scaffold generation
- treat app enrichment as optional but structured

### Risk: Overengineering in v1

Mitigation:

- begin with 3 template families only
- keep the first release as a pipeline service, not a fully autonomous multi-agent platform

### Risk: Experimental orchestration features

Mitigation:

- avoid relying heavily on experimental multi-agent orchestration in v1
- prefer simple sequential orchestration and plugin calls

## 10. Suggested Phase Roadmap

### Phase 1

- define strategy schema
- build blueprint generator
- validate output

### Phase 2

- build template registry
- build scaffold engine
- generate baseline frameworks

### Phase 3

- integrate Playwright MCP
- add app analysis and starter smoke generation

### Phase 4

- add validation pipeline
- add reporting and readiness checks

### Phase 5

- build internal CLI
- add onboarding and usage guides

### Phase 6

- add governance
- add template versioning
- add organization-wide rollout model

## 11. Recommended First Release Scope

The first production-capable release should include:

- strategy-to-blueprint conversion
- three template families
- deterministic scaffold generation
- filesystem MCP for controlled file writing
- Playwright MCP for optional app validation
- smoke validation
- reporting
- CLI usage mode

This keeps the scope practical while still delivering strong value.

## 12. Final Recommendation

The best implementation model is:

- one orchestrator
- one approved blueprint
- a small template library
- controlled MCP tool usage
- deterministic generation
- Playwright-based validation as an enhancement layer

This will make the framework generator reliable, scalable, and easier for engineers to trust and adopt.
