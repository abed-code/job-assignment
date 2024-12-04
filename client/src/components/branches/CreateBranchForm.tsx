import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAppStore } from '@/store'
import { FC } from 'react'

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
})

const CreateBranchForm: FC = () => {
  const selectedRepoId = useAppStore(state => state.selectedRepoId)
  const isLoading = useAppStore(state => state.isChangingBranches)
  const createBranch = useAppStore(state => state.createBranch)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('access_token')

    if(token && selectedRepoId) {
      createBranch(token, selectedRepoId, values.name)
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>Create</Button>
      </form>
    </Form>
  )
}

export default CreateBranchForm