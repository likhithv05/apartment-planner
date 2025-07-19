import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Clock, User, Package } from "lucide-react";
import type { Item } from "@/types/apartment";

interface ItemCardProps {
  item: Item;
  onClick: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const getPriorityColor = (priority?: string | null) => {
    switch (priority) {
      case "1-Critical":
        return "bg-priority-critical/10 text-priority-critical border-priority-critical/20";
      case "2-High":
        return "bg-priority-high/10 text-priority-high border-priority-high/20";
      case "3-Medium":
        return "bg-priority-medium/10 text-priority-medium border-priority-medium/20";
      case "4-Low":
        return "bg-priority-low/10 text-priority-low border-priority-low/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getOwnerColor = (owner?: string | null) => {
    switch (owner) {
      case "Likhith":
        return "bg-owner-likhith/10 text-owner-likhith border-owner-likhith/20";
      case "Ben":
        return "bg-owner-ben/10 text-owner-ben border-owner-ben/20";
      case "Shared":
        return "bg-owner-shared/10 text-owner-shared border-owner-shared/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status?: string | null) => {
    switch (status) {
      case "To Discuss":
        return "bg-warning/10 text-warning border-warning/20";
      case "To Buy":
        return "bg-primary/10 text-primary border-primary/20";
      case "Bought":
        return "bg-success/10 text-success border-success/20";
      case "Have":
        return "bg-muted/10 text-muted-foreground border-muted/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card 
      className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-primary/20 border-border/50"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-foreground truncate flex-1">
            {item.item || "Untitled Item"}
          </h3>
          {item.priority && (
            <Badge 
              variant="outline" 
              className={getPriorityColor(item.priority)}
              title={`Priority: ${item.priority}`}
            >
              {item.priority === "1-Critical" && <AlertCircle className="h-3 w-3 mr-1" />}
              {item.priority?.split('-')[1]}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          {/* Owner and Status */}
          <div className="flex items-center gap-2 flex-wrap">
            {item.owner && (
              <Badge variant="outline" className={getOwnerColor(item.owner)}>
                <User className="h-3 w-3 mr-1" />
                {item.owner}
              </Badge>
            )}
            {item.status && (
              <Badge variant="outline" className={getStatusColor(item.status)}>
                <Clock className="h-3 w-3 mr-1" />
                {item.status}
              </Badge>
            )}
          </div>

          {/* Quantity */}
          {item.quantity && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>Quantity: {item.quantity}</span>
            </div>
          )}

          {/* Cost Information */}
          {(item.estimated_cost || item.actual_cost) && (
            <div className="flex items-center justify-between text-sm">
              {item.estimated_cost && (
                <span className="text-muted-foreground">
                  Est: ${item.estimated_cost.toFixed(2)}
                </span>
              )}
              {item.actual_cost && (
                <span className="font-medium text-foreground">
                  Actual: ${item.actual_cost.toFixed(2)}
                </span>
              )}
            </div>
          )}

          {/* Category */}
          {item.category && (
            <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
              {item.category}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}