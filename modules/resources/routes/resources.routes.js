
import { Router } from 'express';
import { validationResult } from 'express-validator';
import { getAllResource, getResourceByID, addNewResource, updateExistingResource, deleteResource } from '../models/resources.model.js';
import { createResourceRules, updateResourceRules } from '../middlewares/validation.js';

const router = Router();

// GET all
router.get('/', async (req, res, next) => {
  try {
    const data = await getAllResource();
    res.json(data);
  } catch (err) { next(err); }
});

// GET by id
router.get('/:id', async (req, res, next) => {
  try {
    const found = await getResourceByID(req.params.id);
    if (!found) return res.status(404).json({ error: 'Resource not found' });
    res.json(found);
  } catch (err) { next(err); }
});

// POST create
router.post('/', createResourceRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const created = await addNewResource(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// PUT update
router.put('/:id', updateResourceRules, async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const updated = await updateExistingResource(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Resource not found' });
    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const ok = await deleteResource(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Resource not found' });
    res.json({ deleted: true });
  } catch (err) { next(err); }
});

export default router;
