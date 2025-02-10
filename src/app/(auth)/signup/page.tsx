"use client"

import Authfrom from "@/components/AuthForm"
import { signUp } from "@/lib/actions/auth"
import { signUpSchema } from "@/lib/validations"

const page = () => (
  <Authfrom
    type="SIGN_UP"
    schema={signUpSchema}
    defaultvalues={{
      fullName: "",
      email: "",
      password: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={signUp}
  />
)

export default page
