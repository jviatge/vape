export type Span = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Col = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Gap = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export const resolveColumnsClass = (col: Col = 4, gap: Gap = 3) => {
    let gapClass = "";

    switch (gap) {
        case 1:
            gapClass = "gap-1";
            break;
        case 2:
            gapClass = "gap-2";
            break;
        case 3:
            gapClass = "gap-3";
            break;
        case 4:
            gapClass = "gap-4";
            break;
        case 5:
            gapClass = "gap-5";
            break;
        case 6:
            gapClass = "gap-6";
            break;
        case 7:
            gapClass = "gap-7";
            break;
        case 8:
            gapClass = "gap-8";
            break;
        case 9:
            gapClass = "gap-9";
            break;
        case 10:
            gapClass = "gap-10";
            break;
    }

    switch (col) {
        case 1:
            return `grid ${gapClass} grid-cols-1`;
        case 2:
            return `grid ${gapClass} grid-cols-2`;
        case 3:
            return `grid ${gapClass} grid-cols-3`;
        case 4:
            return `grid ${gapClass} grid-cols-4`;
        case 5:
            return `grid ${gapClass} grid-cols-5`;
        case 6:
            return `grid ${gapClass} grid-cols-6`;
        case 7:
            return `grid ${gapClass} grid-cols-7`;
        case 8:
            return `grid ${gapClass} grid-cols-8`;
        case 9:
            return `grid ${gapClass} grid-cols-9`;
        case 10:
            return `grid" ${gapClass} rid-cols-10`;
        case 11:
            return `grid" ${gapClass} rid-cols-11`;
        case 12:
            return `grid" ${gapClass} rid-cols-12`;
    }
};

export const resolveSpanClass = (size?: Span) => {
    switch (size) {
        case 1:
            return "md:col-span-1 col-span-full";
        case 2:
            return "md:col-span-2 col-span-full";
        case 3:
            return "md:col-span-3 col-span-full";
        case 4:
            return "md:col-span-4 col-span-full";
        case 5:
            return "md:col-span-5 col-span-full";
        case 6:
            return "md:col-span-6 col-span-full";
        case 7:
            return "md:col-span-7 col-span-full";
        case 8:
            return "md:col-span-8 col-span-full";
        default:
            return "col-span-full";
    }
};

export const resolveRowSpanClass = (size: Span) => {
    switch (size) {
        case 1:
            return "row-span-1";
        case 2:
            return "row-span-2";
        case 3:
            return "row-span-3";
        case 4:
            return "row-span-4";
        case 5:
            return "row-span-5";
        case 6:
            return "row-span-6";
        case 7:
            return "row-span-7";
        case 8:
            return "row-span-8";
    }
};
