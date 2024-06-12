
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Mail,
  Menu,
  MessageSquare,
  Package,
  Package2,
  Plus,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  UserPlus,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { ModeToggle } from "@/components/mode-toggle"
import state from '../../valtio/store';
import toast from "react-hot-toast"
import { useSnapshot } from "valtio"

export default function HomeLayout() {
  const snap = useSnapshot(state)
  const user = snap.userStore.user
  const navigate = useNavigate()
  const handleLogout = () => {

    state.userStore.logout().then((res) => {
      console.log("logout ", res)
      if (res) {
        toast.success("Logged out")
        // navigate("/login")
        window.location.href = "/login"
      }
    }).catch((err) => {
      console.log("logout ", err)
    })
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              {/* <Package2 className="h-6 w-6" /> */}
              <span className="">ESIBA</span>
            </Link>
            <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {
                user.roleId === 1 && (
                  <>
                    <NavLink
                      to="/"
                      className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" : " flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}

                    >
                      <Home className="h-4 w-4" />
                      Dashboard
                    </NavLink>
                    <NavLink
                      to="/home"
                      className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" : " flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"}
                    >
                      <Package className="h-4 w-4" />
                      Products{" "}
                    </NavLink>
                    <Link
                      to="#"
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                    >
                      <Users className="h-4 w-4" />
                      Etudiants
                    </Link>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-0">
                          <h2

                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                          >
                            <Settings className="h-4 w-4" />
                            Paramettres
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-4">
                            <Link
                              to="roles"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Roles
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Matieres
                            </Link>
                            <Link
                              to="filiere"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Filliers
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Niveau Filliers
                            </Link>
                          </div>
                          
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                )

              }
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card x-chunk="dashboard-02-chunk-0">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="flex flex-col">

        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" : " flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  }

                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </NavLink>

                <NavLink
                  to="/home"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary" : " flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  }
                >
                  <Package className="h-4 w-4" />
                  Products{" "}
                </NavLink>

                <Link
                  to="#"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Users className="h-4 w-4" />
                  Etudiants
                </Link>
                <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1" className="border-0">
                        <AccordionTrigger className="hover:no-underline py-0">
                          <h2

                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all"
                          >
                            <Settings className="h-4 w-4" />
                            Paramettres
                          </h2>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="px-4">
                            <Link
                              to="roles"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Roles
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Matieres
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Filliers
                            </Link>
                            <Link
                              to="#"
                              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Niveau Filliers
                            </Link>
                          </div>
                          
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
              </nav>
              <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>

              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>


          </DropdownMenu>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>

    </div>
  )
}
