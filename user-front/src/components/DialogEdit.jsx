import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { updateUser } from "@/services/api"

const DialogEdit = ({ user, getData }) => {
    const [newName, setNewName] = useState(user.name);
    const [newEmail, setNewEmail] = useState(user.email);
    const [open, setOpen] = useState(false);

    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            await updateUser({ name: newName, email: newEmail }, user.id)

            setOpen(false);

            getData?.();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button variant={'default'} className="mr-3 cursor-pointer">Editar</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleEdit}>
                        <DialogHeader>
                            <DialogTitle>Edit user</DialogTitle>
                            <DialogDescription>
                                Enter the new user's information to edit them in the database
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input onChange={(e) => setNewName(e.target.value)} id="name" name="name" value={newName} autoComplete="off" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={(e) => setNewEmail(e.target.value)} id="email" name="email" value={newEmail} autoComplete="off" />
                            </div>
                        </div>

                        <DialogFooter className="mt-5">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    )
}

export default DialogEdit