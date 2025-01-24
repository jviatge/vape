export const excludeArrivalByDateNow = (
    end_activity: "1d" | "1/2d" | "2d" | "3d" | "4d" | "5d" | "6d" | "7d",
    date_departure: Date
) => {
    const date = date_departure.toISOString().split("T")[0];
    const dateNow = new Date().toISOString().split("T")[0];
    const getSubtractDate = (date: string, days: number) => {
        const dateObj = new Date(date);
        dateObj.setDate(dateObj.getDate() - days);
        return dateObj.toISOString().split("T")[0];
    };

    if ((end_activity === "1d" || end_activity === "1/2d") && dateNow === date) return true;
    if (end_activity === "2d" && dateNow === getSubtractDate(date, -1)) return true;
    if (end_activity === "3d" && dateNow === getSubtractDate(date, -2)) return true;
    if (end_activity === "4d" && dateNow === getSubtractDate(date, -3)) return true;
    if (end_activity === "5d" && dateNow === getSubtractDate(date, -4)) return true;
    if (end_activity === "6d" && dateNow === getSubtractDate(date, -5)) return true;
    if (end_activity === "7d" && dateNow === getSubtractDate(date, -6)) return true;

    return false;
};

export const isOdd = (num: number) => {
    return num % 2;
};

export const nbrPersonReservation = (
    nb_return_person?: number,
    data?: {
        type: "group" | "individual";
        number_of_people: number;
        number_of_be_people: number;
        accompanying_number: number;
        adults: number;
        teenagers: number;
        children: number;
    }
) => {
    if (nb_return_person) {
        return nb_return_person;
    }
    if (data) {
        if (data.type === "group") {
            return (
                Number(data.number_of_people) +
                Number(data.number_of_be_people) +
                Number(data.accompanying_number)
            );
        } else {
            return Number(data.adults) + Number(data.teenagers) + Number(data.children);
        }
    }
    return 0;
};
