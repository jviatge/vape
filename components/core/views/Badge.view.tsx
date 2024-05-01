"use client";

import { Badge } from "@vape/components/ui/badge";
import { Option } from "@vape/types/modules/table/table";
import React from "react";
import Empty from "./Empty";

interface BadgeViewProps {
    value: string;
    options?: Option[];
}

const BadgeView: React.FC<BadgeViewProps> = ({ value, options }) => {
    const opt = options
        ? options.find((option) => option.value === value)
        : {
              color: undefined,
              label: value,
          };

    return opt?.label ? (
        <div className="flex items-center">
            <Badge
                className="text-xs dark:text-white text-black text-nowrap overflow-hidden"
                variant={"default"}
                style={{
                    ...(opt?.color && {
                        backgroundColor: opt.color,
                    }),
                }}
            >
                {opt?.label}
            </Badge>
        </div>
    ) : (
        <Empty />
    );
};

export default BadgeView;
