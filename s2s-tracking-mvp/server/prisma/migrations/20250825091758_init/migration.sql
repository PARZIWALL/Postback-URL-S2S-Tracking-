-- CreateTable
CREATE TABLE "public"."Affiliate" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Campaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Click" (
    "id" SERIAL NOT NULL,
    "affiliateId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "clickId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Conversion" (
    "id" SERIAL NOT NULL,
    "clickId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Click_clickId_affiliateId_idx" ON "public"."Click"("clickId", "affiliateId");

-- CreateIndex
CREATE UNIQUE INDEX "Click_affiliateId_campaignId_clickId_key" ON "public"."Click"("affiliateId", "campaignId", "clickId");

-- CreateIndex
CREATE INDEX "Conversion_clickId_idx" ON "public"."Conversion"("clickId");

-- AddForeignKey
ALTER TABLE "public"."Click" ADD CONSTRAINT "Click_affiliateId_fkey" FOREIGN KEY ("affiliateId") REFERENCES "public"."Affiliate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Click" ADD CONSTRAINT "Click_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "public"."Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Conversion" ADD CONSTRAINT "Conversion_clickId_fkey" FOREIGN KEY ("clickId") REFERENCES "public"."Click"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
