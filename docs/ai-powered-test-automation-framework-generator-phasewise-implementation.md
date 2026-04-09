# AI-Powered Test Automation Framework Generator

## Phase-Wise Implementation Document

## 1. Objective

The objective is to build a reusable system that can generate a client-ready test automation framework architecture from a finalized test strategy document.

Instead of manually creating folders, configuration, reporting, utilities, fixtures, test data layers, hooks, page objects, component objects, and starter tests for every new project, the proposed system will:

- accept a test strategy as the primary input
- analyze it using an LLM-driven orchestration layer
- convert it into a structured tool-agnostic automation blueprint
- select the right automation tool and framework template
- generate the project structure into a target workspace
- optionally inspect the target application and enrich the framework with starter automation artifacts

This approach reduces bootstrap effort, improves standardization, and keeps the generated framework extensible for automation engineers.

## 2. Problem Statement

In many automation projects, a significant amount of time is spent on initial setup work such as:

- creating the folder structure
- defining config and environment strategy
- setting up reporting
- preparing utilities and helpers
- organizing page or component abstractions
- wiring test data, hooks, fixtures, and CI basics
- deciding which automation tool best fits the project

This effort is repeated across projects even though much of the architecture is conceptually similar. The goal is to productize this setup into an AI-powered framework generator driven by the project test strategy.

## 3. Proposed Solution

The correct solution is not a direct chain of `LLM -> filesystem MCP -> Playwright MCP`.

The correct implementation is:

- one central orchestration layer
- one structured blueprint as the source of truth
- a tool-selection layer that remains independent of the framework generator
- MCP servers used as controlled tools
- deterministic template generation wherever possible
- tool-specific inspection and validation used only after scaffold generation

## 4. High-Level Architecture

```text
Test Strategy
  -> Strategy Intake
  -> Semantic Kernel Orchestrator
  -> Tool-Agnostic Automation Blueprint
  -> Tool Selector
  -> Template Selector
  -> Scaffold Generator
  -> Filesystem MCP
  -> Generated Automation Framework
  -> Tool-Specific Validation / Enrichment
  -> Final Client-Ready Project
```

## 5. Core Components

### 5.1 Test Strategy Input

This is the primary business and testing input. It may include:

- project scope
- application type
- test scope
- testing approach
- environments
- quality gates
- reporting needs
- CI/CD expectations
- accessibility, visual, mobile, or API requirements
- team skillset and language preference
- existing enterprise constraints

### 5.2 Semantic Kernel Orchestrator

Semantic Kernel should act as the central orchestrator that:

- invokes the LLM
- parses the strategy
- applies transformation rules
- coordinates tool calls
- manages approval checkpoints
- controls blueprint generation and adapter selection

### 5.3 Tool-Agnostic Automation Blueprint

The strategy must be normalized into a strict machine-readable format such as:

- `automation-blueprint.json`

This becomes the source of truth for generation.

Example blueprint fields:

- project type
- application under test type
- UI or API or mobile coverage
- preferred testing style
- language preference
- environment model
- reporting model
- auth strategy
- test data strategy
- accessibility requirements
- visual validation requirements
- CI requirements
- required framework modules
- recommended automation tool
- adapter selection rationale

### 5.4 Tool Selector

The tool selector maps blueprint needs to the right execution stack.

Suggested initial supported tools:

- `Playwright`
- `Selenium`

Later additions:

- `Appium`
- `Cypress`
- `WebdriverIO`
- `Karate`
- `Rest Assured`
- `Robot Framework`

### 5.5 Template Registry

A template registry maps blueprint needs and selected tool to the correct framework family.

Suggested initial template families:

- `playwright-basic`
- `playwright-bdd`
- `playwright-enterprise`
- `selenium-basic`
- `selenium-bdd`

Later additions:

- `appium-mobile`
- `ui-api-hybrid`
- `visual-a11y`

### 5.6 Filesystem MCP Server

The filesystem MCP server should be used only for controlled file generation tasks:

- create folders
- write files
- copy templates
- fill placeholders

It must be restricted to the target workspace only.

### 5.7 Tool-Specific Analysis and Validation Layer

After scaffold generation, the selected tool can be used for targeted inspection and validation.

Examples:

- Playwright MCP for web app inspection and accessibility-based discovery
- Selenium adapter validation for Java-based enterprise projects
- Appium-based validation for mobile test scaffolds
- API smoke generation for API-first frameworks

This layer should enrich the scaffold, not replace the scaffold generator.

## 6. Phase-Wise Implementation

## Phase 1: Strategy Intake and Tool-Agnostic Blueprint Generation

### Objective

Convert a finalized test strategy into a strict structured automation blueprint.

