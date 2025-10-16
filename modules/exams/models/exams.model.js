
import { readJson, writeJson } from '../../../utils/jsonStore.js';
import { makeId } from '../../../utils/ids.js';

const FILE = 'exams.json';

export async function getAllExam() {
  return await readJson(FILE);
}

export async function getExamByID(id) {
  const all = await readJson(FILE);
  return all.find(i => i.id === id) || null;
}

export async function addNewExam(data) {
  const all = await readJson(FILE);
  const newItem = { id: makeId(), ...data };
  all.push(newItem);
  await writeJson(FILE, all);
  return newItem;
}

export async function updateExistingExam(id, data) {
  const all = await readJson(FILE);
  const idx = all.findIndex(i => i.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data, id };
  await writeJson(FILE, all);
  return all[idx];
}

export async function deleteExam(id) {
  const all = await readJson(FILE);
  const idx = all.findIndex(i => i.id === id);
  if (idx === -1) return false;
  all.splice(idx, 1);
  await writeJson(FILE, all);
  return true;
}
