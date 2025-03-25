"use client";

import { Badge } from "@vape/components/ui/badge";
import { cn } from "@vape/tools";
import { Option } from "@vape/types/modules/table";
import React from "react";
import Empty from "./Empty";

interface BadgeViewProps {
    value: string;
    options?: Option[];
    minLabel?: boolean;
}

const BadgeView: React.FC<BadgeViewProps> = ({ value, options, minLabel }) => {
    const opt = options
        ? options.find((option) => option.value === value)
        : {
              color: undefined,
              label: value,
              minLabel: undefined,
          };

    return opt?.label ? (
        <div className="flex items-center">
            <Badge
                className={cn(
                    "text-xs text-nowrap overflow-hidden",
                    opt?.color && "dark:text-white text-black"
                )}
                variant={"default"}
                style={{
                    ...(opt?.color && {
                        backgroundColor: opt.color,
                    }),
                }}
            >
                {minLabel && opt?.minLabel ? opt?.minLabel : opt?.label}
            </Badge>
        </div>
    ) : (
        <Empty />
    );
};

export default BadgeView;
