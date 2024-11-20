import { useEffect, useRef } from 'react';

const SidebarContent = ({ children }) => {
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current) {
        if (window.pageYOffset > 100) {
          sidebarRef.current.style.right = '0';
        } else {
          sidebarRef.current.style.right = '-400px';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sidebar-content" ref={sidebarRef}>
      {children}
    </div>
  );
};

export default SidebarContent;