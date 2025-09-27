import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { removeUser } from "@/services/api";
import { Button } from "./ui/button";
import DialogEdit from "./DialogEdit";

const TableData = ({ userData, setUserData, getData }) => {

    const handleRemove = async (id) => {
        try {
            await removeUser(id);
            setUserData((prev) => prev.filter((user) => user.id !== id))
        } catch (error) {
            console.log(error)
        }
    }

    if (userData.length === 0) {
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
                            <DialogEdit user={user} getData={getData} />
                            <Button onClick={() => handleRemove(user.id)} variant={'destructive'} className="cursor-pointer">Excluir</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default TableData
