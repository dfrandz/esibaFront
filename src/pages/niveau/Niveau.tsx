import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import state from '../../valtio/store'
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FiliereDto, NiveauFiliere } from "@/models";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { getFiliereName } from "@/utils/utils";
const Niveau = () => {
    const snap = useSnapshot(state)
    const queryClient = useQueryClient();
    const [isupdating, setIsupdating] = useState<boolean>(false)

    const { data: filieres } = useQuery<any>({
        queryKey: ["filieres"],
        queryFn: () => {
            return state.filiereStore.getFilieres()
        }
    })
    const {data:niveaux} =useQuery({
        queryKey: ["NiveauFiliere"],
        queryFn: () => {
            return state.niveauFiliereStore.getAll()
        }
    })
    
    const [pagination, setPagination] = useState({
        pageIndex: 0, //initial page index
        pageSize: 4, //default page size
    });

    const niveauSchema = z.object({
        libelle: z.string().min(3, "Le libelle obligatoire"),
        description: z.string().min(4, "La desc est obligatoire"),
        filiere_id: z.string().nonempty("La filière est requise"),
        status: z.boolean().default(true)
    });

    type NiveauFiliereFormInputs = z.infer<typeof niveauSchema>;

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
    } = useForm<NiveauFiliereFormInputs>({
        resolver: zodResolver(niveauSchema),
    });

    const addMutation = useMutation({
        mutationKey: ['addNiveau'],
        mutationFn: (newFiliere: NiveauFiliereFormInputs) => state.niveauFiliereStore.add(newFiliere),
        onSuccess: async () => {
            toast.success("NiveauFiliere ajouté avec succès");
            queryClient.invalidateQueries({ queryKey: ["NiveauFiliere"] });
            reset()
        },
        onError: async () => {
            toast.error("Erreur lors de l'ajout du role");
        }
    });

    const onSubmit = (data: NiveauFiliereFormInputs) => {
        console.log("data: ", data)
        addMutation.mutate(data)
    };


    const columns = useMemo(() => {
        const columnHelper = createColumnHelper<any>();
        return [
            columnHelper.accessor("libelle", {
                header: "niveau",
                cell: ({ row }) => (
                    <div className="capitalize">
                        <div className="capitalize">{row.getValue("libelle")}</div>
                    </div>
                ),
            }),
            columnHelper.accessor("filiereId", {
                header: "filiere",
                cell: ({ row }) => (
                    <div className="capitalize">{getFiliereName(filieres?.result || [] , row.getValue("filiereId"))}</div>
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

                            >
                                Update
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"

                            >
                                Supp
                            </Button>
                        </div>
                    );
                },
            }),
        ] as unknown as ColumnDef<NiveauFiliere>[];
    }, []);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([])
    const table = useReactTable<NiveauFiliere>({
        data: state.niveauFiliereStore.niveauFilieres,
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
            <div>Niveau</div>
            <div
                className="flex flex-1 py-2 justify-center rounded-lg border border-dashed shadow-sm"
            >
                <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                        <Card className="p-2">
                            <CardHeader>
                                <CardTitle>
                                    Niveau Filiere
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
                                                Update niveau
                                            </CardTitle>
                                        </>
                                            :
                                            <>
                                                <CardTitle>
                                                    Ajouter un Niveau
                                                </CardTitle>
                                            </>
                                    }
                                </CardHeader>
                                <CardContent>
                                    <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                                        <Label htmlFor="libelle">Niveau</Label>
                                        <Input type="text" placeholder="libelle" {...register("libelle")} />
                                        {errors.libelle && (
                                            <p className="text-red-500 text-sm">{errors.libelle.message}</p>
                                        )}
                                    </div>

                                    <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                                        <Label htmlFor="description">Filiere</Label>
                                        <Controller
                                            control={control}
                                            name="filiere_id"
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <SelectTrigger className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                                        <SelectValue placeholder="Select filiere" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {
                                                            filieres?.result.length ? (
                                                                filieres?.result?.map((filiere: FiliereDto) => (
                                                                    <SelectItem key={filiere.id} value={filiere.id}>
                                                                        {filiere.libelle}
                                                                    </SelectItem>
                                                                ))

                                                            ) : (
                                                                
                                                                <p>pas de resultat</p>
                                                            )
                                                        
                                                        }
                                                    </SelectContent>
                                                </Select>
                                            )}
                                            />
                                            {errors.filiere_id && <p>{errors.filiere_id.message}</p>}
                                    </div>



                                    <div className="grid w-full max-w-sm items-center gap-1.5 my-1">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea placeholder="description" {...register("description")} />
                                        {errors.description && (
                                            <p className="text-red-500 text-sm">{errors.description.message} dona</p>
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
                                                            Update niveau
                                                        </span>
                                                    </Button>

                                                    <Button type="submit" size="sm" className="h-8 gap-1">
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
                                                        Add niveau
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

export default Niveau