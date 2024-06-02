import { Menu, X } from "lucide-react";
import { Button } from "./button";

export const BurgerIcon = ({ onClick, isOpen }: { onClick?: () => void; isOpen?: boolean }) => {
    return (
        <Button className={"z-50"} variant="outline" size="icon" type="button" onClick={onClick}>
            {isOpen ? <X /> : <Menu />}
        </Button>
    );
};
