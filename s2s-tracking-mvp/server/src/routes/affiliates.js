const express = require('express');
const router = express.Router();

// GET /affiliates → list all affiliates
router.get('/', async (req, res) => {
	const prisma = req.app.locals.prisma;

	try {
		const affiliates = await prisma.affiliate.findMany();
		res.json(affiliates);
	} catch (err) {
		console.error('Error fetching affiliates:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// GET /affiliates/:id/clicks?limit=10&offset=0
router.get('/:id/clicks', async (req, res) => {
	const prisma = req.app.locals.prisma;
	const { id } = req.params;
	const limit = parseInt(req.query.limit) || 10;
	const offset = parseInt(req.query.offset) || 0;

	try {
		const clicks = await prisma.click.findMany({
			where: { affiliateId: parseInt(id) },
			include: { campaign: true },
			orderBy: { createdAt: 'desc' },
			skip: offset,
			take: limit
		});
		res.json(clicks);
	} catch (err) {
		console.error('Error fetching clicks:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// GET /affiliates/:id/conversions?limit=10&offset=0
router.get('/:id/conversions', async (req, res) => {
	const prisma = req.app.locals.prisma;
	const { id } = req.params;
	const limit = parseInt(req.query.limit) || 10;
	const offset = parseInt(req.query.offset) || 0;

	try {
		const conversions = await prisma.conversion.findMany({
			where: {
				click: {
					affiliateId: parseInt(id)
				}
			},
			include: {
				click: true
			},
			orderBy: { createdAt: 'desc' },
			skip: offset,
			take: limit
		});
		res.json(conversions);
	} catch (err) {
		console.error('Error fetching conversions:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

// GET /affiliates/:id/summary
router.get('/:id/summary', async (req, res) => {
	const prisma = req.app.locals.prisma;
	const { id } = req.params;

	try {
		const [clicksCount, conversionsCount, totalRevenue] = await Promise.all([
			prisma.click.count({
				where: { affiliateId: parseInt(id) }
			}),
			prisma.conversion.count({
				where: {
					click: {
						affiliateId: parseInt(id)
					}
				}
			}),
			prisma.conversion.aggregate({
				where: {
					click: {
						affiliateId: parseInt(id)
					}
				},
				_sum: {
					amount: true
				}
			})
		]);

		res.json({
			total_clicks: clicksCount,
			total_conversions: conversionsCount,
			total_revenue: totalRevenue._sum.amount || 0
		});
	} catch (err) {
		console.error('Error generating summary:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
