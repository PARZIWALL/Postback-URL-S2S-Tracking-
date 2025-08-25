"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAffiliates } from "@/lib/api";

type Affiliate = { id: number; name: string };

export default function LoginPage() {
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>("");
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchAffiliates().then(setAffiliates).catch(() => setAffiliates([]));
  }, []);

  const handleContinue = () => {
    if (selectedAffiliate) {
      const affiliate = affiliates.find((a) => a.id === parseInt(selectedAffiliate));
      if (affiliate) {
        localStorage.setItem("selectedAffiliate", JSON.stringify(affiliate));
        router.push("/dashboard");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Affiliate Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Affiliate</label>
            <Select value={selectedAffiliate} onValueChange={setSelectedAffiliate}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an affiliate" />
              </SelectTrigger>
              <SelectContent>
                {affiliates.map((affiliate) => (
                  <SelectItem key={affiliate.id} value={affiliate.id.toString()}>
                    {affiliate.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleContinue} disabled={!selectedAffiliate} className="w-full">
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
