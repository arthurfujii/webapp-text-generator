import { redirect } from 'next/navigation'
import Main from '@/app/components'
import { getSessionUsername } from '@/lib/auth/server'

const App = async () => {
  const currentUser = await getSessionUsername()
  if (!currentUser)
    redirect('/login')

  return <Main currentUser={currentUser} />
}

export default App
