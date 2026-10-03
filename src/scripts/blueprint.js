/**
 * STAR CHAIN LABS — System Architecture Blueprint Explorer
 * Interactive engineering schematic for the 8-tier system architecture
 */

const ARCHITECTURE_LAYERS = [
  {
    id: 'discovery',
    code: 'TIER-01',
    name: 'Discovery & Feasibility',
    tag: 'FOUNDATION',
    subtitle: 'Mathematical constraints & business model validation',
    description: 'System feasibility audit, technical constraint mapping, failure mode analyses, and boundary specification before any code is architected.',
    specs: [
      { key: 'Audit Scope', value: 'System Boundaries, Compliance & Scale' },
      { key: 'Latency Target', value: 'Feasibility SLA Defined' },
      { key: 'Deliverables', value: 'Formal Technical Spec & Architecture RFC' },
      { key: 'Verification', value: 'Mathematical Proof of Workloads' }
    ]
  },
  {
    id: 'strategy',
    code: 'TIER-02',
    name: 'Product Strategy & Modeling',
    tag: 'GOVERNANCE',
    subtitle: 'Domain-Driven Design (DDD) & bounded contexts',
    description: 'Decomposition of enterprise domain into decoupled subdomains, state machines, entity lifecycles, and event schemas with strict contract boundaries.',
    specs: [
      { key: 'Methodology', value: 'Event Storming & Domain Modeling' },
      { key: 'Contract Schema', value: 'Protocol Buffers / JSON Schema' },
      { key: 'State Modeling', value: 'Finite State Automata' },
      { key: 'Governance', value: 'RFC Design Docs & Zero-Tech-Debt Core' }
    ]
  },
  {
    id: 'ui-ux',
    code: 'TIER-03',
    name: 'UX / UI Design System',
    tag: 'EXPERIENCE',
    subtitle: 'Mathematical layout tokens & high-density ergonomics',
    description: 'Architectural tokenization of typography, spatial rhythm, accessible focus states, and high-frequency data density designed for complex mission-critical workflows.',
    specs: [
      { key: 'Design Token Engine', value: 'W3C Standard Tokens / CSS Vars' },
      { key: 'Accessibility', value: 'WCAG 2.2 AA / AAA Compliant' },
      { key: 'Frame Budget', value: '60fps – 120fps Smooth Budget' },
      { key: 'Interaction Latency', value: '< 50ms Perceptual Response' }
    ]
  },
  {
    id: 'application',
    code: 'TIER-04',
    name: 'Application Layer',
    tag: 'COMPUTE',
    subtitle: 'Decoupled reactive frontends & fault-tolerant clients',
    description: 'Type-safe React, Next.js, and TypeScript client runtimes engineered for deterministic state management, optimistic cache mutations, and resilient offline support.',
    specs: [
      { key: 'State Engine', value: 'Zustand / Reactive Store' },
      { key: 'Rendering Mode', value: 'Hybrid SSR / ISR / Static Edge' },
      { key: 'Bundle Target', value: '< 75KB Initial Compressed Payload' },
      { key: 'Testing Coverage', value: 'Unit + E2E Playwright Strict' }
    ]
  },
  {
    id: 'api-data',
    code: 'TIER-05',
    name: 'API & Data Backbone',
    tag: 'DISTRIBUTED',
    subtitle: 'High-throughput event streaming & strict ACID/NoSQL storage',
    description: 'Ultra-low latency gRPC, REST, and WebSocket gateways backed by PostgreSQL, Redis, and event brokers, guaranteeing idempotent transactions and data integrity.',
    specs: [
      { key: 'Query Latency', value: '< 8ms p95 Cache / < 35ms DB' },
      { key: 'Data Store', value: 'PostgreSQL + Redis Cache Tier' },
      { key: 'Gateway Protocol', value: 'HTTP/3, gRPC & WebSockets' },
      { key: 'Consistency', value: 'Strict ACID / Partition-Tolerant' }
    ]
  },
  {
    id: 'ai-automation',
    code: 'TIER-06',
    name: 'AI & Automation Engine',
    tag: 'INTELLIGENCE',
    subtitle: 'Sovereign LLMs, deterministic tool routing & agentic pipelines',
    description: 'Private LLM inference orchestration, semantic vector retrieval (RAG), automated fallback circuits, and deterministic agent loops operating without hallucination.',
    specs: [
      { key: 'Inference Engine', value: 'Self-Hosted Ollama + Multi-Model Fallback' },
      { key: 'Retrieval SLA', value: '< 90ms Semantic Vector Search' },
      { key: 'Safety Guardrails', value: 'Input Sanitization + Output Validation' },
      { key: 'Agent Topology', value: 'Deterministic Directed Acyclic Graphs' }
    ]
  },
  {
    id: 'cloud-infra',
    code: 'TIER-07',
    name: 'Cloud & Infrastructure',
    tag: 'PLATFORM',
    subtitle: 'Immutable infrastructure as code (IaC) & container fabrics',
    description: 'Declarative Kubernetes and Docker container fabrics configured across isolated VPCs, multi-region failover clusters, and automated blue-green delivery pipelines.',
    specs: [
      { key: 'Provisioning', value: 'Terraform / OpenTofu + GitHub Actions' },
      { key: 'Container Runtime', value: 'OCI Containers + Distroless Images' },
      { key: 'Uptime SLA', value: '99.99% Availability Architecture' },
      { key: 'Disaster Recovery', value: 'RPO < 1 min / RTO < 15 min' }
    ]
  },
  {
    id: 'security',
    code: 'TIER-08',
    name: 'Observability & Security',
    tag: 'PROTECTION',
    subtitle: 'Zero-trust architecture, automated telemetry & SIEM audit',
    description: 'Real-time distributed tracing (OpenTelemetry), continuous vulnerability posture assessment, cryptographic key rotation, and automated intrusion detection.',
    specs: [
      { key: 'Security Model', value: 'Zero-Trust Network Access (mTLS)' },
      { key: 'Telemetry Stack', value: 'OpenTelemetry + Prometheus + Grafana' },
      { key: 'Encryption', value: 'AES-256-GCM / TLS 1.3 End-to-End' },
      { key: 'Compliance', value: 'SOC 2 Type II & ISO 27001 Ready' }
    ]
  }
];

