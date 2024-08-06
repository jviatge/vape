import BadgeView from "@vape/components/core/views/Badge.view";
import Empty from "@vape/components/core/views/Empty";
import { FieldTable } from "@vape/types/modules/table/table";
import BooleanView from "../../../views/Boolean.view";
import DateView from "../../../views/Date.view";
import HourView from "../../../views/Hour.view.";
import { resolveStringObject } from "../../lib/getData";
import { RenderCustom } from "../render/custom/Custom.render";

export const RenderFields = ({ column, row }: { column: FieldTable; row: Record<string, any> }) => {
    return (
        <div className="px-1">
            {column.type === "custom" && column.component ? (
                <RenderCustom component={column.component} row={row} />
            ) : column.type === "boolean" ? (
                <BooleanView value={row[column.name] as boolean} />
            ) : resolveStringObject(column.name, row) ? (
                column.type === "date" ? (
                    <DateView value={row[column.name]} />
                ) : column.type === "time" ? (
                    <HourView value={row[column.name]} />
                ) : column.type === "badge" ? (
                    <BadgeView
                        minLabel={column.minLabel}
                        value={resolveStringObject(column.name, row)}
                        options={column.options}
                    />
                ) : column.keys && column.keys.length > 0 ? (
                    column.keys.map((key, index) => (
                        <span key={key + index} className="mr-1 text-nowrap">
                            {column.name.includes(".")
                                ? resolveStringObject(
                                      key,
                                      row[column.name.split(".")[0]][column.name.split(".")[1]]
                                  )
                                : resolveStringObject(key, row[column.name])}
                        </span>
                    ))
                ) : (
                    <span className="mr-1 text-nowrap">
                        {resolveStringObject(column.name, row)}
                    </span>
                )
            ) : (
                <Empty />
            )}
        </div>
    );
};
