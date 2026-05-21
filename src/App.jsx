import { useEffect, useMemo, useState } from "react";

const assetBase = import.meta.env.BASE_URL;

const navItems = [
  { label: "Projects", id: "featured" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Prompts", id: "prompt" },
  { label: "Workflow", id: "workflow" },
  { label: "Contact", id: "contact" },
];

const filterItems = ["All", "Cyberpunk", "Sci-Fi", "Emotional", "Commercial", "Runway", "Midjourney"];
const heroRoles = ["Runway Prompt Engineer", "Midjourney Visual Director", "AI Cinematic Storyteller"];

const metrics = [
  { value: "30+", label: "Prompt Projects" },
  { value: "10+", label: "Video Concepts" },
  { value: "5+", label: "AI Tools" },
];

const skills = [
  {
    title: "AI Video Prompting",
    description: "영상 생성 모델이 이해하기 쉬운 장면, 움직임, 질감 정보를 구조화합니다.",
  },
  {
    title: "Cinematic Storytelling",
    description: "장면의 감정선과 시각적 목적을 중심으로 짧고 선명한 영상 흐름을 설계합니다.",
  },
  {
    title: "Camera Movement Design",
    description: "dolly, tracking, orbit, handheld 등 샷 의도에 맞는 카메라 움직임을 구성합니다.",
  },
  {
    title: "Runway Prompt Writing",
    description: "Runway 기반 영상 생성에 적합한 subject, motion, style, constraint를 최적화합니다.",
  },
  {
    title: "Midjourney Image Prompt",
    description: "영상의 기준이 되는 키 비주얼과 무드보드 이미지를 정교하게 설계합니다.",
  },
  {
    title: "Scene Planning",
    description: "콘셉트, 배경, 인물, 액션, 소품, 시간대를 실제 촬영 콘티처럼 정리합니다.",
  },
  {
    title: "Visual Mood Design",
    description: "조명, 색감, 렌즈, 날씨, 공간 밀도를 활용해 일관된 분위기를 만듭니다.",
  },
  {
    title: "Prompt Optimization",
    description: "반복 생성 결과를 분석해 불필요한 표현을 줄이고 안정적인 결과값을 높입니다.",
  },
];

const works = [
  {
    title: "AI Future City",
    description: "Autonomous mobility, holographic signage, and blue-hour skyline direction.",
    tools: ["Runway", "Midjourney"],
    category: "Sci-Fi",
    tags: ["Sci-Fi", "Runway", "Midjourney"],
    video: `${assetBase}videos/01.mp4`,
  },
  {
    title: "Human and Robot Coexistence",
    description: "A quiet emotional sequence about daily life with service androids.",
    tools: ["Kling", "Pika"],
    category: "Emotional",
    tags: ["Emotional", "Commercial"],
    video: `${assetBase}videos/02.mp4`,
  },
  {
    title: "Cyberpunk City Chase",
    description: "Rainy neon alley chase with fast tracking shots and controlled motion blur.",
    tools: ["Runway", "Pika"],
    category: "Cyberpunk",
    tags: ["Cyberpunk", "Runway"],
    video: `${assetBase}videos/03.mp4`,
  },
  {
    title: "Smart Classroom",
    description: "A clean education-tech concept with AI tutors and adaptive learning screens.",
    tools: ["Midjourney", "Kling"],
    category: "Commercial",
    tags: ["Commercial", "Midjourney"],
    video: `${assetBase}videos/04.mp4`,
  },
  {
    title: "Android Emotional Portrait",
    description: "Micro-expression portrait with soft rim light and a restrained lab atmosphere.",
    tools: ["Runway", "Midjourney"],
    category: "Emotional",
    tags: ["Emotional", "Runway", "Midjourney"],
    video: `${assetBase}videos/05.mp4`,
  },
  {
    title: "Future Medical Lab",
    description: "Precision healthcare concept with robotic surgery and cyan holographic UI.",
    tools: ["Pika", "Kling"],
    category: "Sci-Fi",
    tags: ["Sci-Fi", "Commercial"],
    video: `${assetBase}videos/06.mp4`,
  },
];

const prompts = [
  {
    title: "Neon Future City",
    fields: {
      Subject: "A futuristic megacity at blue hour with layered sky roads",
      Camera: "Wide aerial establishing shot, slow forward drone movement",
      Lighting: "Cyan holographic glow, soft atmospheric haze, reflective glass towers",
      Mood: "Expansive, intelligent, premium sci-fi",
      Movement: "Autonomous vehicles flowing through vertical traffic lanes",
      Style: "Cinematic realism, 16:9, high-end feature film look",
    },
  },
  {
    title: "Android Emotional Portrait",
    fields: {
      Subject: "A realistic android face with subtle humanlike emotion",
      Camera: "Extreme close-up with a slow camera push-in",
      Lighting: "Soft purple rim light and controlled laboratory reflections",
      Mood: "Quiet, intimate, contemplative",
      Movement: "Natural eye movement and delicate micro-expression",
      Style: "Premium cinematic portrait, shallow depth of field",
    },
  },
  {
    title: "Cyberpunk Chase",
    fields: {
      Subject: "A sleek electric motorcycle racing through a rainy neon alley",
      Camera: "Low-angle tracking shot with handheld action energy",
      Lighting: "Red and cyan neon signs reflected on wet pavement",
      Mood: "Urgent, electric, immersive",
      Movement: "Fast pass-by motion with steam, sparks, and controlled blur",
      Style: "Action trailer style, cyberpunk realism, dynamic contrast",
    },
  },
];

const beforeAfter = {
  before: "A robot walks in a city at night.",
  after:
    "A cinematic medium-wide shot of a humanoid robot walking alone through a rainy neon city at midnight, cyan and magenta reflections on wet asphalt, slow backward tracking camera, soft fog, distant traffic lights, melancholic mood, realistic sci-fi film look, 16:9.",
};

const processSteps = [
  { step: "01", title: "Concept Analysis", description: "목표 장면, 타깃 감정, 사용 플랫폼, 레퍼런스 방향을 정의합니다." },
  { step: "02", title: "Story Direction", description: "짧은 영상 안에서 전달해야 할 메시지와 장면의 감정선을 정리합니다." },
  { step: "03", title: "Shot Design", description: "샷 사이즈, 카메라 무빙, 렌즈감, 공간 밀도와 주요 액션을 설계합니다." },
  { step: "04", title: "Prompt Engineering", description: "Subject, Camera, Lighting, Mood, Movement, Style 구조로 프롬프트를 작성합니다." },
  { step: "05", title: "AI Generation", description: "Runway, Kling, Pika 등 모델별 특성에 맞춰 생성 테스트를 진행합니다." },
  { step: "06", title: "Final Optimization", description: "결과물의 오류와 강점을 분석해 반복 가능한 프롬프트 시스템으로 개선합니다." },
];

const tools = [
  { name: "Runway", purpose: "시네마틱 영상 생성과 카메라 무빙 테스트" },
  { name: "Midjourney", purpose: "키 비주얼, 콘셉트 아트, 무드보드 제작" },
  { name: "Kling", purpose: "인물 액션과 사실적인 움직임 검증" },
  { name: "Pika", purpose: "짧은 영상 콘셉트와 스타일 변주 제작" },
  { name: "Sora", purpose: "복합 장면과 스토리 기반 영상 설계" },
  { name: "Luma AI", purpose: "동적인 카메라 워크와 공간감 실험" },
  { name: "ChatGPT", purpose: "프롬프트 구조화, 콘티 정리, 카피 개선" },
];

const testimonials = [
  { quote: "영상 컨셉이 훨씬 시네마틱해졌습니다.", name: "Brand Film Director" },
  { quote: "프롬프트 구조가 명확해서 결과물이 안정적으로 나왔습니다.", name: "AI Content Producer" },
  { quote: "AI 영상 제작 과정이 체계적으로 정리되었습니다.", name: "Creative Studio Lead" },
];

const collaborations = ["AI Film", "Music Video", "Commercial", "Game Trailer", "Cinematic Intro"];
const socials = ["GitHub", "Instagram", "YouTube", "Behance"];

function App() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [copiedPrompt, setCopiedPrompt] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");

  const filteredWorks = useMemo(() => {
    if (activeFilter === "All") {
      return works;
    }

    return works.filter((work) => work.tags.includes(activeFilter));
  }, [activeFilter]);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentRole = heroRoles[roleIndex];

    if (typedRole.length < currentRole.length) {
      const typingTimer = window.setTimeout(() => {
        setTypedRole(currentRole.slice(0, typedRole.length + 1));
      }, 74);

      return () => window.clearTimeout(typingTimer);
    }

    const pauseTimer = window.setTimeout(() => {
      setTypedRole("");
      setRoleIndex((current) => (current + 1) % heroRoles.length);
    }, 1500);

    return () => window.clearTimeout(pauseTimer);
  }, [roleIndex, typedRole]);

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const composePrompt = (prompt) => {
    return Object.entries(prompt.fields)
      .map(([key, value]) => `${key}: ${value}`)
      .join(". ");
  };

  const handleCopy = async (prompt) => {
    const text = composePrompt(prompt);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrompt(prompt.title);
      window.setTimeout(() => setCopiedPrompt(""), 1600);
    } catch {
      setCopiedPrompt("Copy unavailable");
      window.setTimeout(() => setCopiedPrompt(""), 1600);
    }
  };

  return (
    <main className="site-shell">
      <header className="header">
        <button className="logo" onClick={() => handleNavigate("home")} aria-label="Go to home">
          <span className="logo-mark">AI</span>
          Prompt Lab
        </button>
        <nav className="nav">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => handleNavigate(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <section id="home" className="hero section-grid">
        <div className="hero-copy reveal is-visible">
          <span className="eyebrow">AI Cinematic Prompt Portfolio</span>
          <h1>Premium Prompt Systems for AI Video Production</h1>
          <div className="typing-line" aria-label="AI video roles">
            <span>{typedRole}</span>
          </div>
          <p>
            Runway, Midjourney, Kling, Pika 기반으로 콘셉트 분석부터 샷 디자인, 무드 설계,
            최종 프롬프트 최적화까지 연결하는 AI 영상 프롬프트 포트폴리오입니다.
          </p>
          <div className="hero-actions">
            <button className="primary-btn" onClick={() => handleNavigate("featured")}>
              Explore Projects
            </button>
            <button className="secondary-btn" onClick={() => handleNavigate("prompt")}>
              View Prompt Systems
            </button>
            <button className="ghost-btn" onClick={() => handleNavigate("contact")}>
              Start Collaboration
            </button>
          </div>
        </div>

        <div className="ai-panel reveal is-visible">
          <div className="panel-header">
            <span>Scene Intelligence Panel</span>
            <span className="status-pill">Live Direction</span>
          </div>
          <div className="signal-grid">
            <div>
              <span>Scene Depth</span>
              <strong>92%</strong>
            </div>
            <div>
              <span>Mood Match</span>
              <strong>88%</strong>
            </div>
            <div>
              <span>Motion Logic</span>
              <strong>94%</strong>
            </div>
          </div>
          <div className="prompt-feed">
            <span>subject: android portrait with restrained emotion</span>
            <span>camera: slow dolly-in, shallow depth of field</span>
            <span>lighting: cyan rim glow, soft purple ambience</span>
          </div>
          <div className="waveform">
            {Array.from({ length: 24 }).map((_, index) => (
              <i key={index} style={{ height: `${24 + ((index * 17) % 62)}%` }} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="content-section reveal">
        <div className="section-heading wide-heading">
          <span className="eyebrow">Featured Portfolio</span>
          <h2>AI video concepts built for cinematic output</h2>
          <p>실제 제작 흐름에 맞춰 장면 목적, 스타일, 도구, 프롬프트 전략이 함께 보이도록 구성했습니다.</p>
        </div>
        <div className="filter-row">
          {filterItems.map((item) => (
            <button className={activeFilter === item ? "active" : ""} key={item} onClick={() => setActiveFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <div className="work-grid">
          {filteredWorks.map((work) => (
            <article className="work-card" key={work.title}>
              <div className="work-image">
                {work.video ? (
                  <video src={work.video} autoPlay muted loop playsInline controls preload="metadata" />
                ) : (
                  <img src={work.image} alt={work.title} />
                )}
              </div>
              <div className="work-content">
                <div className="work-meta">
                  <span>{work.category}</span>
                  <span>{work.tools.join(" + ")}</span>
                </div>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <div className="tag-row">
                  {work.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="content-section reveal">
        <div className="about-layout">
          <article className="profile-card">
            <span className="eyebrow">About</span>
            <h2>프롬프트는 단순 명령어가 아니라 영상 언어 설계입니다.</h2>
            <p>
              AI 영상 프롬프트 제작자로서 장면의 목적, 카메라 무빙, 조명, 무드, 서사를 하나의 제작
              시스템으로 정리합니다. 결과물이 우연히 좋아지는 것이 아니라, 반복 가능한 방식으로
              시네마틱하게 나오도록 프롬프트 구조를 설계합니다.
            </p>
          </article>
          <div className="metric-grid">
            {metrics.map((metric) => (
              <article className="metric-card" key={metric.label}>
                <strong>{metric.value}</strong>
                <span>{metric.label}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="content-section reveal">
        <div className="section-heading">
          <span className="eyebrow">AI Skills</span>
          <h2>Production skills for AI video prompting</h2>
        </div>
        <div className="skills-grid">
          {skills.map((skill) => (
            <article className="skill-card" key={skill.title}>
              <span className="skill-line" />
              <h3>{skill.title}</h3>
              <p>{skill.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="prompt" className="content-section reveal">
        <div className="section-heading">
          <span className="eyebrow">Prompt Samples</span>
          <h2>Production-ready English prompt systems</h2>
        </div>
        <div className="prompt-grid">
          {prompts.map((prompt) => (
            <article className="prompt-card" key={prompt.title}>
              <div className="prompt-card-header">
                <h3>{prompt.title}</h3>
                <button className="copy-btn" type="button" onClick={() => handleCopy(prompt)}>
                  {copiedPrompt === prompt.title ? "Copied" : "Copy Prompt"}
                </button>
              </div>
              <div className="prompt-fields">
                {Object.entries(prompt.fields).map(([key, value]) => (
                  <div className="prompt-field" key={key}>
                    <span>{key}</span>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
        <article className="compare-card">
          <div>
            <span className="compare-label">Before</span>
            <p>{beforeAfter.before}</p>
          </div>
          <div>
            <span className="compare-label">After</span>
            <p>{beforeAfter.after}</p>
          </div>
        </article>
      </section>

      <section id="workflow" className="content-section reveal">
        <div className="section-heading">
          <span className="eyebrow">Workflow Process</span>
          <h2>A practical timeline from idea to final prompt</h2>
        </div>
        <div className="timeline">
          {processSteps.map((item) => (
            <article className="timeline-item" key={item.step}>
              <span className="timeline-index">{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="tools" className="content-section reveal">
        <div className="section-heading">
          <span className="eyebrow">AI Tool Stack</span>
          <h2>Tools selected by role, not trend</h2>
        </div>
        <div className="tool-grid">
          {tools.map((tool) => (
            <article className="tool-card" key={tool.name}>
              <span>{tool.name.slice(0, 2)}</span>
              <h3>{tool.name}</h3>
              <p>{tool.purpose}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="testimonials" className="content-section reveal">
        <div className="section-heading">
          <span className="eyebrow">Testimonials</span>
          <h2>Client feedback on prompt direction</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial-card" key={item.quote}>
              <p>"{item.quote}"</p>
              <span>{item.name}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="content-section contact-section reveal">
        <div className="contact-layout">
          <div>
            <span className="eyebrow">Contact</span>
            <h2>AI 영상 프로젝트를 더 선명한 장면으로 설계해보세요</h2>
            <p>
              콘셉트 필름, 광고, 뮤직비디오, 게임 트레일러, 시네마틱 인트로를 위한 프롬프트 시스템을
              함께 구축할 수 있습니다.
            </p>
            <div className="collab-list">
              {collaborations.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="social-row">
              {socials.map((social) => (
                <a href={`https://example.com/${social.toLowerCase()}`} key={social} target="_blank" rel="noreferrer">
                  {social}
                </a>
              ))}
            </div>
          </div>
          <form className="contact-form">
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="your@email.com" />
            </label>
            <label>
              Message
              <textarea placeholder="Tell me about your video concept" rows="5" />
            </label>
            <button className="primary-btn" type="button">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default App;
