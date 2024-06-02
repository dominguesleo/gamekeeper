import { SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="full-view">
            <SignUp path="/sign-up" />
        </div>
    )
}