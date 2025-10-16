
import { readJson, writeJson } from '../../../utils/jsonStore.js';
import { makeId } from '../../../utils/ids.js';

const FILE = 'vocab.json';

export async function getAllVocab() {
  return await readJson(FILE);
}

export async function getVocabByID(id) {
  const all = await readJson(FILE);
  return all.find(i => i.id === id) || null;
}

export async function addNewVocab(data) {
  const all = await readJson(FILE);
  const newItem = { id: makeId(), ...data };
  all.push(newItem);
  await writeJson(FILE, all);
  return newItem;
}

export async function updateExistingVocab(id, data) {
  const all = await readJson(FILE);
  const idx = all.findIndex(i => i.id === id);
  if (idx === -1) return null;
  all[idx] = { ...all[idx], ...data, id };
  await writeJson(FILE, all);
  return all[idx];
}

export async function deleteVocab(id) {
  const all = await readJson(FILE);
  const idx = all.findIndex(i => i.id === id);
  if (idx === -1) return false;
  all.splice(idx, 1);
  await writeJson(FILE, all);
  return true;
}
