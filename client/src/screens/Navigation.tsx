import {TouchableWithoutFeedback, SafeAreaView} from 'react-native'
import { useAuth } from '../contexts/Auth';
import SignInScreen from '../components/auth/SignInScreen';
import HomeScreen from './HomeScreen';


const Navigation = () => {
    const auth = useAuth();

    return (
        <TouchableWithoutFeedback>
           {auth.authData ? 
             <HomeScreen /> : (
             <SafeAreaView >
                 <SignInScreen /> 
             </SafeAreaView>
             )
            }
        </TouchableWithoutFeedback> 
    )
};

export default Navigation;