import { BuildCategory } from "@/utils/buildCategory";
import { ViewTab } from "./ViewTab";

import { DeleteTransaction } from "../transaction";
import { EditTab } from "./EditTab";
import { DeleteTab } from "./DeleteTab";

export function DisplayTab({
  tab,
  type: selectedBorrow,
  changeView,
}: {
  tab: any;
  type: boolean;
  changeView: Function;
}) {
  return (
    <div className="flex flex-row justify-between p-1 px-4 rounded-2xl border border-stone-400 hover:shadow-lg hover:p-1.5 tranistion-all duration-300 hover:px-3">
      <div className="flex flex-row gap-x-3 items-center">
        <BuildCategory categoryID={tab.category} full={false} />
        {selectedBorrow && (
          <div>
            <b>You</b> owe <b>{tab.person}</b>
          </div>
        )}
        {!selectedBorrow && (
          <div>
            <b>{tab.person}</b> owe{!selectedBorrow && "s"} <b>You</b>
          </div>
        )}
      </div>
      <div
        className="bg-slate-200 justify-center flex rounded-lg p-1 px-3"
        style={{
          backgroundColor: tab.is_borrowed ? "#FFCCCC" : "#CCFFCC",
        }}
      >
        <div>${tab.amount}</div>
      </div>
      <div className=" flex items-center gap-2 flex-row ">
        <ViewTab data={tab} />
        <EditTab data={tab} changeView={changeView} />
        <DeleteTab data={tab} />
      </div>
    </div>
  );
}
