import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, ExternalLink, Save } from "lucide-react";
import type { Item } from "@/types/apartment";

interface ItemDetailPanelProps {
  item: Item;
  onUpdate: (item: Item) => void;
  onClose: () => void;
}

export function ItemDetailPanel({ item, onUpdate, onClose }: ItemDetailPanelProps) {
  const [editedItem, setEditedItem] = useState<Item>({ ...item });
  const [hasChanges, setHasChanges] = useState(false);

  const handleFieldChange = (field: keyof Item, value: any) => {
    setEditedItem(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate(editedItem);
    setHasChanges(false);
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-background border-l border-border shadow-lg z-50 overflow-y-auto">
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b border-border">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Item Details</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          {hasChanges && (
            <Button onClick={handleSave} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          )}
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="item">Item Name</Label>
              <Input
                id="item"
                value={editedItem.item || ""}
                onChange={(e) => handleFieldChange("item", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={editedItem.category || ""}
                onChange={(e) => handleFieldChange("category", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                value={editedItem.quantity || ""}
                onChange={(e) => handleFieldChange("quantity", e.target.value)}
              />
            </div>
          </div>

          {/* Classification */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Classification</h3>
            
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                value={editedItem.priority || ""}
                onValueChange={(value) => handleFieldChange("priority", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-Critical">1-Critical</SelectItem>
                  <SelectItem value="2-High">2-High</SelectItem>
                  <SelectItem value="3-Medium">3-Medium</SelectItem>
                  <SelectItem value="4-Low">4-Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Timeframe</Label>
              <Select
                value={editedItem.timeframe || ""}
                onValueChange={(value) => handleFieldChange("timeframe", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Immediate">Immediate</SelectItem>
                  <SelectItem value="Short-Term">Short-Term</SelectItem>
                  <SelectItem value="Mid-Term">Mid-Term</SelectItem>
                  <SelectItem value="Long-Term">Long-Term</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Owner</Label>
              <Select
                value={editedItem.owner || ""}
                onValueChange={(value) => handleFieldChange("owner", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select owner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Likhith">Likhith</SelectItem>
                  <SelectItem value="Ben">Ben</SelectItem>
                  <SelectItem value="Shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Expense Type</Label>
              <Select
                value={editedItem.expense_type || ""}
                onValueChange={(value) => handleFieldChange("expense_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select expense type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Select
                value={editedItem.status || ""}
                onValueChange={(value) => handleFieldChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Discuss">To Discuss</SelectItem>
                  <SelectItem value="To Buy">To Buy</SelectItem>
                  <SelectItem value="Bought">Bought</SelectItem>
                  <SelectItem value="Have">Have</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Financial Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="estimated_cost">Estimated Cost</Label>
              <Input
                id="estimated_cost"
                type="number"
                step="0.01"
                value={editedItem.estimated_cost || ""}
                onChange={(e) => handleFieldChange("estimated_cost", parseFloat(e.target.value) || null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actual_cost">Actual Cost</Label>
              <Input
                id="actual_cost"
                type="number"
                step="0.01"
                value={editedItem.actual_cost || ""}
                onChange={(e) => handleFieldChange("actual_cost", parseFloat(e.target.value) || null)}
              />
            </div>

            <div className="space-y-2">
              <Label>Purchased By</Label>
              <Select
                value={editedItem.purchased_by || ""}
                onValueChange={(value) => handleFieldChange("purchased_by", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select purchaser" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Likhith">Likhith</SelectItem>
                  <SelectItem value="Ben">Ben</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="link_idea">Link/Reference</Label>
              <div className="flex gap-2">
                <Input
                  id="link_idea"
                  value={editedItem.link_idea || ""}
                  onChange={(e) => handleFieldChange("link_idea", e.target.value)}
                  placeholder="https://..."
                />
                {editedItem.link_idea && isValidUrl(editedItem.link_idea) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(editedItem.link_idea!, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={editedItem.notes || ""}
                onChange={(e) => handleFieldChange("notes", e.target.value)}
                rows={4}
                placeholder="Additional notes..."
              />
            </div>
          </div>

          {/* Created Date */}
          <div className="pt-4 border-t border-border">
            <Badge variant="outline" className="text-xs">
              Created: {new Date(editedItem.created_at).toLocaleDateString()}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}