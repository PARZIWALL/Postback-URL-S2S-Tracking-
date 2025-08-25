const express = require('express');
const router = express.Router();

// GET /postback?affiliate_id=1&click_id=abc123&amount=100&currency=USD
router.get('/', async (req, res) => {
	const prisma = req.app.locals.prisma;

	const { affiliate_id, click_id, amount, currency } = req.query;

	// Validate required fields
	if (!affiliate_id || !click_id || !amount || !currency) {
		return res.status(400).json({ error: 'Missing required parameters' });
	}

	// Type/logic validation
	if (isNaN(parseFloat(amount)) || parseFloat(amount) < 0) {
		return res.status(400).json({ error: 'Invalid amount' });
	}
	if (currency.length > 10) {
		return res.status(400).json({ error: 'Invalid currency format' });
	}

	try {
		// Find the matching click for that affiliate
		const click = await prisma.click.findFirst({
			where: {
				clickId: click_id,
				affiliateId: parseInt(affiliate_id)
			}
		});

		if (!click) {
			return res.status(404).json({ error: 'Click not found for this affiliate' });
		}

		// Store the conversion
		await prisma.conversion.create({
			data: {
				clickId: click.id,
				amount: parseFloat(amount),
				currency: currency.toUpperCase()
			}
		});

		return res.json({
			status: 'success',
			message: 'Conversion tracked'
		});
	} catch (err) {
		console.error('Error in /postback:', err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

module.exports = router;
