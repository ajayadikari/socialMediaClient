import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "@/components/login";
import SignUp from "@/components/signup";

export default function TabsDemo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="account">
        <TabsList>
          <TabsTrigger value="account">Login</TabsTrigger>
          <TabsTrigger value="password">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Login />
        </TabsContent>
        <TabsContent value="password">
          <SignUp />
        </TabsContent>
      </Tabs>
    </div>
  );
}
