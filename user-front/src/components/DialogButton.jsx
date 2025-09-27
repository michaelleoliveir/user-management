import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { createUser } from "@/services/api"

const DialogButton = ({ getData }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [open, setOpen] = useState(false);

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            await createUser({ name, email });

            setOpen(false);

            setName("");
            setEmail("");

            getData?.();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Adicionar usuário</Button>
            </DialogTrigger>


            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreate}>
                    <DialogHeader className="mb-5">
                        <DialogTitle>Add user</DialogTitle>
                        <DialogDescription>
                            Enter the new user's information to register them in the database
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={name} onChange={((e) => setName(e.target.value))} autoComplete="off" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" value={email} onChange={((e) => setEmail(e.target.value))} autoComplete="off" />
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
    )
}

export default DialogButton