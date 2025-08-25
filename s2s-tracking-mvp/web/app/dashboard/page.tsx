"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchAffiliateSummary,
  fetchAffiliateClicks,
  fetchAffiliateConversions,
} from "@/lib/api";

type Affiliate = { id: number; name: string };
type Click = {
  id: number;
  click_id: string;
  campaign: { name: string };
  createdAt: string;
};
type Conversion = {
  id: number;
  click_id: string;
  amount: number;
  currency: string;
  createdAt: string;
};
type Summary = {
  total_clicks: number;
  total_conversions: number;
  total_revenue: number;
};

export default function DashboardPage() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const [summaryData, setSummaryData] = useState<Summary | null>(null);
  const [clicksData, setClicksData] = useState<Click[]>([]);
  const [conversionsData, setConversionsData] = useState<Conversion[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedAffiliate = localStorage.getItem("selectedAffiliate");
    if (storedAffiliate) {
      const aff = JSON.parse(storedAffiliate);
      setAffiliate(aff);
      fetchAffiliateSummary(aff.id).then(setSummaryData);
      fetchAffiliateClicks(aff.id).then(setClicksData);
      fetchAffiliateConversions(aff.id).then(setConversionsData);
    } else {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("selectedAffiliate");
    router.push("/");
  };

  if (!affiliate || !summaryData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            Dashboard for {affiliate.name}
          </h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.push("/postback")}
            >
              Postback URL
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Clicks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryData.total_clicks.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Conversions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryData.total_conversions.toLocaleString()}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${summaryData.total_revenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Clicks Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Click ID</TableHead>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {clicksData.map((click) => (
                    <TableRow key={click.id}>
                      <TableCell className="font-mono text-sm">
                        {click.click_id}
                      </TableCell>
                      <TableCell>{click.campaign?.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(click.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Conversions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Click ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Currency</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {conversionsData.map((conversion) => (
                    <TableRow key={conversion.id}>
                      <TableCell className="font-mono text-sm">
                        {conversion.click_id}
                      </TableCell>
                      <TableCell className="font-semibold">
                        {conversion.amount}
                      </TableCell>
                      <TableCell>{conversion.currency}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(conversion.createdAt).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
