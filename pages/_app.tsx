import Sidebar from '@/app/screens/Sidebar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'
import AppContainer from '@/app/screens/AppContainer'
import Topbar from '@/app/screens/Topbar'
import { DirContextProvider } from '@/app/context/DirContext'
import { ContextMenuProvider } from '@/app/context/ContextMenu'
import NavigationContextProvider from '@/app/context/NavigationContext'
import { colors } from '@/app/theme/colors'
import { GlobalStyles, MainContainer } from '@/styles/GlobalStyles'
import { Toaster } from 'react-hot-toast'

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
            <Topbar />
            <AppContainer>
              <Sidebar />
              <ContextMenuProvider>
                <MainContainer>
                  <Component {...pageProps} />
                </MainContainer>
              </ContextMenuProvider>
            </AppContainer>
          </NavigationContextProvider>
        </DirContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
