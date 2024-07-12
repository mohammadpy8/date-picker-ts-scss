"use client";

import { usePathname, useRouter } from "next/navigation";

function Default() {
  const router = useRouter();
  const pathname = usePathname();

  return router.replace("/");
}

export default Default;
