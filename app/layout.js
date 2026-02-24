import "./globals.css";

export const metadata = {
  title: "One City Schools — A Scalable Model for Addressing the Literacy Crisis",
  description:
    "One City Schools is where the world's most widely-adopted phonics program and the leading AI literacy tutor are built, tested, and proven — with the students who benefit most.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
