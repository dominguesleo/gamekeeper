import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="full-view">
            <SignIn path="/sign-in" />
        </div>
    )
}