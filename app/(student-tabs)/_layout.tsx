import { Tabs } from "expo-router";

export default function StudentTabsLayout() {
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
        name="MyTicketsScreen"
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

      <Tabs.Screen
  name="notices"
  options={{
    title: "Notices",
  }}
/>
    </Tabs>
  );
}