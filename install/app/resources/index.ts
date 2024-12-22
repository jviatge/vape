import { Module } from "../.vape/types/resources.type";

const dashboard: Module[] = [
    {
        type: "custom",
        component: "blocks/Welcome",
    },
    /* {
        type: "custom",
        component: "blocks/StatisticsPersonPerYer",
        model: "reservations",
        modelMethod: "getMonthStatisticsPerYer",
    }, */
];

export default dashboard;
