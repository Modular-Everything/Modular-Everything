/* eslint-disable no-restricted-globals */
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export function ActiveLink({
  children,
  activeClassName = "active",
  className,
  ...props
}) {
  const { asPath, isReady } = useRouter();
  const [computedClassName, setComputedClassName] = useState(className);

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL(props.as || props.href, location.href)
        .pathname;

      console.log(linkPathname);

      const activePathname = new URL(asPath, location.href).pathname;

      const newClassName =
        linkPathname === activePathname
          ? `${className} ${activeClassName}`.trim()
          : className;

      if (newClassName !== computedClassName) {
        setComputedClassName(newClassName);
      }
    }
  }, [
    asPath,
    isReady,
    props.as,
    props.href,
    activeClassName,
    className,
    computedClassName,
  ]);

  return (
    <Link className={computedClassName} {...props}>
      {children}
    </Link>
  );
}
