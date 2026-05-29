import express from 'express'

const router = express.Router();

import { fetchFeed } from '@/controllers/rssController'

router.post('/rss', fetchFeed);

export default router
