import { resolveSpanClass } from "@vape/lib/resolveGrid";
import { DecorateBuilder } from "@vape/types/modules/form/form";
import { ContainerDecorate } from "./fields/Container.decorate";
import { SectionsDecorate } from "./fields/Section.decorate";

export const RenderDecorates = (decorateBuilder: DecorateBuilder) => {
    return (
        <div className={`flex flex-col relative ${resolveSpanClass(decorateBuilder.span)}`}>
            {decorateBuilder.type === "container" && decorateBuilder.fields ? (
                <ContainerDecorate {...decorateBuilder} />
            ) : null}

            {decorateBuilder.type === "sections" ? <SectionsDecorate {...decorateBuilder} /> : null}
        </div>
    );
};
