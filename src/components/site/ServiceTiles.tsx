import { useState } from "react";
import { services } from "../../content/services";
import { serviceIcons } from "./icons";

/*
 * Home service offering: a row of tall tiles. One is open at a time; the others
 * show their title on its side. Pointer hover, focus and tap all open a tile,
 * and the width change is animated. Below 860px the tiles stack and open
 * downward instead.
 */
export function ServiceTiles() {
  const [open, setOpen] = useState(0);
  return (
    <div className="tiles" role="list">
      {services.map((service, index) => {
        const Icon = serviceIcons[service.id];
        const isOpen = open === index;
        const panelId = `tile-${service.id}`;
        return (
          <div key={service.id} role="listitem" className={`tile ${isOpen ? "is-open" : ""}`}>
            <button
              type="button"
              className="tile__button focus-ring"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(index)}
              onFocus={() => setOpen(index)}
              onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(index)}
            >
              <Icon className="tile__icon" aria-hidden="true" size={30} strokeWidth={1.5} />
              <span className="tile__label">{service.title}</span>
            </button>
            <div id={panelId} className="tile__panel" aria-hidden={!isOpen}>
              <h3 className="tile__title">{service.title}</h3>
              <p className="tile__copy">{service.summary}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
