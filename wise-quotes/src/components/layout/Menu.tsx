import Link from "next/link";
import React, { ReactNode } from "react";

// interface MenuProps {
//   children?: ReactNode;
//   className?: string;
// }

const Menu: React.FC = () => {
  return (
    <>
      <Link href="/">Intro</Link>
      <Link href="/random">Random</Link>
      <Link href="/quote/Marcus-Aurelius-Meditations-0101">First</Link>

      {/* <button
            onClick={() => {
                // Implement your toggle logic here
                // For example, call a prop or use a context to toggle transitions
            }}
        >
            Toggle Transitions
        </button> */}
    </>
  );
};

export default Menu;
