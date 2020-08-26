import * as React from 'react';
import { Button } from 'react-native';
import AuthContext from "./context"
const Logout = () => {
    const { signOut } = React.useContext(AuthContext)
    return (
        <Button
            onPress={() => signOut()}
            title="logout"
            color="black"
        />
    )
}

export default Logout

