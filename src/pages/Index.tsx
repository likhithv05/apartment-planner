import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SharedExpenseSummary } from "@/components/apartment/SharedExpenseSummary";
import { TimeframeTabs } from "@/components/apartment/TimeframeTabs";
import { FilterControls } from "@/components/apartment/FilterControls";
import { ItemDetailPanel } from "@/components/apartment/ItemDetailPanel";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { Item } from "@/types/apartment";

const Index = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [ownerFilter, setOwnerFilter] = useState("All");
  const [sharedBudget, setSharedBudget] = useState(5000);
  const { toast } = useToast();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching items:', error);
      toast({
        title: "Error fetching items",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (updatedItem: Item) => {
    try {
      const { error } = await supabase
        .from('items')
        .update(updatedItem)
        .eq('id', updatedItem.id);

      if (error) throw error;

      setItems(items.map(item => 
        item.id === updatedItem.id ? updatedItem : item
      ));
      
      toast({
        title: "Item updated",
        description: "Changes saved successfully.",
      });
    } catch (error) {
      console.error('Error updating item:', error);
      toast({
        title: "Error updating item",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = !searchTerm || 
      item.item?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOwner = ownerFilter === "All" || item.owner === ownerFilter;
    return matchesSearch && matchesOwner;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Apartment Planner & Expense Tracker
          </h1>
          <p className="text-muted-foreground">
            Managing expenses and planning for Likhith & Ben
          </p>
        </div>

        {/* Shared Expense Summary */}
        <SharedExpenseSummary 
          items={items}
          sharedBudget={sharedBudget}
          onBudgetChange={setSharedBudget}
        />

        {/* Filter Controls */}
        <FilterControls
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          ownerFilter={ownerFilter}
          onOwnerFilterChange={setOwnerFilter}
        />

        {/* Main Content */}
        <div className="flex gap-6">
          <div className="flex-1">
            <TimeframeTabs 
              items={filteredItems}
              onItemClick={setSelectedItem}
            />
          </div>

          {/* Item Detail Panel */}
          {selectedItem && (
            <ItemDetailPanel
              item={selectedItem}
              onUpdate={updateItem}
              onClose={() => setSelectedItem(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
