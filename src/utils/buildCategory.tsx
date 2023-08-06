import { Tooltip } from "@nextui-org/react";
import React from "react";
import {
  MdFastfood,
  MdShoppingCart,
  MdHome,
  MdLaptopChromebook,
  MdCommute,
  MdMan4,
  MdOutlineCurrencyExchange,
  MdShowChart,
  MdGroups,
  MdList,
} from "react-icons/md";

interface TagEntry {
  name: string;
  icon: JSX.Element; // Use JSX.Element type for icon
}

const tags: { [key: string]: TagEntry } = {
  tagall: {
    name: "All",
    icon: <MdList />,
  },
  tag64c9d170caeeac7b98a1fbcf: {
    name: "Food",
    icon: <MdFastfood />,
  },
  tag64c9d1d6caeeac7b98a1fbd2: {
    name: "Groceries",
    icon: <MdShoppingCart />,
  },
  tag64c9d27bcaeeac7b98a1fbd8: {
    name: "Rent / Utilities",
    icon: <MdHome />,
  },
  tag64c9d2b0caeeac7b98a1fbdb: {
    name: "Education",
    icon: <MdLaptopChromebook />,
  },
  tag64c9d369caeeac7b98a1fbde: {
    name: "Transportation",
    icon: <MdCommute />,
  },
  tag64c9d40ecaeeac7b98a1fbe1: {
    name: "Personal Expense",
    icon: <MdMan4 />,
  },
  tag64c9d487caeeac7b98a1fbe4: {
    name: "Other",
    icon: <MdOutlineCurrencyExchange />,
  },
  tag64c9d4b2caeeac7b98a1fbe7: {
    name: "Investments",
    icon: <MdShowChart />,
  },
  tag64c9d4f7caeeac7b98a1fbea: {
    name: "Tabs",
    icon: <MdGroups />,
  },
};
export function ReturnIcon({ categoryID }: { categoryID: string }) {
  const tag = tags["tag" + categoryID];
  return <>{tag.icon}</>;
}
export function BuildCategory({
  categoryID,
  full,
}: {
  categoryID: string;
  full: boolean;
}) {
  const tag = tags["tag" + categoryID];
  if (full) {
    return (
      <div className="rounded-md shadow-md p-2 px-3 w-fit flex flex-row  gap-x-2">
        <div className="top-[5px] relative">{tag.icon}</div>
        <div>{tag.name}</div>
      </div>
    );
  }
  return (
    <Tooltip content={full ? "" : tag.name}>
      <div className="rounded-md shadow-md p-2 w-fit flex flex-row  gap-x-2">
        <div className="top-[2px] relative">{tag.icon}</div>
      </div>
    </Tooltip>
  );
}
