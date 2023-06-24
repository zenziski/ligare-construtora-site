import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { ApiAuth, ApiCall } from "../../../_services/api";
import { useToast } from "@chakra-ui/react";
import { useRouter } from 'next/router'
import Sidebar from "@/components/sidebar";

export default function Dashboard() {
    // const [cookies, removeCookie] = useCookies(["token"]);
    // const toast = useToast();
    // const navigate = useRouter()

    // const ValidateUser = async () => {
    //     const resp = await new ApiCall('/auth/validate', ApiAuth(cookies.token)).get();
    //     if (resp?.status !== 200) {
    //         removeCookie('token', null, { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
    //         //Navigate the user back to the login page
    //         toast({
    //             title: 'Sessão expirada',
    //             description: `Sua sessão expirou`,
    //             status: 'error',
    //             duration: 5000,
    //             isClosable: true
    //         })
    //         navigate.push('/');
    //     }
    // }

    // useEffect(() => {
    // if (!cookies.token) {
    //     //Send the person back to the login page
    //     removeCookie('token', null, { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
    //     toast({
    //         title: 'Sessão expirada',
    //         description: `Sua sessão expirou`,
    //         status: 'error',
    //         duration: 5000,
    //         isClosable: true
    //     })
    //     navigate.push('/');
    // } else {
    //     ValidateUser();
    // }
    // }, []);
    return (
        <Sidebar />
    )
}
