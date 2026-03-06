import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Sample book data
const featuredBooks = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", cover: "📖" },
  { id: "2", title: "1984", author: "George Orwell", cover: "📕" },
  { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee", cover: "📗" },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", cover: "📘" },
];

const categories = [
  { id: "1", name: "Fiction", icon: "book" },
  { id: "2", name: "Science", icon: "flask" },
  { id: "3", name: "History", icon: "time" },
  { id: "4", name: "Biography", icon: "person" },
];

export default function Index() {
  const { colors, toggleDarkMode, isDarkMode } = useTheme();

  const renderFeaturedBook = ({ item }: { item: typeof featuredBooks[0] }) => (
    <TouchableOpacity style={[styles.bookCard, { backgroundColor: colors.surface }]}>
      <View style={[styles.bookCover, { backgroundColor: colors.gradients.primary[0] }]}>
        <Text style={styles.bookEmoji}>{item.cover}</Text>
      </View>
      <Text style={[styles.bookTitle, { color: colors.text }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={[styles.bookAuthor, { color: colors.textMuted }]} numberOfLines={1}>
        {item.author}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.bg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <View>
          <Text style={[styles.greeting, { color: colors.textMuted }]}>
            Welcome back! 👋
          </Text>
          <Text style={[styles.welcomeTitle, { color: colors.text }]}>
            Discover Your Next
          </Text>
          <Text style={[styles.welcomeTitle, { color: colors.primary }]}>
            Great Read
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.darkModeButton, { backgroundColor: colors.surface }]}
          onPress={toggleDarkMode}
        >
          <Ionicons
            name={isDarkMode ? "sunny" : "moon"}
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.gradients.primary[0] }]}>
          <Ionicons name="search" size={24} color="#fff" />
          <Text style={styles.actionText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.gradients.success[0] }]}>
          <Ionicons name="library" size={24} color="#fff" />
          <Text style={styles.actionText}>E-Library</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.gradients.warning[0] }]}>
          <Ionicons name="bookmark" size={24} color="#fff" />
          <Text style={styles.actionText}>My Books</Text>
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Browse Categories
        </Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryCard, { backgroundColor: colors.surface }]}
            >
              <Ionicons
                name={category.icon as any}
                size={28}
                color={colors.primary}
              />
              <Text style={[styles.categoryName, { color: colors.text }]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Featured Books */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Featured Books
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={featuredBooks}
          renderItem={renderFeaturedBook}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredList}
        />
      </View>

      {/* Continue Reading */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Continue Reading
        </Text>
        <TouchableOpacity style={[styles.continueCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.continueCover, { backgroundColor: colors.gradients.danger[0] }]}>
            <Text style={styles.bookEmoji}>📚</Text>
          </View>
          <View style={styles.continueInfo}>
            <Text style={[styles.continueTitle, { color: colors.text }]}>
              Atomic Habits
            </Text>
            <Text style={[styles.continueAuthor, { color: colors.textMuted }]}>
              James Clear
            </Text>
            <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: colors.primary, width: "45%" },
                ]}
              />
            </View>
            <Text style={[styles.progressText, { color: colors.textMuted }]}>
              45% complete
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color={colors.textMuted} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  darkModeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButton: {
    width: 100,
    height: 80,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    marginTop: 8,
    fontSize: 13,
  },
  section: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  lastSection: {
    paddingBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  featuredList: {
    paddingRight: 20,
  },
  bookCard: {
    width: 130,
    marginRight: 15,
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  bookCover: {
    height: 120,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  bookEmoji: {
    fontSize: 40,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  bookAuthor: {
    fontSize: 12,
  },
  continueCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  continueCover: {
    width: 60,
    height: 80,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  continueInfo: {
    flex: 1,
    marginLeft: 12,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  continueAuthor: {
    fontSize: 13,
    marginTop: 2,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    marginTop: 4,
  },
});

