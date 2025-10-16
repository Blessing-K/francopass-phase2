
import { Router } from 'express';
import { validationResult } from 'express-validator';
import { getAllVocab, getVocabByID, addNewVocab, updateExistingVocab, deleteVocab } from '../models/vocab.model.js';
import { createVocabRules, updateVocabRules } from '../middlewares/validation.js';

const router = Router();

// GET all
router.get('/', async (req, res, next) => {
  try {
    const data = await getAllVocab();
    res.json(data);
  } catch (err) { next(err); }
});

// GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const found = await getVocabByID(req.params.id);
    if (!found) return res.status(404).json({ error: 'Vocab not found' });
    res.json(found);
  } catch (err) { next(err); }
});

// POST create
router.post('/', createVocabRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await addNewVocab(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', updateVocabRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const updated = await updateExistingVocab(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Vocab not found' });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deleteVocab(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Vocab not found' });
    res.json({ deleted: true });
  } catch (err) { next(err); }
});

export default router;
