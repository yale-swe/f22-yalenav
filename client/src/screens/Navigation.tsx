import {View, StyleSheet} from 'react-native'
import { useAuth } from '../contexts/Auth';
import { Map, Profile, Search, Shortcut } from "../components";
import SignInButton from '../components/auth/SignInScreen';
import { Button } from 'react-native-elements';

const Navigation = () => {
    const auth = useAuth();

    return (
        <View>
            {auth.authData ?  (
                <View style={styles.container}>
                <Map />
                <View style={styles.header}>
                    <Search />
                    <Profile />
                    <Button title="Sign Out" onPress={auth.signOut}/>
                </View>
                <Shortcut />
                
                </View>
                ) : 
                <SignInButton />
            }
    </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      marginTop: "20%",
      flex: 1,
      position: "absolute",
      justifyContent: "space-around",
    },
  });
  

export default Navigation;