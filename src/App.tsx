import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import { JobsSearchPage } from 'pages/JobSearchPage';
import { JobDetailsPage } from 'pages/JobDetailsPage';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Footer, Header } from './components';
import api from './api/api';

import './index.style.css';

const Layout = styled.div`
  width: 100%;
  margin: auto;
  @media screen and (min-width: 790px) {
    flex-direction: column;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: api('https://remotive.io/api/remote-jobs', (data) => data),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<JobsSearchPage />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
          </Routes>
          <Footer username="levymateus" />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
