"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function PageTransition({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);

  // useEffect(() => {
  //   // console.log('Pathname changed:', pathname);
    
  //   // Force a reflow by setting visibility to false first
  //   setIsVisible(false);
    
  //   // Use setTimeout to ensure DOM has updated
  //   const timer = setTimeout(() => {
  //     // console.log('Setting visibility to true');
  //     setIsVisible(true);
  //   }, 200);

  //   return () => clearTimeout(timer);
  // }, [pathname]);

  // console.log('Rendering PageTransition, isVisible:', isVisible);

  return (
    <div 
      key={pathname}
      className={`page-transition ${isVisible ? 'visible' : ''}`}
      style={{ 
        transition: 'opacity 0.4s ease-in-out',
        opacity: isVisible ? 1 : 0
      }}
    >
      {children}
    </div>
  );
}
