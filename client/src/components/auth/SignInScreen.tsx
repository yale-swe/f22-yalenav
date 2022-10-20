import { Pressable, Image, Text, StyleSheet, View, Linking} from 'react-native';
import { useAuth } from '../../contexts/Auth';

const Logo = require("../../../assets/yalenav-favicon.png");

const SignInScreen = () => {
    const auth = useAuth();
  
    const handleSignInPress = async () => {
      console.log("sign in")
      auth.signIn();
      
    };

    return (
        <View style = {styles.view }>
          <Image style= {styles.logo} source = {Logo} />
          <Pressable style= {styles.container} onPress={handleSignInPress}>
            <Text style = { styles.text }>Sign In</Text>
          </Pressable>
        </View>
        
      );
    }
  
  
  const styles = StyleSheet.create({
    container: {
      width:'75%%',
      padding: 20,
      borderRadius: 5,
      marginVertical: 5,
      alignItems: 'center',
      backgroundColor: "#3B71F3",
  },
  text: { 
    fontWeight:'bold',
    color: 'white',
  },
  view: {
    alignItems:'center',
  },
  logo:{
    width:'30%',
    maxWidth: 500,
    maxHeight: 200,
  },
  });

export default SignInScreen;