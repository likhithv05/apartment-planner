import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemCard } from "./ItemCard";
import type { Item, TimeframeType } from "@/types/apartment";

interface TimeframeTabsProps {
  items: Item[];
  onItemClick: (item: Item) => void;
}

const TIMEFRAMES: TimeframeType[] = ["Immediate", "Short-Term", "Mid-Term", "Long-Term"];

const PRIORITY_ORDER = {
  "1-Critical": 1,
  "2-High": 2,
  "3-Medium": 3,
  "4-Low": 4,
};

export function TimeframeTabs({ items, onItemClick }: TimeframeTabsProps) {
  const getItemsForTimeframe = (timeframe: TimeframeType) => {
    return items
      .filter(item => item.timeframe === timeframe)
      .sort((a, b) => {
        const priorityA = PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] || 5;
        const priorityB = PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] || 5;
        return priorityA - priorityB;
      });
  };

  const getTimeframeCount = (timeframe: TimeframeType) => {
    return items.filter(item => item.timeframe === timeframe).length;
  };

  return (
    <Tabs defaultValue="Immediate" className="w-full">
      <TabsList className="grid grid-cols-4 w-full h-auto">
        {TIMEFRAMES.map((timeframe) => {
          const count = getTimeframeCount(timeframe);
          return (
            <TabsTrigger 
              key={timeframe} 
              value={timeframe}
              className="flex flex-col items-center py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <span className="font-medium">{timeframe}</span>
              <span className="text-xs opacity-75">({count} items)</span>
            </TabsTrigger>
          );
        })}
      </TabsList>

      {TIMEFRAMES.map((timeframe) => {
        const timeframeItems = getItemsForTimeframe(timeframe);
        
        return (
          <TabsContent key={timeframe} value={timeframe} className="mt-6">
            {timeframeItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>No items in {timeframe.toLowerCase()} timeframe</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timeframeItems.map((item) => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    onClick={() => onItemClick(item)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}