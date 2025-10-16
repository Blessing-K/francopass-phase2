
import { Router } from 'express';
import { validationResult } from 'express-validator';
import { getAllExam, getExamByID, addNewExam, updateExistingExam, deleteExam } from '../models/exams.model.js';
import { createExamRules, updateExamRules } from '../middlewares/validation.js';

const router = Router();

// GET all
router.get('/', async (req, res, next) => {
  try {
    const data = await getAllExam();
    res.json(data);
  } catch (err) { next(err); }
});

// GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const found = await getExamByID(req.params.id);
    if (!found) return res.status(404).json({ error: 'Exam not found' });
    res.json(found);
  } catch (err) { next(err); }
});

// POST create
router.post('/', createExamRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await addNewExam(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', updateExamRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const updated = await updateExistingExam(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Exam not found' });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deleteExam(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Exam not found' });
    res.json({ deleted: true });
  } catch (err) { next(err); }
});

export default router;