export function initBlueprint() {
  const container = document.getElementById('blueprintLayers');
  const titleEl = document.getElementById('inspectorTitle');
  const subtitleEl = document.getElementById('inspectorSubtitle');
  const descEl = document.getElementById('inspectorDesc');
  const tableEl = document.getElementById('inspectorTable');

  if (!container || !titleEl) return;

  function renderInspector(layer) {
    titleEl.textContent = `${layer.code} — ${layer.name}`;
    subtitleEl.textContent = layer.subtitle;
    descEl.textContent = layer.description;

    tableEl.innerHTML = layer.specs.map(spec => `
      <tr>
        <td>${spec.key}</td>
        <td><strong>${spec.value}</strong></td>
      </tr>
    `).join('');
  }

  // Generate Layer Items
  container.innerHTML = ARCHITECTURE_LAYERS.map((layer, index) => `
    <div class="blueprint-layer-item ${index === 0 ? 'active' : ''}" data-layer="${layer.id}" role="button" tabindex="0">
      <div class="layer-left">
        <span class="layer-code">${layer.code}</span>
        <span class="layer-name">${layer.name}</span>
      </div>
      <span class="badge badge-dark">${layer.tag}</span>
    </div>
  `).join('');

  // Set initial inspector content
  renderInspector(ARCHITECTURE_LAYERS[0]);

  // Handle Layer Click
  container.addEventListener('click', (e) => {
    const item = e.target.closest('.blueprint-layer-item');
    if (!item) return;

    const layerId = item.getAttribute('data-layer');
    const layer = ARCHITECTURE_LAYERS.find(l => l.id === layerId);
    if (!layer) return;

    container.querySelectorAll('.blueprint-layer-item').forEach(el => el.classList.remove('active'));
    item.classList.add('active');

    renderInspector(layer);
  });

  // Keyboard navigation for accessibility
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const item = e.target.closest('.blueprint-layer-item');
      if (item) item.click();
    }
  });
}
