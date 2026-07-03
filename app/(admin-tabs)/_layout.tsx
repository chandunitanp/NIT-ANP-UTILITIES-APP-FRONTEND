import { Tabs } from "expo-router";

export default function AdminTabsLayout() {

  return (

    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >

      {/* ================= HOME ================= */}

      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
        }}
      />

      {/* ================= TICKETS ================= */}

      <Tabs.Screen
        name="tickets"
        options={{
          title: "Tickets",
        }}
      />

      {/* ================= NOTICES ================= */}

    

      {/* ================= PROFILE ================= */}

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />

    </Tabs>
  );
}