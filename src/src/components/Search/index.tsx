import { Data } from "../../lib/types";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

function chunkedSearchByDescription(arr, targetTerm, chunkSize = 1000, maxResults = 10) {
  let output = [];
  const totalChunks = Math.ceil(arr.length / chunkSize);
  // console.log({ totalChunks });

  for (let i = 0; i < totalChunks; i++) {
    const start = i * chunkSize;
    const end = Math.min(start + chunkSize, arr.length);
    const chunk = arr.slice(start, end);

    // console.log("search chunks", i);
    // Linear search in this chunk
    for (const item of chunk) {
      // console.log("search term", item);
      if (output.length >= maxResults) return output; // return and break the loop if found matches <= maxResults
      if (item.body.toLowerCase().includes(targetTerm.toLowerCase())) output.push(item);
    }
  }

  return output; // No match found in any chunk
}

export function Search({ data = [], onSelect }: { data: Data[]; onSelect: (e: any) => void }) {
  const [open, setOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [t, setT] = useState<NodeJS.Timeout | null>(null);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearchInput(text);
    if (text.trim() == "") return;

    if (t) clearTimeout(t);

    const time = setTimeout(() => {
      // max results by 3 for fast search
      // split data array by 50 length for fast search
      const output = chunkedSearchByDescription(data, text, 50, 3);
      // @ts-expect-error -- todo
      setFilteredData(output);
    }, 500);

    setT(time);
  };

  return (
    <div className="flex items-center space-x-4 z-10">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="rounded-full bg-white py-0.5 box-content">
            <SearchIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 bg-white border-0" side="right" align="start">
          <Command>
            <CommandInput onChangeCapture={handleSearch} value={searchInput} placeholder="Change status..." className="border-0" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {filteredData?.length
                  ? filteredData.map((elm) => (
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
                    ))
                  : ""}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
