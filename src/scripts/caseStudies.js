/**
 * STAR CHAIN LABS — Featured Work Case Studies
 * Dynamic case studies with challenge, solution, stack and measurable outcomes
 */

export const CASE_STUDIES = [
  {
    id: 'vani',
    client: 'VANI',
    category: 'AI & Multilingual Neural Interface',
    challenge: 'Enterprises required sub-second voice AI automation across 12 regional languages without reliance on fragile third-party cloud wrappers.',
    solution: 'Engineered a sovereign, low-latency streaming pipeline combining on-premise Whisper models, LLM routing orchestration, and custom neural TTS synthesizers.',
    stack: ['Python', 'FastAPI', 'Ollama / Llama 3', 'WebRTC', 'Redis', 'Docker'],
    outcomeMetric: '840ms End-to-End',
    outcomeDesc: 'Average voice turn latency with 98.4% dialect recognition accuracy across production tests.'
  },
  {
    id: 'prajaseva',
    client: 'PrajaSeva',
    category: 'Civic Governance & Telemetry',
    challenge: 'Public administration bodies struggled with fragmented, manual grievance reporting resulting in multi-week resolution delays and zero audit transparency.',
    solution: 'Architected a decentralized, cryptographic ticket telemetry platform featuring automated department routing, SLA escalations, and public verification dashboards.',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailscale', 'Nginx'],
    outcomeMetric: '72% Resolution Acceleration',
    outcomeDesc: 'System routed over 140,000 requests with zero manual administrative overhead.'
  },
  {
    id: 'aethershield',
    client: 'AetherShield',
    category: 'Cybersecurity & Telemetry',
    challenge: 'Distributed cloud environments faced unmonitored lateral traversal vulnerabilities and audit non-compliance across multi-tenant deployments.',
    solution: 'Designed and deployed an automated zero-trust telemetry daemon, continuous container vulnerability scanner, and real-time SIEM reporting dashboard.',
    stack: ['Go', 'eBPF', 'Linux Security Modules', 'PostgreSQL', 'Grafana', 'Docker'],
    outcomeMetric: '100% Policy Enforcement',
    outcomeDesc: 'Automated threat containment triggered in under 120ms with verifiable zero-trust audit compliance.'
  },
  {
    id: 'kinetix',
    client: 'Kinetix Logistics',
    category: 'Distributed Systems & IoT',
    challenge: 'High-frequency telemetry from global logistics fleets caused ingestion bottlenecks and memory spikes in traditional monolithic backends.',
    solution: 'Built a distributed event-streaming ingestion engine utilizing Redis Streams, asynchronous worker pools, and automated time-series partitioning.',
    stack: ['Node.js', 'Express', 'Redis Streams', 'PostgreSQL', 'TimescaleDB', 'AWS'],
    outcomeMetric: '50,000 events/sec',
    outcomeDesc: 'Sustained throughput with sub-15ms p99 latency during peak industrial shipment cycles.'
  }
];

export function initCaseStudies() {
  const container = document.getElementById('caseStudiesContainer');
  if (!container) return;

  container.innerHTML = CASE_STUDIES.map(project => `
    <article class="case-card reveal">
      <div class="case-header">
        <div>
          <h3 class="case-client">${project.client}</h3>
        </div>
        <span class="badge badge-brass">${project.category}</span>
      </div>

      <div class="case-sections">
        <div class="case-block">
          <div class="case-block-label">Challenge</div>
          <p class="case-block-text">${project.challenge}</p>
        </div>

        <div class="case-block">
          <div class="case-block-label">Solution</div>
          <p class="case-block-text">${project.solution}</p>
        </div>

        <div class="case-block">
          <div class="case-block-label">Architecture & Stack</div>
          <div class="case-stack-list">
            ${project.stack.map(tech => `<span class="badge badge-dark">${tech}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="case-outcome-box">
        <div class="case-block-label">Outcome</div>
        <div class="case-outcome-value">${project.outcomeMetric}</div>
        <p class="case-block-text">${project.outcomeDesc}</p>
      </div>
    </article>
  `).join('');
}
