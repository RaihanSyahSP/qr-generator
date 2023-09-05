import React from "react";
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label";
import { SelectItemType } from "@/lib/constant";


type SelectProps = {
  labelName: string
  labelHTMLFor: string
  selectOptions: SelectItemType[]
} & React.ComponentPropsWithRef<"select">

// eslint-disable-next-line react/display-name
const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ labelName, selectOptions, labelHTMLFor, className, ...rest }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={labelHTMLFor}>{labelName}</Label>
        <select
          ref={ref}
          className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              className
          )}
          {...rest}
        >
          {selectOptions.map((option, index) => (
            <option value={option.value} key={index}>
              {option.optionLabel}
            </option>
          ))}
        </select>
      </div>
    )
  }
)

export default Select