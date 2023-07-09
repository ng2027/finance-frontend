import { NavBar } from "./(not-auth)/navbar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}

export { Layout };
