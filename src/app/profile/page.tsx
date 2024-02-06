import ProfilePage from "@Modules/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - Token Revenue Sharing",
  description: "Revenue token is a token that shares rewards for holders.",
};

export default function Profile(): React.ReactElement {
  return (
    <main>
      <ProfilePage />
    </main>
  );
}
