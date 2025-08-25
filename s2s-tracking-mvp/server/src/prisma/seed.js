const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	console.log('🌱 Seeding database...');

	// Clear existing data (optional, careful in prod)
	await prisma.conversion.deleteMany();
	await prisma.click.deleteMany();
	await prisma.campaign.deleteMany();
	await prisma.affiliate.deleteMany();

	// Create Affiliates
	const [affiliate1, affiliate2] = await Promise.all([
		prisma.affiliate.create({ data: { name: 'Affiliate One' } }),
		prisma.affiliate.create({ data: { name: 'Affiliate Two' } })
	]);

	// Create Campaigns
	const [campaign1, campaign2] = await Promise.all([
		prisma.campaign.create({ data: { name: 'Campaign Alpha' } }),
		prisma.campaign.create({ data: { name: 'Campaign Beta' } })
	]);

	// Create Clicks
	const [click1, click2, click3] = await Promise.all([
		prisma.click.create({
			data: {
				affiliateId: affiliate1.id,
				campaignId: campaign1.id,
				clickId: 'abc123'
			}
		}),
		prisma.click.create({
			data: {
				affiliateId: affiliate1.id,
				campaignId: campaign2.id,
				clickId: 'xyz789'
			}
		}),
		prisma.click.create({
			data: {
				affiliateId: affiliate2.id,
				campaignId: campaign1.id,
				clickId: 'def456'
			}
		})
	]);

	// Create Conversions
	await Promise.all([
		prisma.conversion.create({
			data: {
				clickId: click1.id,
				amount: 120.5,
				currency: 'USD'
			}
		}),
		prisma.conversion.create({
			data: {
				clickId: click2.id,
				amount: 75,
				currency: 'USD'
			}
		})
	]);

	console.log('✅ Seed complete!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
