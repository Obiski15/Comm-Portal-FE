import { FormInput } from "lucide-react"
import { useForm } from "react-hook-form"

import { Form, FormField, FormItem } from "@/components/ui/form"

export default function LoginPage() {
  const form = useForm()

  return (
    <Form {...form}>
      <div>
        <FormField
          name=""
          control={form.control}
          render={() => (
            <FormItem>
              <FormInput />
            </FormItem>
          )}
        />
      </div>
    </Form>
  )
}
