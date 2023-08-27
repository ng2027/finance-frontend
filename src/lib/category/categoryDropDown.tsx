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
  filter,
  selectMissing,
}: {
  selectedKeys: any;
  setSelectedKeys: Function | any;
  filter: boolean;
  selectMissing: boolean;
}) {
  const { data, isLoading } = useCategoriesQuery();
  const [categories, setCategories] = useState<any>([]);
  const [name, setName] = useState("Category");

  useEffect(() => {
    var list: Array<any> | never = data?.category;

    setCategories(list || []);
  }, [data]);

  useEffect(() => {
    if (filter) {
      if (categories && categories.length != 0) {
        if (categories[0]._id != "all") {
          setCategories((prev: any) => [
            { _id: "all", name: "All" },
            ...categories,
          ]);
        }
      }
    }
  }, [filter, categories]);
  useEffect(() => {
    if (categories && categories.length != 0) {
      for (const obj of categories) {
        if (obj._id == Array.from(selectedKeys).join(", ")) {
          setName(obj.name);
        }
      }
    } else {
      setName("Category");
    }
  }, [selectedKeys, categories]);

  return (
    <div>
      <Dropdown>
        <DropdownTrigger className="flex">
          <Button
            endContent={<ChevronDownIcon className="text-small" />}
            variant="flat"
            className={selectMissing ? "border  border-red-500" : ""}
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
            <DropdownItem key={category._id}>
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
    </div>
  );
}

export { DropDownCategory };
