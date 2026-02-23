// ====== Data (minimum 8 cards) ======
const jobs = [
  {
    id: 1,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "not_applied"
  },
  {
    id: 2,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build scalable web applications using React and TypeScript. Work with a talented team on cutting-edge projects.",
    status: "not_applied"
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "not_applied"
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "not_applied"
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $150,000",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "not_applied"
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. Competitive compensation, health insurance, and professional development.",
    status: "not_applied"
  },
  {
    id: 7,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile apps using React Native. Work on products used by millions worldwide.",
    status: "not_applied"
  },
  {
    id: 8,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $120,000",
    description:
      "Create stunning web experiences for high-profile clients. Must have a strong portfolio and modern web design experience.",
    status: "not_applied"
  }
];

// ====== Elements ======
const totalCountEl = document.getElementById("totalCount");
const interviewCountEl = document.getElementById("interviewCount");
const rejectedCountEl = document.getElementById("rejectedCount");
const tabCountEl = document.getElementById("tabCount");

const cardsWrap = document.getElementById("cardsWrap");
const emptyState = document.getElementById("emptyState");
const tabButtons = document.querySelectorAll(".tab");

let activeTab = "all"; // all | interview | rejected

// ====== Helpers ======
function getCounts() {
  const total = jobs.length;
  const interview = jobs.filter(j => j.status === "interview").length;
  const rejected = jobs.filter(j => j.status === "rejected").length;
  return { total, interview, rejected };
}

function getFilteredJobs() {
  if (activeTab === "all") return jobs;
  if (activeTab === "interview") return jobs.filter(j => j.status === "interview");
  if (activeTab === "rejected") return jobs.filter(j => j.status === "rejected");
  return jobs;
}

function badgeClass(status) {
  if (status === "interview") return "badge interview";
  if (status === "rejected") return "badge rejected";
  return "badge";
}

function badgeText(status) {
  if (status === "interview") return "INTERVIEW";
  if (status === "rejected") return "REJECTED";
  return "NOT APPLIED";
}

function renderDashboard() {
  const { total, interview, rejected } = getCounts();
  totalCountEl.textContent = total;
  interviewCountEl.textContent = interview;
  rejectedCountEl.textContent = rejected;
}

function renderEmptyState(show) {
  emptyState.classList.toggle("hidden", !show);
}

function renderCards() {
  const list = getFilteredJobs();
  tabCountEl.textContent = list.length;

  // Empty state rules:
  // - In Interview tab and Rejected tab show "No Jobs Available" if 0
  // - In All tab, normally you have jobs (unless deleted all)
  const shouldShowEmpty = list.length === 0;
  renderEmptyState(shouldShowEmpty);

  cardsWrap.innerHTML = "";

  if (shouldShowEmpty) return;

  const html = list.map(job => {
    return `
      <article class="card" data-id="${job.id}">
        <div class="card-top">
          <div>
            <div class="card-company">${job.companyName}</div>
            <div class="card-role">${job.position}</div>

            <div class="card-meta">
              <span>${job.location}</span>
              <span>•</span>
              <span>${job.type}</span>
              <span>•</span>
              <span>${job.salary}</span>
            </div>

            <span class="${badgeClass(job.status)}">${badgeText(job.status)}</span>
          </div>

          <button class="icon-btn" data-action="delete" title="Delete">
            <!-- trash icon -->
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 3h6m-8 4h10m-9 0 1 14h6l1-14"
                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <p class="card-desc">${job.description}</p>

        <div class="actions">
          <button class="btn btn-interview" data-action="interview">INTERVIEW</button>
          <button class="btn btn-rejected" data-action="rejected">REJECTED</button>
        </div>
      </article>
    `;
  }).join("");

  cardsWrap.innerHTML = html;
}

function setActiveTab(tabName) {
  activeTab = tabName;

  tabButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabName);
  });

  renderDashboard();
  renderCards();
}

// ====== Events ======

// Tab switching
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => setActiveTab(btn.dataset.tab));
});

// Event delegation for buttons inside cards
cardsWrap.addEventListener("click", (e) => {
  const actionBtn = e.target.closest("[data-action]");
  if (!actionBtn) return;

  const card = e.target.closest(".card");
  if (!card) return;

  const id = Number(card.dataset.id);
  const action = actionBtn.dataset.action;

  const jobIndex = jobs.findIndex(j => j.id === id);
  if (jobIndex === -1) return;

  if (action === "interview") {
    jobs[jobIndex].status = "interview"; // toggle allowed anytime
  }

  if (action === "rejected") {
    jobs[jobIndex].status = "rejected"; // toggle allowed anytime
  }

  if (action === "delete") {
    jobs.splice(jobIndex, 1); // remove job
  }

  // Re-render UI after any change
  renderDashboard();
  renderCards();
});

// ====== Initial Render ======
setActiveTab("all");