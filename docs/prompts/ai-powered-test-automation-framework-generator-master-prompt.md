# AI-Powered Test Automation Framework Generator Master Prompt

Use this prompt when you want another AI tool to help design, refine, or implement the broader tool-agnostic version of the framework generator idea.

---

## Prompt

You are acting as a senior automation architect, platform designer, and implementation planner.

I am building an **AI-Powered Test Automation Framework Generator** whose purpose is to generate a **client-ready automation framework** from a **finalized test strategy document**.

The important idea is that this should be **tool-agnostic by design**.

That means:

- the test strategy should remain tool-independent
- the first blueprint should remain tool-agnostic
- only after that should the system choose the best automation tool
- the framework should then be generated through a tool-specific adapter/template layer

The system is intended to reduce repeated project setup effort and standardize framework architecture across client projects.

## Correct Architecture Thinking

The correct design is **not**:

`LLM -> filesystem MCP -> Playwright MCP`

The correct design is:

- one central orchestration layer
- one structured automation blueprint
- one tool-selection layer
- one template generation layer
- one tool-specific validation/enrichment layer

So the correct high-level flow is:

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

## Product Direction

The system should evolve into a platform that can eventually support multiple automation tools such as:

- Playwright
- Selenium
- Appium
- Cypress
- WebdriverIO
- Karate
- Rest Assured
- Robot Framework

But the implementation should be practical and phased.

The recommended rollout is:

1. design the architecture as tool-agnostic
2. implement Playwright first
3. add Selenium second
4. add more adapters later

## What the System Should Achieve

The generated frameworks should be:

- modular
- maintainable
- extensible
- reporting-ready
- environment-ready
- tool-appropriate
- easy for engineers to understand and modify

There should be a clear split between:

### Core Generator Layer

- strategy intake
- blueprint generation
- rules and governance
- template selection
- generation flow
- validation flow

### Tool Adapter Layer

- Playwright adapter
- Selenium adapter
- Appium adapter
- API testing adapter
- future tool adapters

## Architectural Principles

1. The **test strategy** is the primary input.
2. The strategy must be converted into a structured file such as `automation-blueprint.json`.
3. The blueprint should remain tool-agnostic except for a tool recommendation section.
4. Tool selection should be rules-driven and reviewable.
5. Deterministic template generation is preferred over free-form AI-generated code.
6. Filesystem MCP should only perform controlled file generation tasks.
7. Tool-specific analysis should happen after scaffold generation.
8. The blueprint should become the source of truth.
9. Common architecture rules should remain independent from tool-specific logic.

## Technology Direction

The current preferred stack for the generator service is:

- Python
- Microsoft Semantic Kernel
- Azure OpenAI or OpenAI API
- Pydantic / JSON Schema validation
- Jinja2 or similar templating engine
- filesystem MCP server
- Playwright MCP as the first app-inspection tool

Tool-specific output can vary, for example:

- Playwright + TypeScript
- Selenium + Java or TypeScript depending on standards
- Appium + mobile-specific structure

## Expected Phases

Design the solution phase-wise in this order:

### Phase 1
- strategy intake
- tool-agnostic blueprint generation
- schema validation

### Phase 2
- tool selection
- adapter resolution
- tool selection rationale logging

### Phase 3
- template selection
- scaffold generation
- manifest generation

### Phase 4
- tool-specific analysis and enrichment
- starter smoke generation
- framework-aware validation

### Phase 5
- reporting
- quality gates
- readiness validation

### Phase 6
- delivery experience for engineers through CLI or portal

### Phase 7
- productization
- governance
- versioning of templates and adapters

## Expected Outputs From You

When responding, give me:

1. a clean architecture explanation
2. a tool-agnostic phase-wise implementation plan
3. the correct role of Semantic Kernel
4. the correct role of filesystem MCP
5. the correct role of tool-specific validation layers
6. the correct place for Playwright in the broader architecture
7. how to model adapters for other tools such as Selenium
8. risks and mitigations
9. a practical rollout path starting with Playwright

## Constraints

- keep the solution realistic and implementable
- do not suggest implementing all tools in v1
- do not treat MCP servers as if they pass data to each other directly
- do not make any one tool the foundation of the whole platform
- keep the blueprint tool-agnostic
- prefer a practical internal product path

## Context You Should Preserve

This idea originated from the need to save time when starting new automation projects. A lot of effort is repeatedly spent on initial architecture, utilities, configuration, reporting, hooks, test-data patterns, and structure decisions.

The intent is to build:

- an internal generator product
- a strategy-driven framework creation flow
- a tool-agnostic architecture
- a system that starts with Playwright and evolves into a wider automation platform

## If Needed, Ask Me For

If your answer needs more input, ask only for:

- the finalized test strategy
- preferred initial supported tools
- organization language/runtime preferences
- whether app inspection is available in the first version
- whether BDD support is required in v1

## Test Strategy Placeholder

Below this line, I may paste a real test strategy for you to process:

```text
[PASTE TEST STRATEGY HERE]
```
