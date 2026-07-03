import { Tabs } from "expo-router";

export default function FacultyTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="tickets"
        options={{
          title: "My Tickets",
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

      {/* Hidden Screen */}
      <Tabs.Screen
        name="create-ticket"
        options={{
          href: null,
        }}
      />
  
    </Tabs>
  );
}