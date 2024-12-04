import { selectors, useAppStore } from '@/store'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { CommitBody } from '@/types'
import { Textarea } from '../ui/textarea'

const formSchema = z.object({
  message: z.string().min(1, { message: "Message is required." }),
  filename: z.string().min(1, { message: "File name is required." }),
  content: z.string().min(1, { message: "Content is required." }),
})

const CommitForm = () => {
  const commit = useAppStore(state => state.commit)
  const selectedRepoId = useAppStore(state => state.selectedRepoId)
  const branch = useAppStore(selectors.getSelectedBranch)
  const isLoading = useAppStore(state => state.isCommitting)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
      filename: "",
      content: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('access_token')

    if(token && selectedRepoId && branch) {
      commit(token, selectedRepoId, branch.name, values as CommitBody)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>

              <FormControl>
                <Input {...field} placeholder="commit message" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="filename"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File name</FormLabel>

              <FormControl>
                <Input {...field} placeholder="file.txt" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File name</FormLabel>

              <FormControl>
                <Textarea {...field} placeholder="file content" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>Commit</Button>
      </form>
    </Form>
  )
}

export default CommitForm