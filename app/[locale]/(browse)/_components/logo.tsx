import Image from "next/image"
import fptLogo from "@/public/assets/images/fpt-logo.png"
import { useManagementSideBar } from "@/stores/use-management-sidebar"

import { cn } from "@/lib/utils"
import fptLogo2 from "@/app/favicon.ico"

function Logo() {
  const { isCollapsed } = useManagementSideBar()
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2 pb-4 pt-8 lg:gap-y-4">
      <Image
        alt="logo"
        src={fptLogo}
        width={160}
        height={72}
        className={cn("object-cover max-lg:hidden", isCollapsed && "hidden")}
      />
      <Image
        alt="logo"
        src={fptLogo2}
        width={48}
        height={48}
        className={cn(
          "object-cover lg:hidden",
          isCollapsed && "lg:inline-block"
        )}
      />
    </div>
  )
}

export default Logo
