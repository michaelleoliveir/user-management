import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { updateUser } from "@/services/api"
import { TriangleAlert } from "lucide-react"
import { useValidateEmail } from "@/hooks/useValidateEmail"

const DialogEdit = ({ user, getData }) => {
    const [newName, setNewName] = useState(user.name);
    const [newEmail, setNewEmail] = useState(user.email);
    const [open, setOpen] = useState(false);
    const [apiError, setApiError] = useState('');

    const { error, validateEmail } = useValidateEmail();

    const handleEdit = async (e) => {
        e.preventDefault();

        if (!validateEmail(newEmail)) {
            return;
        }

        try {
            await updateUser({ name: newName, email: newEmail }, user.id)

            setOpen(false);

            getData?.();
        } catch (error) {
            setApiError('Try again later');
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>

                <DialogTrigger asChild>
                    <Button data-cy="user-card" variant={'default'} className="mr-3 cursor-pointer">Editar</Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={handleEdit}>
                        <DialogHeader>
                            <DialogTitle>Edit user</DialogTitle>
                            <DialogDescription>
                                Enter the new user's information to edit them in the database
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 mt-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input onChange={(e) => setNewName(e.target.value)} id="name" name="name" value={newName} autoComplete="off" />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input onChange={(e) => setNewEmail(e.target.value)} id="email" name="email" value={newEmail} autoComplete="off" />
                            </div>
                        </div>

                        {(error || apiError) && (
                            <div className="flex text-red-500 mt-3 bg-red-50 p-2 px-3 rounded-3xl">
                                <TriangleAlert />
                                <p className="text-sm ml-2">{error || apiError}</p>
                            </div>
                        )}

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