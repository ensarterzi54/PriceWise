import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next",
      "Categories": "Categories",
      "Profile": "Profile",
      "Log Out": "Log Out",
      "Log In": "Log In",
      "Follow List": "Follow List",
      "Account": "Account",
      "Favorites": "Favorites",
      "Search your favorites": "Search your favorites",
      "My Favorites": "My Favorites",
      "What do you want to look for cheaply?": "What do you want to look for cheaply?",
      "Name": "Name",
      "Surname": "Surname",
      "E-mail": "E-mail",
      "Save Changes": "Save Changes"
    }
  },
  tr: {
    translation: {
      "Welcome to React": "React'e hoşgeldiniz",
      "Categories": "Kategoriler",
      "Profile": "Profil",
      "Log Out": "Çıkış Yap",
      "Log In": "Giriş Yap",
      "Follow List": "Takip Listesi",
      "Account": "Hesap",
      "Favorites": "Favoriler",
      "Search your favorites": "Favorilerinizi arayın",
      "My Favorites": "Favorilerim",
      "What do you want to look for cheaply?": "Neyi ucuza aramak istersin?",
      "Name": "Ad",
      "Surname": "Soyad",
      "E-mail": "E-posta",
      "Save Changes": "Değişiklikleri kaydet"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug: true,
    
    interpolation: {
      escapeValue: false
    }
  })
export default i18n