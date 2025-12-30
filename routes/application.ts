import { Router } from 'express';
import { prisma } from '../lib/prisma';
import type { AppStatus, JobApplication } from '../generated/prisma/client';

const router = Router();

router.get('/applications', async (req, res) => {
    try {
        const applications = await prisma.jobApplication.findMany({
            orderBy: { dateApplied: 'desc' }
        });
        res.json(applications);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get applications' });
    }
});

router.post('/applications', async (req, res) => {
    try {
        const { company, role, job_url, status, notes } = req.body as JobApplication;
        const application = await prisma.jobApplication.create({
            data: { company, role, job_url, status: status as AppStatus, notes: notes ?? null }
        });
        res.json(application);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create application' });
    }
});

router.put('/applications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { company, role, job_url, status, notes } = req.body as JobApplication;
        const application = await prisma.jobApplication.update({
            where: { id },
            data: { company, role, job_url, status: status as AppStatus, notes: notes ?? null }
        });
        res.json(application);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update application' });
    }
});

router.delete('/applications/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.jobApplication.delete({ where: { id } });
        res.json({ message: 'Application deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

export default router;