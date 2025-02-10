"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form"
import { ZodType } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { FIELD_NAMES, FIELD_TYPES } from "@/constans"
import ImageUpload from "./ImageUpload"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface AuthformProps<T extends FieldValues> {
  schema: ZodType<T>
  defaultvalues: T
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>
  type: "SIGN_IN" | "SIGN_UP"
}
const Authform = <T extends FieldValues>({
  schema,
  defaultvalues,
  onSubmit,
  type,
}: AuthformProps<T>) => {
  const { push } = useRouter()
  const isSignIn = type === "SIGN_IN"
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultvalues as DefaultValues<T>,
  })

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data)

    if (result.success) {
      toast({
        title: "Success",
        description: isSignIn
          ? "You have successfully signed in."
          : "You have successfully signed up.",
      })
      push("/")
    } else {
      toast({
        title: "Error",
        description: isSignIn
          ? "Failed to sign in. Please try again."
          : "Failed to sign up. Please try again.",
        variant: "destructive",
      })
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? "Welcome back to BookWise" : "Create your library account"}
      </h1>
      <p className="text-light-100">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-8"
        >
          {Object.keys(defaultvalues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel
                    className="capitalize"
                    htmlFor={`${field.name}-form-item`}
                  >
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload
                        id={`${field.name}-form-item`}
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        id={`${field.name}-form-item`}
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                        autoComplete="off"
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-base font-medium">
        {isSignIn ? "New to BookWise? " : "Already have an account? "}

        <Link
          href={isSignIn ? "/signup" : "signin"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  )
}

export default Authform
