import { Data } from "../../lib/types";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export function Search({ data = [], onSelect }: { data: Data[]; onSelect: (e: any) => void }) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [t, setT] = useState<NodeJS.Timeout | null>(null);
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchInput(text);

    if (t) clearTimeout(t);

    const time = setTimeout(() => {
      const output = data.filter((item) => item.body.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(output.slice(0, 10));
    }, 200);

    setT(time);
  };

  return (
    <div className="flex items-center space-x-4 z-10">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="rounded-full bg-white">
            <SearchIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white border-0" side="right" align="start">
          <Command>
            <CommandInput onChangeCapture={handleSearch} value={searchInput} placeholder="Change status..." className="border-0" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredData?.length &&
                  filteredData.map((elm) => (
                    <CommandItem
                      className="hover:bg-zinc-100"
                      key={elm.id}
                      value={elm.body}
                      onSelect={() => {
                        setOpen(false);
                        if (onSelect) onSelect(elm);
                      }}
                    >
                      {elm.body.length > 28 ? elm.body.slice(0, 28) + "..." : elm.body}
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
