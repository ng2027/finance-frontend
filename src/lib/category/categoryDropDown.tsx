import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { ChevronDownIcon } from "../icon";
import { useCategoriesQuery } from "@/hooks/useCategoryApi";
import { ReturnIcon } from "@/utils/buildCategory";

export default function DropDownCategory({
  selectedKeys,
  setSelectedKeys,
}: {
  selectedKeys: any;
  setSelectedKeys: Function | any;
}) {
  const { data, isLoading } = useCategoriesQuery();
  const [categories, setCategories] = useState<any>([]);
  const [name, setName] = useState("Category");
  useEffect(() => {
    var list: Array<any> | never = data?.category;
    if (list) {
      list.unshift({ _id: "all", name: "All" });
    }

    setCategories(list || []);
  }, [data]);
  useEffect(() => {
    if (data?.category) {
      for (const obj of data.category) {
        if (obj._id == Array.from(selectedKeys).join(", ")) {
          setName(obj.name);
        }
      }
    } else {
      setName("Category");
    }
  }, [selectedKeys]);

  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          variant="flat"
        >
          {name}
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Dynamic Actions"
        items={categories}
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {(category: any) => (
          <DropdownItem
            key={category._id}
            // color={item.key === "delete" ? "danger" : "default"}
            // className={item.key === "delete" ? "text-danger" : ""}
          >
            <div className="flex flex-row gap-x-2">
              <div className="relative top-[2px]">
                <ReturnIcon categoryID={category._id} />{" "}
              </div>{" "}
              {category.name}
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}

export { DropDownCategory };
