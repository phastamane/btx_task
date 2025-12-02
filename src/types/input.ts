import DataTable from "@/components/ui/Table";
import { DataTableType } from "./posts";
export interface InputProps{
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>;
    posts: DataTableType,
    setItem: React.Dispatch<React.SetStateAction<DataTableType | []>>;
}