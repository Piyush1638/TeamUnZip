import NavbarDashboard from "./NavbarDashboard";

const Layout = ({ children }) => {
  return (
    <>
      <main className="bg-gray-900 relative min-h-screen">
      <NavbarDashboard />
      {children}
      </main>
    </>
  );
};

export default Layout;
