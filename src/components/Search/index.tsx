import * as React from "react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { SearchIcon } from "lucide-react";

export function Search({ data = [], onSelect }) {
  const [open, setOpen] = React.useState(false);

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
            <CommandInput placeholder="Change status..." className="border-0" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {data?.length &&
                  data.map((elm) => (
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
