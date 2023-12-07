import './styles/index.css';
import ReactDOM from 'react-dom/client';
import QueryProvider from '@contexts/QueryProvider';
import LanguageProvider from '@contexts/LanguageContext';
import router from './route/router';
import { RouterProvider } from 'react-router-dom';
import { SubscriptionProvider } from '@contexts/SubscriptionContext';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryProvider>
      <SubscriptionProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
        </LanguageProvider>
      </SubscriptionProvider>
    </QueryProvider>
  </AuthProvider>
);
