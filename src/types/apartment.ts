// apartment.ts - Types for all the apartment stuff
export interface Item {
  id: number;
  created_at: string;
  item?: string | null;
  category?: string | null;
  priority?: string | null;
  timeframe?: string | null;
  owner?: string | null;
  expense_type?: string | null;
  status?: string | null;
  quantity?: string | null;
  estimated_cost?: number | null;
  actual_cost?: number | null;
  purchased_by?: string | null;
  link_idea?: string | null;
  notes?: string | null;
}

export type PriorityLevel = "1-Critical" | "2-High" | "3-Medium" | "4-Low";
export type TimeframeType = "Immediate" | "Short-Term" | "Mid-Term" | "Long-Term";
export type OwnerType = "Likhith" | "Ben" | "Shared";
export type StatusType = "To Discuss" | "To Buy" | "Bought" | "Have";
export type ExpenseType = "Personal" | "Shared";