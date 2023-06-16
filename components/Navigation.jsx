import Link from "next/link";

import { classNames } from "../helpers/classNames";

export function Navigation({ active }) {
  const activeClasses = "font-bold bg-blue";
  const inactiveClasses = "bg-light-grey";

  return (
    <div className="absolute left-0 top-0 z-[3750] hidden w-full grid-cols-12 text-3xl md:grid lg:text-lg">
      <div className="col-start-2 col-end-13 grid grid-cols-11 lg:col-start-6 lg:grid-cols-7">
        <Link
          href="/"
          className={classNames(
            active === "work" ? activeClasses : inactiveClasses,
            "col-span-4 lg:col-span-3"
          )}
        >
          Work
        </Link>
        <a
          href="mailto:yo@modular-everything.com"
          className={classNames(inactiveClasses, "col-span-3 lg:col-span-1")}
          target="_blank"
          rel="noreferrer noopener"
        >
          Email me
        </a>
        <Link
          href="/say-hi"
          className={classNames(
            active === "say-hi" ? activeClasses : inactiveClasses,
            "col-span-4 lg:col-span-3"
          )}
        >
          Leave a message
        </Link>
      </div>
    </div>
  );
}
