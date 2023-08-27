import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icon";
import React from "react";

export function ChangeDate({
  month,
  year,
  setMonth,
  setYear,
}: {
  month: any;
  year: any;
  setMonth: any;
  setYear: any;
}) {
  const monthsArray = [
    { short: "Jan", label: "January", key: "1" },
    { short: "Feb", label: "February", key: "2" },
    { short: "Mar", label: "March", key: "3" },
    { short: "Apr", label: "April", key: "4" },
    { short: "May", label: "May", key: "5" },
    { short: "Jun", label: "June", key: "6" },
    { short: "Jul", label: "July", key: "7" },
    { short: "Aug", label: "August", key: "8" },
    { short: "Sep", label: "September", key: "9" },
    { short: "Oct", label: "October", key: "10" },
    { short: "Nov", label: "November", key: "11" },
    { short: "Dec", label: "December", key: "12" },
  ];
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const yearsArray = [];

  for (let year = startYear; year <= currentYear; year++) {
    yearsArray.push({ key: year, label: year });
  }
  const selectedMonth = React.useMemo(() => {
    const monthArr = Array.from(month).join(", ").replaceAll("_", " ");
    if (monthArr.length == 2) {
      return [`${monthArr[0]}${monthArr[1]}`];
    }
    return monthArr;
  }, [month]);

  return (
    <div className="flex flex-row gap-x-2">
      <Dropdown>
        <DropdownTrigger className="flex">
          <Button
            endContent={<ChevronDownIcon className="text-small" />}
            variant="flat"
          >
            {monthsArray[parseInt(Array.from(month).join(", "), 10) - 1].short}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Month"
          items={monthsArray}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedMonth}
          onSelectionChange={setMonth}
          className="max-h-[250px] overflow-auto"
        >
          {(category: any) => (
            <DropdownItem key={category.key}>
              <div className="flex flex-row gap-x-2 ">{category.label}</div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
      <Dropdown>
        <DropdownTrigger className="flex">
          <Button
            endContent={<ChevronDownIcon className="text-small" />}
            variant="flat"
          >
            {year}
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Dynamic Year"
          items={yearsArray}
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={year}
          onSelectionChange={setYear}
          className="max-h-[250px] overflow-auto"
        >
          {(category: any) => (
            <DropdownItem key={category.key}>
              <div className="flex flex-row gap-x-2 ">{category.label}</div>
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
