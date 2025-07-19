-- Enable Row Level Security on items table
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;

-- Create policies to allow full access for now (since this is a shared app for Likhith and Ben)
CREATE POLICY "Allow all operations on items" 
ON public.items 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Add some helpful indexes for better performance
CREATE INDEX IF NOT EXISTS idx_items_timeframe ON public.items(timeframe);
CREATE INDEX IF NOT EXISTS idx_items_priority ON public.items(priority);
CREATE INDEX IF NOT EXISTS idx_items_owner ON public.items(owner);
CREATE INDEX IF NOT EXISTS idx_items_expense_type ON public.items(expense_type);
CREATE INDEX IF NOT EXISTS idx_items_status ON public.items(status);