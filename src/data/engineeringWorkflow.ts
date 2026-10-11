export interface WorkflowStep {
  id: number;
  fnName: string;
  title: string;
  description: string;
  iconType: "understand" | "research" | "design" | "build" | "test" | "deploy" | "iterate";
  defCode: string[];
  callCode: string[];
  outputLine: string;
}

export const WORKFLOW_HEADER_CODE = [
  "/**",
  " * @file solve.ts",
  " * Engineering architecture pipeline.",
  " */",
  "",
  "interface Problem {",
  "  domain: string;",
  "  bottleneck: string;",
  "  targetImpact: string;",
  "}",
  "",
  "const problem: Problem = {",
  '  domain: "Agriculture & Mandi Marketplace",',
  '  bottleneck: "Farmer margin lost to intermediaries",',
  '  targetImpact: "Direct trade & algorithmic price discovery"',
  "};",
  ""
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    fnName: "understand",
    title: "Understand the Problem",
    description: "Define core requirements, user pain points, and success metrics before writing code.",
    iconType: "understand",
    defCode: [
      "function understand(p: Problem): { scope: string; targetMetric: string } {",
      '  return { scope: p.domain, targetMetric: p.targetImpact };',
      "}"
    ],
    callCode: [
      "const goal = understand(problem);",
      'console.log(`[1/7] Scope defined: ${goal.scope} -> ${goal.targetMetric}`);'
    ],
    outputLine: "[1/7] Scope defined: Agriculture & Mandi Marketplace -> Direct trade & algorithmic price discovery"
  },
  {
    id: 2,
    fnName: "research",
    title: "Research & Plan",
    description: "Evaluate technical tradeoffs, data models, and edge cases to minimize technical debt.",
    iconType: "research",
    defCode: [
      "function research(scope: string): { dataModel: string; riskSurface: string } {",
      '  return { dataModel: "Normalized Mandi Schema", riskSurface: "Mitigated" };',
      "}"
    ],
    callCode: [
      "const plan = research(goal.scope);",
      'console.log(`[2/7] Plan ready: ${plan.dataModel} | Risk: ${plan.riskSurface}`);'
    ],
    outputLine: "[2/7] Plan ready: Normalized Mandi Schema | Risk: Mitigated"
  },
  {
    id: 3,
    fnName: "design",
    title: "Design the Architecture",
    description: "Structure modular, API first boundaries designed for maintainability and scale.",
    iconType: "design",
    defCode: [
      "function design(): { architecture: string; apiProtocol: string } {",
      '  return { architecture: "Event-driven microservices", apiProtocol: "REST/WebSocket" };',
      "}"
    ],
    callCode: [
      "const arch = design();",
      'console.log(`[3/7] Architecture: ${arch.architecture} (${arch.apiProtocol})`);'
    ],
    outputLine: "[3/7] Architecture: Event-driven microservices (REST/WebSocket)"
  },
  {
    id: 4,
    fnName: "build",
    title: "Build the MVP",
    description: "Execute clean, typed, and well-tested core functionality with rapid iteration cycles.",
    iconType: "build",
    defCode: [
      "function build(arch: string): { modules: number; status: string } {",
      '  return { modules: 4, status: "ready" };',
      "}"
    ],
    callCode: [
      "const app = build(arch.architecture);",
      'console.log(`✓ build ${app.modules} modules ready`);'
    ],
    outputLine: "✓ build 4 modules ready"
  },
  {
    id: 5,
    fnName: "test",
    title: "Test & Validate",
    description: "Verify end-to-end reliability, security boundaries, and edge case resilience against real data.",
    iconType: "test",
    defCode: [
      "function test(): { suitePassed: boolean; coverage: string } {",
      '  return { suitePassed: true, coverage: "94.8%" };',
      "}"
    ],
    callCode: [
      "const qa = test();",
      'console.log(`[5/7] Tests passed: ${qa.suitePassed} (${qa.coverage} coverage)`);'
    ],
    outputLine: "[5/7] Tests passed: true (94.8% coverage)"
  },
  {
    id: 6,
    fnName: "deploy",
    title: "Deploy & Monitor",
    description: "Ship to production with automated CI/CD pipelines, active telemetry, and zero downtime practices.",
    iconType: "deploy",
    defCode: [
      "function deploy(): { region: string; uptime: string } {",
      '  return { region: "ap-south-1", uptime: "99.98%" };',
      "}"
    ],
    callCode: [
      "const prod = deploy();",
      'console.log(`[6/7] Deployed: ${prod.region} with ${prod.uptime} SLA`);'
    ],
    outputLine: "[6/7] Deployed: ap-south-1 with 99.98% SLA"
  },
  {
    id: 7,
    fnName: "iterate",
    title: "Iterate & Improve",
    description: "Refine performance and expand capabilities driven by real user feedback and system metrics.",
    iconType: "iterate",
    defCode: [
      "function iterate(): { loop: string; status: string } {",
      '  return { loop: "Active Telemetry Feedback", status: "Iterating" };',
      "}"
    ],
    callCode: [
      "const cycle = iterate();",
      'console.log(`[7/7] Continuous iteration cycle complete: ${cycle.status}`);'
    ],
    outputLine: "[7/7] Continuous iteration cycle complete: Iterating"
  }
];
