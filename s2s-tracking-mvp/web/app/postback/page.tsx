"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Affiliate = { id: number; name: string };

export default function PostbackPage() {
  const [affiliate, setAffiliate] = useState<Affiliate | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const postbackUrl = affiliate
    ? `https://affiliate-system.com/postback?affiliate_id=${affiliate.id}&click_id={click_id}&amount={amount}&currency={currency}`
    : `https://affiliate-system.com/postback?affiliate_id={id}&click_id={click_id}&amount={amount}&currency={currency}`;

  useEffect(() => {
    const storedAffiliate = localStorage.getItem("selectedAffiliate");
    if (storedAffiliate) {
      setAffiliate(JSON.parse(storedAffiliate));
    } else {
      router.push("/");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("selectedAffiliate");
    router.push("/");
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postbackUrl);
      toast({
        title: "Copied!",
        description: "Postback URL copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  if (!affiliate) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Postback URL Template</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Postback URL Card */}
        <Card>
          <CardHeader>
            <CardTitle>Postback URL Template</CardTitle>
            <p className="text-sm text-muted-foreground">
              Use this URL template to set up postback tracking with your affiliate network.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <div className="bg-muted p-4 rounded-lg font-mono text-sm break-all">
                {postbackUrl}
              </div>
            </div>
            <Button onClick={copyToClipboard} className="w-full sm:w-auto">
              Copy to Clipboard
            </Button>

            <div className="mt-6 space-y-2">
              <h3 className="font-semibold">Parameters:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  <code className="bg-muted px-1 rounded">{"{id}"}</code> - Your affiliate ID
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">{"{click_id}"}</code> - Unique click identifier
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">{"{amount}"}</code> - Conversion amount
                </li>
                <li>
                  <code className="bg-muted px-1 rounded">{"{currency}"}</code> - Currency code (e.g., USD)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
