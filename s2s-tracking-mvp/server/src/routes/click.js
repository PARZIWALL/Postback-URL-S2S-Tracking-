const express = require('express');
const router = express.Router();

// GET /click?affiliate_id=1&campaign_id=10&click_id=abc123
router.get('/', async (req, res) => {
	const prisma = req.app.locals.prisma;

	const { affiliate_id, campaign_id, click_id } = req.query;

	// Basic validation
	if (!affiliate_id || !campaign_id || !click_id) {
		return res.status(400).json({ error: 'Missing required parameters' });
	}

	try {
		// Check if affiliate exists
		const affiliate = await prisma.affiliate.findUnique({
			where: { id: parseInt(affiliate_id) }
		});
		if (!affiliate) {
			return res.status(404).json({ error: 'Affiliate not found' });
		}

		// Check if campaign exists
		const campaign = await prisma.campaign.findUnique({
			where: { id: parseInt(campaign_id) }
		});
		if (!campaign) {
			return res.status(404).json({ error: 'Campaign not found' });
		}

		// Create click
		await prisma.click.create({
			data: {
				affiliateId: parseInt(affiliate_id),
				campaignId: parseInt(campaign_id),
				clickId: click_id
			}
		});

		res.json({ status: 'ok', message: 'Click logged' });

	} catch (err) {
		// Handle duplicate click error (unique constraint)
		if (err.code === 'P2002') {
			return res.status(409).json({ error: 'Duplicate click for this affiliate/campaign' });
		}

		console.error('Error logging click:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
