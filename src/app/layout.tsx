import "./globals.css";
import { PlanProvider } from "@/context/PlanContext";
import Toast from "@/components/Toast";

export const metadata = {
  title: "FitLog — Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          {children}
          <Toast />
        </PlanProvider>
      </body>
    </html>
  );
}