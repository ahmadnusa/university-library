"use client"

import Authfrom from "@/components/AuthForm"
import { signInWithCredentials } from "@/lib/actions/auth"
import { signInSchema } from "@/lib/validations"

const page = () => (
  <Authfrom
    type="SIGN_IN"
    schema={signInSchema}
    defaultvalues={{
      email: "",
      password: "",
    }}
    onSubmit={signInWithCredentials}
  />
)

export default page
