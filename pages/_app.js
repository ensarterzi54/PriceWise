import "@/styles/globals.css";
import Layout from "./layout/Layout";
import AuthContextProvider from "@/contexts/AuthContex";
import ScrapeContextProvider from "@/contexts/ScrapeContext";
import { SnackbarProvider } from 'notistack';
import ThemeContextProvider from "@/contexts/ThemeContext";
import FavoritesContextProvider from "@/contexts/FavoritesContext";
import "../lib/i18n";
import AiContextProvider, { AiContext } from "@/contexts/AiContext";
export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <ScrapeContextProvider>
          <FavoritesContextProvider>
            <AiContextProvider>
              <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Layout>
                  {getLayout(
                      <Component {...pageProps} />
                  )}
                </Layout>
              </SnackbarProvider>
            </AiContextProvider>
          </FavoritesContextProvider>
        </ScrapeContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}
