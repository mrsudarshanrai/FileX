import Sidebar from '@/app/screens/Sidebar';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import styled, { ThemeProvider } from 'styled-components';
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
import { OperationContextProvider } from '@/app/context/OperationContext';
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
        <GlobalStyles theme={colors} />
        <Toaster position='top-right' />
        <RootLayout onContextMenu={(e) => e.preventDefault()}>
          <Sidebar />
          <MainSection>
            <Topbar />
            <DirContextProvider>
              <NavigationContextProvider>
                <ModalContextProvider>
                  <DirectorySizeContextProvider>
                    <OperationContextProvider>
                      <AppContainer>
                        <ContextMenuProvider>
                          <MainContainer id='main-scroll'>
                            <Component {...pageProps} />
                          </MainContainer>
                        </ContextMenuProvider>
                      </AppContainer>
                    </OperationContextProvider>
                  </DirectorySizeContextProvider>
                </ModalContextProvider>
              </NavigationContextProvider>
            </DirContextProvider>
          </MainSection>
        </RootLayout>
      </ThemeProvider>
    </>
  );
};

const RootLayout = styled.div`
  display: grid;
  grid-template-columns: 190px 1fr;
  height: 100vh;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 0;
  overflow: hidden;
`;

export default App;
