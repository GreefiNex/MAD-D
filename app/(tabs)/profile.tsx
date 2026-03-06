import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const stats = [
  { id: "1", label: "Books Read", value: "15", icon: "book" },
  { id: "2", label: "Hours Spent", value: "48", icon: "time" },
  { id: "3", label: "Certificates", value: "3", icon: "ribbon" },
];

const menuItems = [
  {
    id: "1",
    title: "Edit Profile",
    icon: "person-outline",
    color: "#3b82f6",
    hasArrow: true,
  },
  {
    id: "2",
    title: "Reading Statistics",
    icon: "stats-chart-outline",
    color: "#10b981",
    hasArrow: true,
  },
  {
    id: "3",
    title: "My Collections",
    icon: "folder-outline",
    color: "#f59e0b",
    hasArrow: true,
  },
  {
    id: "4",
    title: "Reading Goals",
    icon: "flag-outline",
    color: "#ef4444",
    hasArrow: true,
  },
  {
    id: "5",
    title: "Notifications",
    icon: "notifications-outline",
    color: "#8b5cf6",
    hasArrow: true,
    hasSwitch: true,
  },
  {
    id: "6",
    title: "Dark Mode",
    icon: "moon-outline",
    color: "#6366f1",
    hasArrow: false,
    hasSwitch: true,
  },
];

const bottomMenuItems = [
  {
    id: "1",
    title: "Help & Support",
    icon: "help-circle-outline",
  },
  {
    id: "2",
    title: "About App",
    icon: "information-circle-outline",
  },
  {
    id: "3",
    title: "Sign Out",
    icon: "log-out-outline",
    color: "#ef4444",
  },
];

export default function Profile() {
  const { colors, toggleDarkMode, isDarkMode } = useTheme();

  const renderMenuItem = ({ item }: { item: typeof menuItems[0] }) => (
    <TouchableOpacity
      style={[styles.menuItem, { backgroundColor: colors.surface }]}
    >
      <View style={[styles.menuIcon, { backgroundColor: item.color + "20" }]}>
        <Ionicons name={item.icon as any} size={22} color={item.color} />
      </View>
      <Text style={[styles.menuTitle, { color: colors.text }]}>
        {item.title}
      </Text>
      {item.hasSwitch ? (
        <Switch
          value={item.title === "Dark Mode" ? isDarkMode : false}
          onValueChange={() => {
            if (item.title === "Dark Mode") {
              toggleDarkMode();
            }
          }}
          trackColor={{ false: colors.border, true: colors.primary + "80" }}
          thumbColor={item.title === "Dark Mode" && isDarkMode ? colors.primary : "#f4f3f4"}
        />
      ) : (
        item.hasArrow && (
          <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
        )
      )}
    </TouchableOpacity>
  );

  const renderBottomMenuItem = ({ item }: { item: typeof bottomMenuItems[0] }) => (
    <TouchableOpacity
      style={[styles.bottomMenuItem, { backgroundColor: colors.surface }]}
    >
      <Ionicons
        name={item.icon as any}
        size={22}
        color={item.color || colors.textMuted}
      />
      <Text
        style={[
          styles.bottomMenuTitle,
          { color: item.color || colors.text },
        ]}
      >
        {item.title}
      </Text>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.profileHeader, { backgroundColor: colors.surface }]}>
        <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
        <Text style={[styles.userName, { color: colors.text }]}>
          John Doe
        </Text>
        <Text style={[styles.userEmail, { color: colors.textMuted }]}>
          john.doe@email.com
        </Text>
        <TouchableOpacity
          style={[styles.editProfileButton, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        {stats.map((stat) => (
          <View key={stat.id} style={[styles.statCard, { backgroundColor: colors.surface }]}>
            <Ionicons
              name={stat.icon as any}
              size={24}
              color={colors.primary}
            />
            <Text style={[styles.statValue, { color: colors.text }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>
              {stat.label}
            </Text>
          </View>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>
          ACCOUNT
        </Text>
        <FlatList
          data={menuItems}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Bottom Menu */}
      <View style={[styles.menuSection, styles.lastSection]}>
        <FlatList
          data={bottomMenuItems}
          renderItem={renderBottomMenuItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* App Version */}
      <Text style={[styles.version, { color: colors.textMuted }]}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 15,
  },
  editProfileButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  statCard: {
    width: (width - 50) / 3,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },
  lastSection: {
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 10,
    marginLeft: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 12,
  },
  bottomMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  bottomMenuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 12,
  },
  version: {
    textAlign: "center",
    fontSize: 12,
    paddingVertical: 20,
  },
});

