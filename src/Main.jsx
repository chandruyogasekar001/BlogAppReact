import { useState, useEffect } from "react";
import MainPage from "./MainPage";
import BlogAdmin from "./BlogAdmin";
import Learn from "./Learn";
import Login from "./Login";
import HeadingsPage from "./HeadingsPage";
import MainPage2 from "./MainPage2";

export default function Main() {
  const [tab, setTab] = useState("");

  // Function to set tab in localStorage
  const setTabInStorage = (tab) => {
    localStorage.setItem("currentTab", tab);
  };

  // Function to get tab from localStorage
  const getTabFromStorage = () => {
    return localStorage.getItem("currentTab");
  };

  // Effect to initialize tab on mount
  useEffect(() => {
    const storedTab = getTabFromStorage();
    if (storedTab) {
      setTab(storedTab);
    }
  }, []);

  // Function to handle tab change
  const handleTabChange = (tab) => {
    setTab(tab);
    setTabInStorage(tab); // Store tab in localStorage
  };
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    // Perform any other actions after successful login (e.g., redirect to dashboard)
  };
  // Render component based on current tab
  switch (tab) {
    case "Admin":
      return <BlogAdmin onLogin={handleLogin} setTab={handleTabChange} />;
    case "Learn":
      return <Learn setTab={handleTabChange} />;
    case "blog":
        return <MainPage2 onLogin={handleLogin} setTab={handleTabChange} />;
    case "course":
          return <HeadingsPage  setTab={handleTabChange} />;
    default:
      return <MainPage onLogin={handleLogin} setTab={handleTabChange} />;
  }
}
