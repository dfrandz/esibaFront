

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
    getPaginationRowModel,
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
import { FiliereDto} from "@/models"

const Filiere = () => {
    const snap = useSnapshot(state)
    const queryClient = useQueryClient();
    const [isupdating, setIsupdating] = useState<boolean>(false)

    useQuery({
        queryKey: ["filieres"],
        queryFn: () => {
            return state.filiereStore.getFilieres()
        }
    })

    const filiereSchema = z.object({
        libelle: z.string().min(3, "Le libelle obligatoire"),
        description: z.string().min(4, "La description est obligatoire"),
        user_id: z.string().default(snap.userStore.user.id),
        status: z.boolean().default(true)
    });

    type FiliereFormInputs = z.infer<typeof filiereSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm<FiliereFormInputs>({
        resolver: zodResolver(filiereSchema),
    });

    const deleteMutation = useMutation({
        mutationFn: (filiereId: string) => state.filiereStore.deleteFiliere(filiereId),
        onSuccess: () => {
          toast.success("Filiere supprimée avec succès");
          queryClient.invalidateQueries({ queryKey: ["filieres"] });
          // Mise à jour de l'état du cache après la suppression réussie
          queryClient.setQueryData(["filieres"], (oldData: any[]) => {
            return oldData.filter(filiere => filiere.id !== filiere); // Assurez-vous que 'id' est la clé correcte pour identifier un rôle
          });
        },
    });

    const handleDelete = (filiereId: string) => {
        deleteMutation.mutate(filiereId)
    };

    const update = () => {
        setIsupdating(true)
        setValue("libelle", 'dona')
        setValue("description", 'dona')
    }

    const handleCancel = () => {
        setIsupdating(false)
        setValue("description", "")
        setValue("libelle", '')
    }

    const addMutation=useMutation({
        mutationKey: ['addFiliere'],
        mutationFn: (newFiliere: FiliereFormInputs) => state.filiereStore.addFiliere(newFiliere),
        onSuccess: async () => {
            toast.success("Filiere ajouté avec succès");
            queryClient.invalidateQueries({ queryKey: ["filieres"] });
            reset()
        },
        onError: async () => {
            toast.error("Erreur lors de l'ajout du role");
        }
    });

    const onSubmit = (data: FiliereFormInputs) => {
        console.log("form", data)
        addMutation.mutate(data)
    };
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 2, //default page size
    });

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
                cell: ({ }) => (
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
                                onClick={() => update()}
                            >
                                Update
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
        ] as unknown as ColumnDef<FiliereDto>[];
    }, []);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable<FiliereDto>({
        data: state.filiereStore.filieres ?? [],
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
        
    });
    
    return (
        <>
            <div>Filiere</div>
            <div
                className="flex flex-1 py-2 justify-center rounded-lg border border-dashed shadow-sm"
            >
                <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <Card className="p-2">
                            <CardHeader>
                                <CardTitle>
                                    Liste Filiere
                                </CardTitle>
                                <CardDescription>Liste de vos filieres.</CardDescription>
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
                                    {
                                        isupdating ? <>
                                            <CardTitle>
                                                Update une Filiere
                                            </CardTitle>
                                        </>
                                            :
                                            <>
                                                <CardTitle>
                                                    Ajouter une Filiere
                                                </CardTitle>
                                            </>
                                    }
                                </CardHeader>
                                <CardContent>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                                        <Label htmlFor="libelle">Filiere</Label>
                                        <Input type="text" placeholder="filiere name" {...register("libelle")} />
                                        {errors.libelle && (
                                            <p className="text-red-500 text-sm">{errors.libelle.message}</p>
                                        )}
                                    </div>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea placeholder="description" {...register("description")} />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm">{errors.description.message}</p>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    {
                                        isupdating ?
                                            <>
                                                <div className="flex items-stretch gap-4">
                                                    <Button type="submit" size="sm" className="h-8 gap-1">
                                                        <PlusCircle className="h-3.5 w-3.5" />
                                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                            Update Filiere
                                                        </span>
                                                    </Button>

                                                    <Button type="submit" size="sm" className="h-8 gap-1" onClick={() => handleCancel()}>
                                                        {/* <PlusCircle className="h-3.5 w-3.5" /> */}
                                                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                            Cancel update
                                                        </span>
                                                    </Button>
                                                </div>
                                            </> : <>
                                                <Button type="submit" size="sm" className="h-8 gap-1">
                                                    <PlusCircle className="h-3.5 w-3.5" />
                                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                        Add Filiere
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

export default Filiere