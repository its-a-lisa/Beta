import * as React from "react";
import {
  PlasmicAuthForm,
  DefaultAuthFormProps
} from "./plasmic/beta/PlasmicAuthForm";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { mutate } from "swr";
import { PLASMIC_AUTH_DATA_KEY } from "../utils/cache-keys";


export interface AuthFormProps extends DefaultAuthFormProps {}

function AuthForm_(props: AuthFormProps, ref: HTMLElementRefOf<"div">) {
  const [supabaseClient] = React.useState(() => createPagesBrowserClient());
  const router = useRouter();

  return ( <PlasmicAuthForm 
  root={{ ref }} 
  {...props} 
  handleSubmit={async (
    mode: "signIn" | "signUp",
    credentials: {
      email: string;
      password: string;
    }
  ) => {
    if (mode === "signIn") {
      await supabaseClient.auth.signInWithPassword(credentials);
    } else {
      await supabaseClient.auth.signUp(credentials);
    }
    await mutate(PLASMIC_AUTH_DATA_KEY);
    router.push("/");
  }}
  />
  );
}

const AuthForm = React.forwardRef(AuthForm_);
export default AuthForm;
