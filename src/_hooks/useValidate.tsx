import { useToast } from "@chakra-ui/react";
import React from "react";
import { useCookies } from "react-cookie";
import { getCookie } from "react-use-cookie";
import { ApiCall, ApiAuth } from "../_services/api";
import { useRouter } from 'next/router'

export interface IValidateFunction {
  (callback: (token: string) => Promise<void>): Promise<void>
}

export function useValidation(): IValidateFunction {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, removeCookie ] = useCookies(["token"]);
  const theToken = getCookie('token');
  const toast = useToast();
  const navigate = useRouter();

  const validation: IValidateFunction = React.useCallback(async (callback: (token: string) => Promise<void>) => {
    if (theToken) {
      const { status } = await new ApiCall('/auth/validate', ApiAuth(theToken)).get();
      if (status === 200) {
        await callback.call(undefined, theToken);
      } else {
        //Inform the user that his session expired
        toast({
          title: 'Sessão Expirada',
          description: 'Sua sessão expirou no sistema, se deseja continuar utilizando, por favor, logue-se novamente',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        //Delete the Cookie
        removeCookie('token', null, { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
        //Navigate back to the login page
        navigate.push('/');
      }
    } else {
      //Inform the user that his session expired
      toast({
        title: 'Sessão Expirada',
        description: 'Sua sessão expirou no sistema, se deseja continuar utilizando, por favor, logue-se novamente',
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      //Delete the Cookie
      removeCookie('token', null, { expires: new Date('Thu, 01 Jan 1970 00:00:01 GMT') });
      //Navigate back to the login page
      navigate.push('/');
    }
  }, [navigate, removeCookie, theToken, toast]);

  return validation;
}