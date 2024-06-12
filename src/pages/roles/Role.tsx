import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label"
import { PlusCircle } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table"
import { useMemo, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSnapshot } from "valtio"
import state from '../../valtio/store'
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "@/components/ui/textarea"
import toast from "react-hot-toast"
import { RoleDto } from "@/models"

const Role = () => {

  const snap = useSnapshot(state)
  const queryClient = useQueryClient();
  const [isupdating, setIsupdating] = useState<boolean>(false)

  const {data:roles} = useQuery({
    queryKey: ["role"],
    queryFn: () => {
      return state.roleStore.getRoles()
    }
  })

  const roleSchema = z.object({
    libelle: z.string().min(4, "Le libelle du role est obligatoire"),
    description: z.string().min(4, "La description du role est obligatoire"),
  });

  type RoleFormInputs = z.infer<typeof roleSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<RoleFormInputs>({
    resolver: zodResolver(roleSchema),
  });
  

  const addMutation = useMutation({
    mutationKey:['addrole'],
    mutationFn: (newData: RoleFormInputs) => state.roleStore.addRole(newData),
    onSuccess: async () => {
      toast.success("Role ajouté avec succès");
      queryClient.invalidateQueries({ queryKey: ["role"] });
      reset()
    },
    onError: async () => {
      toast.error("Erreur lors de l'ajout du role");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (roleId: string) => state.roleStore.deleteRole(roleId),
    onSuccess: () => {
      // toast.success("Role supprimé avec succès");
      queryClient.invalidateQueries({ queryKey: ["role"] });
      // Mise à jour de l'état du cache après la suppression réussie
      queryClient.setQueryData(["role"], (oldData: any[]) => {
        return oldData.filter(role => role.id !== role); // Assurez-vous que 'id' est la clé correcte pour identifier un rôle
      });
    },
  });


  const onSubmit = (data: RoleFormInputs) => {
    console.log('data before send', data)
    addMutation.mutate(data)
  };

  const handleDelete = (roleId: string) => {
    deleteMutation.mutate(roleId);
  };
  
  const update = (roleId:number) =>{
    setIsupdating(true)
    console.log('role to update', roleId)
    const currentRole:RoleDto[] = roles?.result.filter((role:RoleDto) => role.id ==roleId)
    console.log('role current', currentRole)
    setValue("libelle", 'dona')
    setValue("description", 'dona')
  }

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<any>();
    return [
      columnHelper.accessor("libelle", {
        header: "libelle",
        cell: ({ row }) => (
          <div className="capitalize">
            <div className="capitalize">{row.getValue("libelle")}</div>
          </div>
        ),
      }),
      columnHelper.accessor("description", {
        header: "description",
        cell: ({ row }) => (
          <div className="capitalize">{row.getValue("description")}</div>
        ),
      }),
      columnHelper.accessor("status", {
        header: "status",
        cell: ({  }) => (
          <div className="">Active</div>
        ),
      }),
      columnHelper.accessor("id", {
        header: "Actions",
        cell(props) {
          return (
            <div className="flex gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => update(props.getValue())}
              >
                Detail
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(props.getValue())}
              >
                Supp
              </Button>
            </div>
          );
        },
      }),
    ] as unknown as ColumnDef<RoleDto>[];
  },[]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([])
  const table = useReactTable<RoleDto>({
    data: state.roleStore.role,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <>
      <div>Roles</div>
      <div
        className="flex flex-1 py-2 justify-center rounded-lg border border-dashed shadow-sm"
      >
        <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <Card className="p-2">
              <CardHeader>
                <CardTitle>
                  Liste Roles
                </CardTitle>
                <CardDescription>Liste des roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>

                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => {
                            return (
                              <TableHead key={header.id}>
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              </TableHead>
                            )
                          })}
                        </TableRow>
                      ))}
                    </TableHeader>


                    <TableBody>
                      {table.getRowModel().rows?.length ? (
                        table.getRowModel()?.rows.map((row) => (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (

                        <TableRow>
                          <TableCell
                            colSpan={columns.length}
                            className="h-24 text-center"
                          >
                            Pas de resultat
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>


                  </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                  <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} a{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selectionés.
                  </div>
                  <div className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
              <Card className="p-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardHeader>
                      <CardTitle>
                        Ajouter un Role
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                        <Label htmlFor="libelle">Role</Label>
                        <Input type="text" placeholder="role name" {...register("libelle")} />
                        {errors.libelle && (
                      <p className="text-red-500 text-sm">{errors.libelle.message}</p>
                    )}
                      </div>
                      <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                        <Label htmlFor="description">Description</Label>
                        <Textarea  placeholder="description" {...register("description")} />
                        {errors.description && (
                      <p className="text-red-500 text-sm">{errors.description.message}</p>
                      )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {
                        isupdating? 
                        <>
                          <Button type="submit" size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Update Role
                            </span>
                          </Button>
                        </> : <>
                        <Button type="submit" size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Add Role
                            </span>
                          </Button>
                        </>
                      }
                    </CardFooter>
                </form>
              </Card>
          </div>
        </div>
      </div>
    </>
  )
}

export default Role