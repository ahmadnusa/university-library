"use client"

import Authfrom from "@/components/AuthForm"
import { signInSchema } from "@/lib/validations"

const page = () => (
  <Authfrom
    type="SIGN_IN"
    schema={signInSchema}
    defaultvalues={{
      email: "",
      password: "",
    }}
    onSubmit={() => {}}
  />
)

export default page
