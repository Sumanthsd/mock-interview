import { questionBank } from "../data/index";

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function buildInterview({ mode, testType, sections, count }) {
  let pool = sections.flatMap(s => questionBank[s] || []);

  if (testType === "mcq") pool = pool.filter(q => q.type === "mcq");
  if (testType === "written") pool = pool.filter(q => q.type === "written");

  if (testType === "mixed") {
    const mcq = pool.filter(q => q.type === "mcq");
    const written = pool.filter(q => q.type === "written");
    pool = [...shuffle(mcq).slice(0, Math.ceil(count * 0.7)), ...shuffle(written).slice(0, Math.floor(count * 0.3))];
  }

  // Prefer the requested sections, but do not silently create a shorter
  // interview when those sections do not contain enough questions. This keeps
  // the configured count and the progress indicator in sync whenever the
  // question bank has enough questions overall.
  const requestedCount = Math.max(0, Number(count) || 0);
  const selected = shuffle(pool);

  if (selected.length < requestedCount) {
    const selectedIds = new Set(selected.map(q => q.id));
    const fallbackPool = Object.values(questionBank)
      .flat()
      .filter(q => !selectedIds.has(q.id))
      .filter(q => testType === "mcq" ? q.type === "mcq" : testType === "written" ? q.type === "written" : true);
    selected.push(...shuffle(fallbackPool));
  }

  return selected.slice(0, Math.min(requestedCount, selected.length));
}
