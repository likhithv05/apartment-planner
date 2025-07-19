import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";
import type { Item } from "@/types/apartment";

interface SharedExpenseSummaryProps {
  items: Item[];
  sharedBudget: number;
  onBudgetChange: (budget: number) => void;
}

export function SharedExpenseSummary({
  items,
  sharedBudget,
  onBudgetChange,
}: SharedExpenseSummaryProps) {
  // Calculate shared contributions
  const sharedItems = items.filter(item => item.expense_type === 'Shared');
  
  const likhithContribution = sharedItems
    .filter(item => item.purchased_by === 'Likhith')
    .reduce((sum, item) => sum + (item.actual_cost || 0), 0);
  
  const benContribution = sharedItems
    .filter(item => item.purchased_by === 'Ben')
    .reduce((sum, item) => sum + (item.actual_cost || 0), 0);
  
  const totalSharedSpent = likhithContribution + benContribution;
  const remainingBudget = sharedBudget - totalSharedSpent;
  
  const balanceDifference = likhithContribution - benContribution;

  return (
    <Card className="mb-6 border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-owner-shared" />
          Shared Expense Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Budget Input */}
          <div className="space-y-2">
            <Label htmlFor="budget">Shared Budget</Label>
            <Input
              id="budget"
              type="number"
              value={sharedBudget}
              onChange={(e) => onBudgetChange(Number(e.target.value))}
              className="font-mono"
            />
          </div>

          {/* Likhith's Contribution */}
          <div className="space-y-2">
            <Label>Likhith's Shared Contribution</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-owner-likhith/10 text-owner-likhith border-owner-likhith/20">
                ${likhithContribution.toFixed(2)}
              </Badge>
            </div>
          </div>

          {/* Ben's Contribution */}
          <div className="space-y-2">
            <Label>Ben's Shared Contribution</Label>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-owner-ben/10 text-owner-ben border-owner-ben/20">
                ${benContribution.toFixed(2)}
              </Badge>
            </div>
          </div>

          {/* Remaining Budget */}
          <div className="space-y-2">
            <Label>Remaining Shared Budget</Label>
            <div className="flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={remainingBudget >= 0 
                  ? "bg-success/10 text-success border-success/20" 
                  : "bg-destructive/10 text-destructive border-destructive/20"
                }
              >
                ${remainingBudget.toFixed(2)}
              </Badge>
              {remainingBudget >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </div>
          </div>
        </div>

        {/* Balance Information */}
        {Math.abs(balanceDifference) > 0.01 && (
          <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
            <p className="text-sm text-muted-foreground">
              <strong>Balance:</strong> {balanceDifference > 0 
                ? `Likhith paid $${balanceDifference.toFixed(2)} more` 
                : `Ben paid $${Math.abs(balanceDifference).toFixed(2)} more`
              }
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}