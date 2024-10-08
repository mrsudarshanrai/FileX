import Sidebar from '@/app/screens/Sidebar';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import AppContainer from '@/app/screens/AppContainer';
import Topbar from '@/app/screens/Topbar';
import { DirContextProvider } from '@/app/context/DirectoryContext';
import { ContextMenuProvider } from '@/app/context/ContextMenu';
import NavigationContextProvider from '@/app/context/NavigationContext';
import { colors } from '@/app/theme/colors';
import { GlobalStyles, MainContainer } from '@/styles/GlobalStyles';
import { Toaster } from 'react-hot-toast';
import { ModalContextProvider } from '@/app/context/ModalContext';
import '../styles/index.css';
import { DirectorySizeContextProvider } from '@/app/context/DirectorySizeContext/DirectorySizeContext';
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name='description'
          content=' FileX is a powerful and user-friendly Linux file manager for efficient file operations and organization.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ThemeProvider theme={colors}>
        <GlobalStyles />
        <Toaster position='top-right' />
        <DirContextProvider>
          <NavigationContextProvider>
            <ModalContextProvider>
              <Topbar />
              <DirectorySizeContextProvider>
                <AppContainer>
                  <Sidebar />
                  <ContextMenuProvider>
                    <MainContainer>
                      <Component {...pageProps} />
                    </MainContainer>
                  </ContextMenuProvider>
                </AppContainer>
              </DirectorySizeContextProvider>
            </ModalContextProvider>
          </NavigationContextProvider>
        </DirContextProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
