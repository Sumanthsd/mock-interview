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

  return shuffle(pool).slice(0, Math.min(count, pool.length));
}