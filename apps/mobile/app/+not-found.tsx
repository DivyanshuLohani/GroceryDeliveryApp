import { useRouter } from "expo-router";

import ErrorComponent from "@/components/Error";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <ErrorComponent
      message="You have reached a secret screen which doesn't exist"
      subMessage="You can go back to the home screen for now"
      onRetry={() => router.replace("/")}
      retryButtonText="Go Home"
      retryIcon="home-outline"
      mainIcon="alert-circle"
    />
  );
}
