import { AuthProvider } from "./src/contexts/Auth";
import Navigation from './src/screens/Navigation';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider> 
  );
}
