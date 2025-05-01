import AuthForm from "@/components/organisms/Auth-form"
import { FormField } from "@/types/formTypes"
import { LoginInput, User } from "../../types"

interface AuthTemplateProps {
  loginFields: FormField[]
  registryFields: FormField[]
  onLogin: (values: LoginInput) => void
  onRegister: (values: User) => void
  imageBackground: string
  textBelow?: string //prop opcional para texto gris
  blueLink?: {  // Prop opcional para texto con enlace 
    text: string
    href: string
  }
}

export default function AuthTemplate({
  loginFields,
  registryFields,
  onLogin,
  onRegister,
  imageBackground,
  textBelow = '',
  blueLink
}: AuthTemplateProps) {
  return (
    <main
      className="grid h-screen w-screen p-8 gap-8 overflow-x-hidden grid-cols-1 xl:grid-cols-2 "
      style={{ backgroundImage: `url(${imageBackground})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div></div>
      <section className=" h-fit max-w-md p-6 bg-white rounded-lg shadow-md justify-self-center w-1/2 overflow-x-auto self-center">
      <AuthForm
        loginFields={loginFields}
        registryFields={registryFields}
        onLogin={onLogin}
        onRegister={onRegister}
      />
       {(textBelow || blueLink) && (
          <div className="mt-4 text-center space-y-2">
            {textBelow && (
              <p className="text-sm text-muted-foreground">
                {textBelow}
              </p>
            )}
            
            {blueLink && (
              <a 
                href={blueLink.href}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                {blueLink.text}
              </a>
            )}
          </div>
        )}
      </section>
    </main>
  )
}