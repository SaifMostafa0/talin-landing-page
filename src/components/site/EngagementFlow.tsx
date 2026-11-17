import { Blocks, Infinity as InfinityIcon, Route as RouteIcon, Search, UserRoundCheck } from "lucide-react";
import { engagementFlow } from "../../content/site";

const icons = [Search, RouteIcon, Blocks, UserRoundCheck, InfinityIcon];

export function EngagementFlow() {
  return (
    <ol className="flow" data-reveal>
      {engagementFlow.map((step, index) => {
        const Icon = icons[index] ?? Search;
        return (
          <li key={step.title} className="flow__step" style={{ "--step": index } as React.CSSProperties}>
            <div className="flow__orb">
              <Icon aria-hidden="true" size={30} strokeWidth={1.6} />
              <span className="flow__number" aria-hidden="true">
                {index + 1}
              </span>
            </div>
            <h3 className="flow__title">
              <span className="sr-only">{index + 1}. </span>
              {step.title}
            </h3>
            <p className="flow__copy">{step.copy}</p>
          </li>
        );
      })}
    </ol>
  );
}
