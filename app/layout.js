export const metadata = {
  title: "Resume Optimizer",
  description: "AI Powered Resume Tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}