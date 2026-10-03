/**
 * STAR CHAIN LABS — Constellation Network Visualization
 * Architectural network graph: distributed nodes, connected telemetry lines,
 * central Star Chain symbol, brass/sage highlights, restrained continuous micro-motion.
 */

export function initConstellation() {
  const canvas = document.getElementById('constellationCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId = null;
  let width = 0;
  let height = 0;
  let dpr = window.devicePixelRatio || 1;

  // Reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Node Configuration
  const NODE_COUNT = 34;
  const CONNECT_DISTANCE = 110;
  const nodes = [];
  let mouse = { x: -1000, y: -1000, radius: 120, isHovering: false };

  // Color definitions honoring brand palette
  const COLORS = {
    bg: '#1C1613',
    brass: '#C5A059',
    brassGlow: 'rgba(197, 160, 89, 0.45)',
    sage: '#8A9A86',
    olive: '#4A5840',
    mineralBorder: 'rgba(45, 36, 33, 0.6)',
    lineColor: 'rgba(138, 154, 134, 0.16)',
    lineHighlight: 'rgba(197, 160, 89, 0.35)'
  };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.scale(dpr, dpr);
  }

  class Node {
    constructor(x, y, isCore = false) {
      this.x = x || Math.random() * width;
      this.y = y || Math.random() * height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.isCore = isCore;
      this.size = isCore ? 4.5 : Math.random() * 2 + 1.2;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.02 + Math.random() * 0.02;
      this.color = isCore ? COLORS.brass : (Math.random() > 0.4 ? COLORS.sage : COLORS.brass);
    }

    update() {
      if (prefersReducedMotion) return;

      this.pulse += this.pulseSpeed;

      // Restrained micro-motion
      this.x += this.vx;
      this.y += this.vy;

      // Soft boundary bounce
      const margin = 20;
      if (this.x < margin || this.x > width - margin) this.vx *= -1;
      if (this.y < margin || this.y > height - margin) this.vy *= -1;

      // Gentle interactive mouse displacement
      if (mouse.isHovering) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius && dist > 0) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      const currentPulse = Math.sin(this.pulse) * 0.5 + 0.5;
      const displaySize = this.size + currentPulse * (this.isCore ? 1.5 : 0.8);

      ctx.beginPath();
      ctx.arc(this.x, this.y, displaySize, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();

      // Subtle glow for brass nodes
      if (this.color === COLORS.brass) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, displaySize * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.brassGlow;
        ctx.fill();
      }
    }
  }

  function initNodes() {
    nodes.length = 0;

    // Center Core Node (Star Chain core)
    const centerX = width / 2;
    const centerY = height / 2;
    nodes.push(new Node(centerX, centerY, true));

    // Orbital ring nodes
    const innerCount = 8;
    const outerCount = 14;
    const freeCount = NODE_COUNT - (1 + innerCount + outerCount);

    for (let i = 0; i < innerCount; i++) {
      const angle = (i / innerCount) * Math.PI * 2;
      const radius = 65 + Math.random() * 20;
      nodes.push(new Node(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius));
    }

    for (let i = 0; i < outerCount; i++) {
      const angle = (i / outerCount) * Math.PI * 2 + 0.2;
      const radius = 130 + Math.random() * 45;
      nodes.push(new Node(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius));
    }

    for (let i = 0; i < freeCount; i++) {
      nodes.push(new Node());
    }
  }

  function drawStarMark(cx, cy, size) {
    ctx.save();
    ctx.translate(cx, cy);

    // 8-point geometric star emblem
    const outerRadius = size;
    const innerRadius = size * 0.35;
    const points = 8;

    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = COLORS.brass;
    ctx.fill();

    // Subtle center ring
    ctx.beginPath();
    ctx.arc(0, 0, innerRadius * 0.6, 0, Math.PI * 2);
    ctx.fillStyle = '#FDFBF7';
    ctx.fill();

    ctx.restore();
  }

  function drawGridAndRadials() {
    const cx = width / 2;
    const cy = height / 2;

    ctx.save();
    // Concentric coordinate telemetry circles
    ctx.strokeStyle = 'rgba(45, 36, 33, 0.45)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 6]);

    [80, 160, 240].forEach(radius => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Crosshair axes
    ctx.strokeStyle = 'rgba(45, 36, 33, 0.3)';
    ctx.setLineDash([2, 4]);

    ctx.beginPath();
    ctx.moveTo(cx, 20);
    ctx.lineTo(cx, height - 20);
    ctx.moveTo(20, cy);
    ctx.lineTo(width - 20, cy);
    ctx.stroke();

    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    drawGridAndRadials();

    // Update and draw connections
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].update();

      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DISTANCE) {
          const alpha = 1 - dist / CONNECT_DISTANCE;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);

          const isCoreConnected = nodes[i].isCore || nodes[j].isCore;
          ctx.strokeStyle = isCoreConnected
            ? `rgba(197, 160, 89, ${alpha * 0.45})`
            : `rgba(138, 154, 134, ${alpha * 0.22})`;
          ctx.lineWidth = isCoreConnected ? 1.2 : 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i].isCore) {
        nodes[i].draw();
      }
    }

    // Draw central star symbol on core node
    const core = nodes[0];
    if (core) {
      drawStarMark(core.x, core.y, 18);
    }

    animationFrameId = requestAnimationFrame(render);
  }

  // Event Listeners
  window.addEventListener('resize', () => {
    resize();
    initNodes();
  });

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.isHovering = true;
  });

  canvas.addEventListener('mouseleave', () => {
    mouse.isHovering = false;
    mouse.x = -1000;
    mouse.y = -1000;
  });

  // Initialize
  resize();
  initNodes();
  render();

  // Pause when offscreen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!animationFrameId) render();
      } else {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    });
  }, { threshold: 0.1 });

  observer.observe(canvas);
}
