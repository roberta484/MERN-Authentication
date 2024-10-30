import ThemeButton from "@/components/common/theme-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignOutMutation } from "@/services/mutations";
import { VerifyUserQuery } from "@/services/queries";
import { formatRelative } from "date-fns";

export default function DashboardPage() {
  const { data } = VerifyUserQuery();
  const { mutate: SignOut, isPending } = SignOutMutation();

  const lastLogin = data?.lastLogin;
  const joined = data?.createdAt;

  const lastLoginDate = lastLogin
    ? formatRelative(new Date(lastLogin), new Date())
    : "Never logged in";

  const joinedDate = joined
    ? formatRelative(new Date(joined), new Date())
    : "Never joined";

  return (
    <section className="flex justify-center min-h-screen items-center">
      <Tabs defaultValue="profile" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="account">Account Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="3xl">Your Profile Information</CardTitle>
              <CardDescription>
                This section displays your key profile details, including your
                username, email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Username</Label>
                <Input defaultValue={data?.username} disabled />
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <Input defaultValue={data?.email} disabled />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-white font-bold"
                onClick={() => SignOut()}
                disabled={isPending}
              >
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Activity</CardTitle>
              <CardDescription>
                This section provides an overview of your recent account
                activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label>Joined</Label>
                <Input disabled defaultValue={joinedDate} />
              </div>
              <div className="space-y-1">
                <Label>Last Login</Label>
                <Input disabled defaultValue={lastLoginDate} />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full text-white font-bold"
                disabled={isPending}
                onClick={() => SignOut()}
              >
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <ThemeButton />
    </section>
  );
}
