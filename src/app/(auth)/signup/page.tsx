"use client"

import Authfrom from "@/components/AuthForm"
import { signUpSchema } from "@/lib/validations"

const page = () => (
  <Authfrom
    type="SIGN_UP"
    schema={signUpSchema}
    defaultvalues={{
      email: "",
      password: "",
      fullName: "",
      universityId: 0,
      universityCard: "",
    }}
    onSubmit={() => {}}
  />
)

export default page
