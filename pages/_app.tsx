import Sidebar from '@/app/screens/Sidebar'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import styled from 'styled-components'
import AppContainer from '@/app/screens/AppContainer'
import Header from '@/app/screens/Header'
import { DirContextProvider } from '@/app/context/DirContext'
import { ContextMenuProvider } from '@/app/context/ContextMenu'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <DirContextProvider>
        <Header />
        <AppContainer>
          <SidebarContainer>
            <Sidebar />
          </SidebarContainer>
          <ContextMenuProvider>
            <MainContainer>
              <Component {...pageProps} />
            </MainContainer>
          </ContextMenuProvider>
        </AppContainer>
      </DirContextProvider>
    </>
  )
}

const SidebarContainer = styled.div`
  border: 0;
  border-right: 1px solid #8d8f9257;
  height: 100vh;
  background-color: #242424;
  color: #fff;
`

const MainContainer = styled.div`
  border: 0;
  height: 100vh;
  overflow-y: scroll;
  color: white;
  padding: 15px 0;
  width: 100%;
`

export default App
