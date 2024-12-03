import { selectors, useAppStore } from "@/store"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RepoMode } from "@/types"

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string(),
})

export const useRepoForm = () => {
  const createRepo = useAppStore(state => state.createRepo)
  const updateRepo = useAppStore(state => state.updateRepo)
  const isLoading = useAppStore(state => state.isChangingRepos)
  const repoMode = useAppStore(state => state.repoMode)
  const selectedRepo = useAppStore(selectors.getSelectedRepo)

  const buttonText = repoMode === RepoMode.Create ? "Create" : "Update"

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selectedRepo?.name ?? "",
      description: selectedRepo?.description ?? "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem('access_token')

    if(!token) return

    if(repoMode === RepoMode.Create) {
      createRepo(token, {
        name: values.name,
        description: values.description
      })
    }

    if(repoMode === RepoMode.Update && selectedRepo) {
      updateRepo(token, selectedRepo.id, {
        name: values.name,
        description: values.description
      })
    }
  }

  return {
    form,
    isLoading,
    onSubmit,
    buttonText,
  }
}