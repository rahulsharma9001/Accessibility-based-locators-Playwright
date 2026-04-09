# Playwright Framework Generator Master Prompt

Use this prompt when you want another AI tool to help design, refine, or implement the Playwright-first version of the framework generator idea.

---

## Prompt

You are acting as a senior automation architect, framework designer, and implementation planner.

I am building a **Playwright Framework Generator** whose purpose is to generate a **client-ready Playwright automation framework** from a **finalized test strategy document**.

The idea is not to manually create framework structures for each new project. Instead, the system should:

- take a finalized test strategy as the primary input
- analyze and normalize it into a structured blueprint
- use that blueprint to select a Playwright framework template
- generate a clean, modular, extensible framework structure
- optionally inspect the target application and enrich the framework with starter artifacts

Important clarification:

- the architecture should **not** be modeled as `LLM -> filesystem MCP -> Playwright MCP`
- the correct model is a **central orchestration layer**
- MCP servers are **tools**, not the workflow owner
- Playwright MCP should be used mainly for **application inspection and validation**, not as the main framework architecture engine

I want the solution designed with **Playwright-first execution** because I want to start with Playwright before expanding later to other tools.

## Core Implementation Idea

The intended architecture is:

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

## What the System Should Achieve

The generated Playwright framework should be:

- modular
- maintainable
- extensible
- clear for engineers to understand
- independent in structure
- reporting-ready
- environment-ready
- client-project-ready

It should support good separation of concerns such as:

- config
- fixtures
- pages
- components
- utilities
- API helpers if needed
- test data
- tests
- reporting
- documentation

## Architectural Principles

The framework generator should follow these principles:

1. The **test strategy** is the main business/testing input.
2. The strategy must be converted into a strict structured file such as `framework-blueprint.json`.
3. Template-based deterministic generation is preferred over free-form AI-generated code.
4. Filesystem MCP should only perform controlled file generation tasks.
5. Playwright MCP should be used after scaffold generation for:
   - app inspection
   - accessibility-based discovery
   - contract identification
   - starter smoke flow generation
   - framework validation
6. The system should include approval checkpoints before generation and validation.
7. The blueprint must become the source of truth.

## Technology Direction

The current preferred stack for the generator service is:

- Python
- Microsoft Semantic Kernel
- Azure OpenAI or OpenAI API
- Pydantic / JSON Schema validation
- Jinja2 or similar templating engine
- filesystem MCP server
- Playwright MCP server

Playwright framework output should preferably use:

- TypeScript
- Playwright test runner
- reporting support
- optional accessibility checks
- CI-ready structure

## Expected Phases

Design the solution phase-wise in this order:

### Phase 1
- strategy intake
- structured blueprint generation
- schema validation

### Phase 2
- template selection
- scaffold generation
- manifest generation

### Phase 3
- app analysis using Playwright MCP
- starter smoke test generation
- page/component model enrichment

### Phase 4
- validation
- reporting
- quality gates

### Phase 5
- delivery experience for engineers through CLI or portal

### Phase 6
- productization and governance

## Expected Outputs From You

When responding, give me:

1. a clean architecture explanation
2. a phase-wise implementation plan
3. the correct role of Semantic Kernel
4. the correct role of filesystem MCP
5. the correct role of Playwright MCP
6. recommended folder architecture for generated Playwright frameworks
7. risks and mitigations
8. suggested v1 scope and future evolution
9. practical implementation advice, not only theoretical discussion

## Constraints

- keep the solution realistic and implementable
- do not suggest fully autonomous free-form generation as the primary design
- do not treat MCP servers as if they pass data to each other directly
- do not make Playwright MCP the core architecture generator
- do not overengineer v1
- prefer a practical internal product path

## Context You Should Preserve

This idea originated from the need to save time when starting new client automation projects. A lot of time is repeatedly spent on initial framework setup, architecture decisions, reporting, utilities, folder structure, and project conventions. The goal is to make this reusable and standardized.

This is intended to become:

- a reusable internal framework generator
- a Playwright-first implementation
- something engineers can use without rewriting the full setup every time

## If Needed, Ask Me For

If your answer needs more input, ask only for:

- the finalized test strategy
- preferred language choice
- preferred template style such as basic, BDD, or enterprise
- whether app inspection is available in the first version

## Test Strategy Placeholder

Below this line, I may paste a real test strategy for you to process:

```text
[PASTE TEST STRATEGY HERE]
```