### Flow

```text
Test Strategy Document
  -> Intake Service
  -> Semantic Kernel
  -> Strategy Parsing
  -> Validation Rules
  -> automation-blueprint.json
```

### Scope

- accept input in `.md`, `.pdf`, or `.docx`
- extract meaningful strategy details
- convert free text into structured fields
- identify the most suitable automation direction
- validate completeness
- identify missing or ambiguous decisions

### Deliverables

- `strategy-schema.json`
- `automation-blueprint.json`
- `generation-report.md`

### Key Rules

- no framework generation should happen before blueprint approval
- the LLM output must be schema-validated
- any unresolved ambiguity must be surfaced as an assumption or open item
- the blueprint must remain tool-agnostic except for the tool recommendation section

### Recommended Tools

- `Python`
- `Semantic Kernel`
- `Azure OpenAI` or `OpenAI API`
- `Pydantic` or JSON schema validation
- document parsing library for `.pdf` and `.docx`

### Output Example

```json
{
  "frameworkCategory": "enterprise-ui-automation",
  "applicationType": "web",
  "languagePreference": "typescript",
  "testStyle": "non-bdd",
  "reporting": ["html", "custom-summary"],
  "modules": ["pages", "components", "fixtures", "utils", "api", "a11y"],
  "environments": ["qa", "uat", "prod-like"],
  "toolRecommendation": "playwright",
  "toolReason": "Modern web application with need for stable UI automation and accessibility-first testing",
  "ci": true
}
```

## Phase 2: Tool Selection and Adapter Resolution

### Objective

Choose the most appropriate automation tool based on the approved blueprint.

### Flow

```text
automation-blueprint.json
  -> Tool Selector
  -> Adapter Rules
  -> Selected Tool
  -> Tool-Specific Template Path
```

### Scope

- evaluate blueprint attributes
- choose the most suitable automation tool
- define the correct language/runtime stack
- select the proper adapter and template family

### Deliverables

- tool selection record
- adapter selection record
- template family mapping

### Key Rules

- tool selection should be rules-driven, not purely conversational
- the selected tool must match project constraints and team realities
- the reasoning behind selection must be logged

### Example Decision Logic

- choose `Playwright` for modern web apps needing speed, built-in tracing, and accessibility-first testing
- choose `Selenium` for legacy enterprise stacks or organizations standardized on Java and Grid
- choose `Appium` for native mobile automation
- choose API-focused stacks for API-heavy strategies

### Recommended Tools

- rules engine in Python
- JSON or YAML mapping for tool selection
- Semantic Kernel only for assisted reasoning where needed

## Phase 3: Template Selection and Scaffold Generation

### Objective

Generate a framework using approved templates and deterministic rendering.

### Flow

```text
automation-blueprint.json + selected-tool.json
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
- common architecture rules should remain reusable across tools

### Recommended Tools

- `Jinja2` or similar template rendering engine
- local template registry in `JSON` or `YAML`
- filesystem MCP server
- git initialization as optional post-step

### Shared Template Modules

- `config/`
- `fixtures/` or equivalent tool-specific support layer
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

### Tool-Specific Variations

- Playwright: fixtures, traces, accessibility-first examples
- Selenium: driver management, Grid-ready config, Java-oriented examples
- Appium: device config, mobile capabilities, platform abstractions

## Phase 4: Tool-Specific Analysis and Framework Enrichment

### Objective

Use the selected automation tool to enrich the generated framework with application-aware starter artifacts.

### Flow

```text
Generated Framework + Target App Details
  -> Semantic Kernel
  -> Tool-Specific Analyzer
  -> App Inspection
  -> Contract Discovery
  -> Starter Pages / Components / Smoke Tests
```

### Scope

- inspect target application flows where possible
- identify stable automation contracts
- propose page objects or component objects
- generate initial smoke tests
- create contract validation checks

### Deliverables

- starter smoke suite
- starter page/component models
- app assumptions report
- contract summary

### Key Rules

- the analysis layer should enrich, not replace the scaffold generator
- accessibility-first contracts should be preferred for tools that support them well
- fallback test IDs or equivalent contracts may be suggested where the app lacks stable naming

### Recommended Tools

- Playwright MCP for modern web app inspection
- Selenium-specific validation utilities where needed
- optional accessibility scan integration such as `axe-core`
- tool-native smoke validation execution

## Phase 5: Validation, Quality Gates, and Reporting

### Objective

Ensure the generated project is usable, consistent, and production-worthy.

### Flow

```text
Generated Project
  -> Static Validation
  -> Dependency Validation
  -> Smoke Test Validation
  -> Reporting Validation
  -> Final Readiness Report
