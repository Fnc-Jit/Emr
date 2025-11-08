import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "./ui/utils";

export interface CountryCode {
  code: string;
  name: string;
  dial: string;
}

export const countryCodes: CountryCode[] = [
  { code: "US", name: "United States", dial: "+1" },
  { code: "IN", name: "India", dial: "+91" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CO", name: "Colombia", dial: "+57" },
];

interface CountryCodeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CountryCodeSelect({ value, onChange, className }: CountryCodeSelectProps) {
  const [open, setOpen] = useState(false);
  
  const selectedCountry = countryCodes.find((country) => country.dial === value) || countryCodes[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[120px] justify-between", className)}
        >
          <span className="truncate">{selectedCountry.dial}</span>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search country..." className="h-9" />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countryCodes.map((country) => (
                <CommandItem
                  key={country.code}
                  value={`${country.name} ${country.dial}`}
                  onSelect={() => {
                    onChange(country.dial);
                    setOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  <span className="font-medium">{country.dial}</span>
                  <span className="ml-2 text-muted-foreground">{country.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedCountry.dial === country.dial ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
