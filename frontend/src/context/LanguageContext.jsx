import React, { createContext, useContext, useState } from "react";

// מילון התרגומים
const translations = {
  he: {
    welcome: "ברוכים הבאים ל-Spend Wise",
    welcomeSubtitle: "נהל את התקציב שלך בצורה חכמה ויעילה",
    login: "התחבר",
    register: "הרשם",
    quickActions: "פעולות מהירות",
    addNewDeal: "הוסף עסקה חדשה",
    viewAllDeals: "צפה בכל העסקאות",
    recentActivity: "פעילות אחרונה",
    todayExpenses: "הוצאות היום",
    weekExpenses: "הוצאות השבוע",
    monthExpenses: "הוצאות החודש",
    budgetOverview: "סקירת תקציב",
    budgetUsed: "מהתקציב נוצל",
    monthlyBudget: "תקציב חודשי",
    expenses: "הוצאות",
    remaining: "נותר",
    smartTip: "טיפ חכם",
    tips: {
      danger: "🚨 שים לב! אתה קרוב לניצול מלא של התקציב החודשי.",
      warning: "⚠️ כדאי להתחיל לחסוך - נשאר לך פחות מ-25% מהתקציב החודשי.",
      success: "👏 כל הכבוד! אתה מנהל את התקציב שלך בצורה מצוינת.",
      default: "💡 טיפ: נסה לעקוב אחר ההוצאות שלך באופן יומי.",
    },
    myDeals: "העסקאות שלי",
    noDeals: "לא נמצאו עסקאות",
    dealType: "סוג עסקה",
    amount: "סכום",
    category: "קטגוריה",
    date: "תאריך",
    actions: "פעולות",
    edit: "ערוך",
    delete: "מחק",
    save: "שמור",
    cancel: "בטל",
    expense: "הוצאה",
    income: "הכנסה",
    expenseCategories: {
      food: "אוכל",
      transport: "תחבורה",
      rent: "שכירות",
      bills: "חשבונות",
      shopping: "קניות",
      health: "בריאות",
      entertainment: "בילויים",
      other: "אחר",
    },
    incomeCategories: {
      salary: "משכורת",
      bonus: "בונוס",
      investment: "השקעות",
      gift: "מתנה",
      other: "אחר",
    },
    confirmDelete: "האם אתה בטוח שברצונך למחוק עסקה זו?",
    paymentMethod: "אמצעי תשלום",
    paymentMethods: {
      credit: "כרטיס אשראי",
      debit: "כרטיס דביט",
      cash: "מזומן",
      transfer: "העברה בנקאית",
      bit: "ביט",
    },
    loading: "טוען...",
    pleaseLogin: "אנא התחבר כדי להוסיף עסקה",
    sessionExpired: "החיבור פג תוקף, אנא התחבר מחדש",
    addDealError: "אירעה שגיאה בהוספת העסקה",
  },
  en: {
    welcome: "Welcome to Spend Wise",
    welcomeSubtitle: "Manage your budget smartly and efficiently",
    login: "Login",
    register: "Register",
    quickActions: "Quick Actions",
    addNewDeal: "Add New Deal",
    viewAllDeals: "View All Deals",
    recentActivity: "Recent Activity",
    todayExpenses: "Today's Expenses",
    weekExpenses: "Week's Expenses",
    monthExpenses: "Month's Expenses",
    budgetOverview: "Budget Overview",
    budgetUsed: "of budget used",
    monthlyBudget: "Monthly Budget",
    expenses: "Expenses",
    remaining: "Remaining",
    smartTip: "Smart Tip",
    tips: {
      danger: "🚨 Warning! You are close to using all your monthly budget.",
      warning:
        "⚠️ Consider saving - less than 25% of your monthly budget remains.",
      success: "👏 Great job! You are managing your budget excellently.",
      default: "💡 Tip: Try to track your expenses daily.",
    },
    myDeals: "My Deals",
    noDeals: "No deals found",
    dealType: "Deal Type",
    amount: "Amount",
    category: "Category",
    date: "Date",
    actions: "Actions",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    expense: "Expense",
    income: "Income",
    expenseCategories: {
      food: "Food",
      transport: "Transport",
      rent: "Rent",
      bills: "Bills",
      shopping: "Shopping",
      health: "Health",
      entertainment: "Entertainment",
      other: "Other",
    },
    incomeCategories: {
      salary: "Salary",
      bonus: "Bonus",
      investment: "Investments",
      gift: "Gift",
      other: "Other",
    },
    confirmDelete: "Are you sure you want to delete this deal?",
    paymentMethod: "Payment Method",
    paymentMethods: {
      credit: "Credit Card",
      debit: "Debit Card",
      cash: "Cash",
      transfer: "Bank Transfer",
      bit: "Bit",
    },
    loading: "Loading...",
    pleaseLogin: "Please login to add a transaction",
    sessionExpired: "Session expired, please login again",
    addDealError: "Error occurred while adding the transaction",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("he"); // ברירת מחדל - עברית

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "he" ? "en" : "he"));
  };

  const t = (key) => {
    const keys = key.split(".");
    let value = translations[language];
    for (const k of keys) {
      value = value[k];
    }
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
