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
import { Button } from "./ui/button";

const TableData = () => {
    const [userData, setUserData] = useState([]);

    const getData = async () => {
        let res = await getUsers();
        setUserData(res.data);

        console.log(res.data);
    };

    useEffect(() => {
        getData();
    }, []);

    if(userData.length === 0) {
        return <p>Nenhum usuário encontrado</p>
    }

    return (
        <Table>
            <TableCaption>A list of registered users</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
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
                        <TableCell className="flex justify-end">
                            <Button variant={'default'} className="mr-3 cursor-pointer">Editar</Button>
                            <Button variant={'destructive'} className="cursor-pointer">Excluir</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableData
