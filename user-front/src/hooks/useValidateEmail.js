import { useState } from "react";

export function useValidateEmail() {
    const [error, setError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!email.trim()) {
            setError('You must enter an email');
            return false;
        }

        if(!emailRegex.test(email)) {
            setError('You must enter a valid email');
            return false;
        }

        setError('');
        return true;
    }

    return {error, validateEmail}
}