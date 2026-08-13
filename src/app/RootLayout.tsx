import { Platform } from "react-native"

import Tabs from "./Tabs"
import WebStack from "./WebStack"

export default function RootStack () {
   
    return (
        <>
        {Platform.OS !== 'web' ? <Tabs/> : <WebStack/>}
        </>
    )
}