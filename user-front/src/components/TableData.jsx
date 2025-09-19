import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getUsers } from "@/services/api";
import { useEffect, useState } from "react"

const TableData = () => {
    const [userData, setUserData] = useState([]);

    const getData = async () => {
        let res = await getUsers();
        setUserData(res.data);

        console.log(res);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {userData.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default TableData
