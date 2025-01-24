const FirstNameNLastName = ({ props }: any) => {
    const { row } = props;

    return `${row.first_name} ${row.last_name}`;
};

export default FirstNameNLastName;
