import { SessionProvider } from "../components/SessionProvider";
import "../styles/globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import Login from "../components/Login";
import Header from "../components/Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className="bg-gray-600 text-white">
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div>
              <div>{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