```

### Scope

- validate folder structure
- validate config completeness
- verify package or dependency installation
- run smoke tests
- verify reports are generated
- verify optional accessibility or API checks

### Deliverables

- readiness report
- validation summary
- generated test report
- assumptions and risks list

### Recommended Tools

- tool-specific CLI validation
- ESLint / Prettier / formatter equivalents
- TypeScript compiler or Java build validation depending on stack
- custom validation scripts

### Quality Gates

- blueprint schema valid
- tool selection recorded
- required modules present
- dependencies install successfully
- smoke suite passes
- reports generated successfully
- environment files created correctly

## Phase 6: Delivery Experience for Engineers

### Objective

Make the generator easy for engineers to use without manual architecture work.

### Flow

```text
Engineer
  -> CLI or Internal Portal
  -> Upload Strategy / Select Options
  -> Blueprint Review
  -> Tool Review
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
- v3: optional IDE or MCP-exposed generator service

## Phase 7: Productization and Governance

### Objective

Turn the generator into a reusable internal platform capability.

### Flow

```text
Template Registry + Generator Service + Governance
  -> Versioned Templates
  -> Versioned Blueprint Schema
  -> Adapter Versioning
  -> Approval Gates
  -> Telemetry
  -> Organization-wide Adoption
```

### Scope

- version templates
- version blueprint schema
- version tool adapters
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

## 7.2 Blueprint and Validation Layer

- `Pydantic`
- `JSON Schema`
- rules engine in Python

Reason:

- deterministic reasoning and validation are safer than unrestricted AI-generated code
- schema validation is required to keep the system predictable

## 7.3 Template and Generation Layer

- `Jinja2`
- filesystem MCP server
- local template registry
- git as optional repo initialization

Reason:

- deterministic rendering is more reliable than generating framework code from scratch every time

## 7.4 Supported Tool Adapters

Initial adapters:

- `Playwright`
- `Selenium`

Later adapters:

- `Appium`
- `Cypress`
- `WebdriverIO`
- `Karate`
- `Rest Assured`

## 7.5 Framework Output Standards

The generated frameworks should consistently support:

- reporting
- environment configuration
- modular utilities
- isolated test data
- documentation
- CI hooks
- validation scripts

## 7.6 Delivery Layer

- internal CLI for v1
- internal portal for v2
- optional VS Code extension or MCP service later

## 8. Best Practices

- keep the blueprint as the single source of truth
- use approval steps before generation
- keep templates modular and versioned
- keep core architecture rules tool-agnostic
- isolate tool-specific logic into adapters
- use accessibility-first locators where the selected tool supports them well
- support fallback test IDs or equivalent contracts when required
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

### Risk: Wrong tool selection

Mitigation:

- make tool selection rule-based and reviewable
- record rationale in the blueprint and generation report

### Risk: Poor app-specific accuracy

Mitigation:

- use tool-specific enrichment only after scaffold generation
- treat app enrichment as optional but structured

### Risk: Overengineering in v1

Mitigation:

- begin with 2 supported tools and 3 template families
- keep the first release as a pipeline service, not a fully autonomous multi-agent platform

### Risk: Experimental orchestration features

Mitigation:

- avoid relying heavily on experimental multi-agent orchestration in v1
- prefer simple sequential orchestration and plugin calls

## 10. Updated Phase Roadmap

### Phase 1

- define tool-agnostic strategy schema
- build automation blueprint generator
- validate output

### Phase 2

- build tool selector
- implement Playwright and Selenium adapter decisions
- log tool selection rationale

### Phase 3

- build template registry
- build scaffold engine
- generate baseline frameworks

### Phase 4

- integrate Playwright MCP for web inspection
- add tool-specific enrichment for supported adapters
- generate starter smoke tests

### Phase 5

- add validation pipeline
- add reporting and readiness checks

### Phase 6

- build internal CLI
- add onboarding and usage guides

### Phase 7

- add governance
- add template and adapter versioning
- add organization-wide rollout model

## 11. Recommended First Release Scope

The first production-capable release should include:

- strategy-to-blueprint conversion
- tool selection between Playwright and Selenium
- three initial template families
- deterministic scaffold generation
- filesystem MCP for controlled file writing
- Playwright MCP for optional web app validation
- smoke validation
- reporting
- CLI usage mode

This keeps the scope practical while still delivering strong value.

## 12. Final Recommendation

The best implementation model is:

- one orchestrator
- one approved tool-agnostic blueprint
- a small template library
- a small adapter layer
- controlled MCP tool usage
- deterministic generation
- tool-specific validation as an enhancement layer

This will make the framework generator reliable, scalable, and easier for engineers to trust and adopt while remaining future-ready beyond Playwright alone.
