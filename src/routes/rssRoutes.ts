import express from 'express'

import { fetchFeed } from '@/controllers/rssController'

const router = express.Router();

router.post('/rss', fetchFeed);

export default router
