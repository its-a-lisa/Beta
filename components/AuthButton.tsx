import * as React from "react";
import {
  PlasmicAuthButton,
  DefaultAuthButtonProps
} from "./plasmic/beta/PlasmicAuthButton";
import { HTMLElementRefOf } from "@plasmicapp/react-web";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { PLASMIC_AUTH_DATA_KEY } from "../utils/cache-keys";
import { mutate } from "swr";

export interface AuthButtonProps extends DefaultAuthButtonProps {}

function AuthButton_(props: AuthButtonProps, ref: HTMLElementRefOf<"div">) {
  const [supabaseClient] = React.useState(() => createPagesBrowserClient());
  const router = useRouter();

  return (<PlasmicAuthButton 
    root={{ ref }} 
    {...props} 
    logoutBtn={{
      onClick: async () => {
        await supabaseClient.auth.signOut();
        await mutate(PLASMIC_AUTH_DATA_KEY);
        router.reload();
      },
    }}
    />
  );
}

const AuthButton = React.forwardRef(AuthButton_);
export default AuthButton;
