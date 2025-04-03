import { Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-3 px-4 text-zinc-400 text-sm">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="text-center md:text-left">© {new Date().getFullYear()} Shrub. All rights reserved.</div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-emerald-500" />
            <a href="mailto:contact@toscanisoft.cm" className="hover:text-white transition-colors">
              contact@toscanisoft.cm
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-500" />
            <a href="tel:+237694193493" className="hover:text-white transition-colors">
              +237 694193493
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

